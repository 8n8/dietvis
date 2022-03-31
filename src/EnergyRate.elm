module EnergyRate exposing (EnergyRate, fromKcalPer100g, greaterThan, lessThan, max_, min_, toString)


import Energy exposing (Energy)
import Mass exposing (Mass)


type EnergyRate
    = EnergyRate Energy Mass


toKcalPer100g : EnergyRate -> String
toKcalPer100g (EnergyRate e m) =
    String.fromInt (Energy.toKcal e // Mass.toHectoGram m)


min_ : EnergyRate
min_ =
    EnergyRate Energy.min_ Mass.kg


max_ : EnergyRate
max_ =
    EnergyRate Energy.max_ Mass.kg


fromKcalPer100g : Int -> Result String EnergyRate
fromKcalPer100g raw =
    if raw < 0 then
        Err "cannot have a negative energy rate"

    else
        Result.map2
            EnergyRate
            (Energy.fromKcal raw)
            (Mass.fromGrams 100)


greaterThan : EnergyRate -> EnergyRate -> Bool
greaterThan a b =
    toInt a > toInt b


lessThan : EnergyRate -> EnergyRate -> Bool
lessThan a b =
    toInt a < toInt b


toInt : EnergyRate -> Int
toInt (EnergyRate e m) =
    Energy.toInt e // Mass.toInt m


toString : EnergyRate -> String
toString e =
    String.fromInt (toInt e)
