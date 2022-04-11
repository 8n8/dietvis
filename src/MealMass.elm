module MealMass exposing (MealMass, decode, toHectoGram, hundredGrams, toInt, fromInt, fromStringGrams, encode)


import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


-- g
type MealMass
    = MealMass Int


toHectoGram : MealMass -> Int
toHectoGram (MealMass m) =
    m // 100


hundredGrams : MealMass
hundredGrams =
    MealMass 100


decode : Decoder MealMass
decode =
    Decode.int
        |> Decode.andThen (\raw ->
            case fromInt raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)


encode : MealMass -> Encode.Value
encode (MealMass m) =
    Encode.int m


max_ : Int
max_ =
    10000


min_ : Int
min_ =
    1


toInt : MealMass -> Int
toInt (MealMass i) =
    i


fromInt : Int -> Result String MealMass
fromInt i =
    if i < min_ then
        Err "food mass too low"

    else if i > max_ then
        Err "food mass too high"

    else
        Ok (MealMass i)


fromStringGrams : String -> Result String MealMass
fromStringGrams raw =
    case String.toInt (String.trim raw) of
        Nothing ->
            Err "not a number"

        Just i ->
            fromInt i
                
