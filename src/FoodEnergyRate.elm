module FoodEnergyRate exposing (FoodEnergyRate, decode, toString, multiply)


import EnergyRate exposing (EnergyRate)
import Json.Decode as Decode exposing (Decoder)


type FoodEnergyRate
    = FoodEnergyRate EnergyRate


toString : FoodEnergyRate -> String
toString (FoodEnergyRate f) =
    EnergyRate.toString f


max_ : EnergyRate
max_ =
    EnergyRate.fromKcalPer100g 5000
    |> Result.withDefault EnergyRate.max_


min_ : EnergyRate
min_ =
    EnergyRate.fromKcalPer100g 1
    |> Result.withDefault EnergyRate.min_


decode : Decoder FoodEnergyRate
decode =
    Decode.int
        |> Decode.andThen (\raw ->
            case fromInt raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)


fromInt : Int -> Result String FoodEnergyRate
fromInt i =
    case EnergyRate.fromKcalPer100g i of
        Err err ->
            Err err

        Ok rate ->
            if EnergyRate.lessThan rate min_ then
                Err "energy rate is too low"

            else if EnergyRate.greaterThan rate max_ then
                Err "energy rate is too high"

            else
                Ok (FoodEnergyRate rate)
