module Foods exposing (Foods, FoodId, decode, getEnergyRate, decodeId, search, Food)


import Set exposing (Set)
import EnergyPerMass exposing (EnergyPerMass)
import Dict exposing (Dict)
import Json.Decode as Decode exposing (Decoder)
import Array exposing (Array)
import FoodName exposing (FoodName)


type Foods
    = Foods (Dict String EnergyPerMass)


insert : String -> String -> Foods -> Result String Foods
insert rawName rawKcalPer100g (Foods old) =
    case
        (FoodName.fromString rawName
        , EnergyPerMass.fromKcalPer100g rawKcalPer100g)
    of
        (Err err, Err _) ->
            Err err

        (Err err, Ok _) ->
            Err err

        (Ok _, Err err) ->
            Err err

        (Ok name, Ok energyPerMass) ->
            Dict.insert (FoodName.toString name) energyPerMass old
            |> Foods |> Ok


type FoodId
    = FoodId Int


type alias Food =
    { energyPerMass : EnergyPerMass
    , name : FoodName
    }


search : String -> Foods -> List Food
search query =
    Dict.filter (\k _ -> String.contains query k)
        >> Dict.toList
        >> (\(n, e) -> {energyPerMass = e, name = Name n})


decodeId : Decoder FoodId
decodeId =
    Decode.int
        |> Decode.andThen (\i ->
            if i < 0 then
                Decode.fail "food ID must not be negative"

            else
                Decode.succeed (FoodId i))


decode : Decoder Foods
decode =
    Decode.map2 (\es ns -> { energyPerMass = es, name = ns })
        (Decode.field "energyPerMass" (Decode.array EnergyPerMass.decode))
        (Decode.field "name" (Decode.array FoodName.decode))
        |> Decode.andThen (\r ->
            if Array.length r.energyPerMass /= Array.length r.name then
                Decode.fail "must have equal numbers of energy per mass and food names"
            else if not (uniqueNames r.name) then
                Decode.fail "food names must be unique"

            else
                Decode.succeed (Foods r))


uniqueNames : Array FoodName -> Bool
uniqueNames names =
    Array.length names == numUnique names


numUnique : Array FoodName -> Int
numUnique =
    Array.toList >> List.map FoodName.toString >> Set.fromList >> Set.size


getEnergyRate : FoodId -> Foods -> Result String EnergyPerMass
getEnergyRate (FoodId id) (Foods {energyPerMass}) =
    case Array.get id energyPerMass of
        Nothing ->
            Err "invalid food ID"

        Just e ->
            Ok e
