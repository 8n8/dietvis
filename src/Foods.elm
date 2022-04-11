module Foods exposing (Foods, decode, search, insert, encode)


import Set exposing (Set)
import Name exposing (Name)
import EnergyPerMass exposing (EnergyPerMass)
import Dict exposing (Dict)
import Json.Decode as Decode exposing (Decoder)
import Food exposing (Food)
import Json.Encode as Encode
import Array exposing (Array)


type Foods
    = Foods (List Food)


encode : Foods -> Encode.Value
encode (Foods foods) =
    Encode.list Food.encode foods


insert : String -> String -> Foods -> Result String Foods
insert rawName rawKcalPer100g (Foods old) =
    case
        ( Name.fromString rawName
        , EnergyPerMass.fromKcalPer100g rawKcalPer100g)
    of
        (Err err, Err _) ->
            Err err

        (Err err, Ok _) ->
            Err err

        (Ok _, Err err) ->
            Err err

        (Ok name, Ok energyPerMass) ->
            if isNewName old name then
                Food.new energyPerMass name :: old
                |> Foods |> Ok

            else
                Err "duplicate name"


isNewName : List Food -> Name -> Bool
isNewName foods name =
    foods
    |> List.map Food.name
    |> List.filter (Name.equals name)
    |> List.isEmpty


search : String -> Foods -> List Food
search query (Foods foods) =
    foods
        |> List.filter (Food.name >> Name.contains query)
        |> List.sortBy (Food.name >> Name.toString)


decode : Decoder Foods
decode =
    Decode.list Food.decode |> Decode.map Foods
