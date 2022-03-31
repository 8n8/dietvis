module MealWeight exposing (MealWeight, decode, toMass)


import Json.Decode as Decode exposing (Decoder)
import Mass exposing (Mass)


type MealWeight
    = MealWeight Mass


toMass : MealWeight -> Mass
toMass (MealWeight m) =
    m


decode : Decoder MealWeight
decode =
    Mass.decode
        |> Decode.andThen (\raw ->
            case fromMass raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)


maxWeight : Mass
maxWeight =
    Mass.tenKilo


minWeight : Mass
minWeight =
    Mass.gram


fromMass : Mass -> Result String MealWeight
fromMass i =
    if Mass.lessThan i minWeight then
        Err "food weight too low"

    else if Mass.greaterThan i maxWeight then
        Err "food weight too high"

    else
        Ok (MealWeight i)
