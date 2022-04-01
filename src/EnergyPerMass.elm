module EnergyPerMass exposing (EnergyPerMass, fromKcalPer100g, greaterThan, lessThan, decode, toKcalPer100g, mass, energy)


import Energy exposing (Energy)
import MealMass exposing (MealMass)
import Json.Decode as Decode exposing (Decoder)


type EnergyPerMass
    = EnergyPerMass Energy MealMass


mass : EnergyPerMass -> MealMass
mass (EnergyPerMass _ m) =
    m


energy : EnergyPerMass -> Energy
energy (EnergyPerMass e _) =
    e


toKcalPer100g : EnergyPerMass -> String
toKcalPer100g (EnergyPerMass e m) =
    String.fromInt (Energy.toKcal e // MealMass.toHectoGram m)


fromKcalPer100g : Int -> Result String EnergyPerMass
fromKcalPer100g raw =
    Result.map
        (\e -> EnergyPerMass e MealMass.hundredGrams)
        (Energy.fromKcal raw)


greaterThan : EnergyPerMass -> EnergyPerMass -> Bool
greaterThan a b =
    toInt a > toInt b


lessThan : EnergyPerMass -> EnergyPerMass -> Bool
lessThan a b =
    toInt a < toInt b


toInt : EnergyPerMass -> Int
toInt (EnergyPerMass e m) =
    Energy.toInt e // MealMass.toInt m


decode : Decoder EnergyPerMass
decode =
    Decode.int
        |> Decode.andThen (\raw ->
            case fromInt raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)


fromInt : Int -> Result String EnergyPerMass
fromInt i =
    Result.map2
        EnergyPerMass
        (Energy.fromInt i)
        (MealMass.fromInt 1)
