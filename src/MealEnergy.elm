module MealEnergy exposing (MealEnergy, sum, calculate)


import Energy exposing (Energy)
import FoodEnergyRate exposing (FoodEnergyRate)
import MealWeight exposing (MealWeight)


type MealEnergy
    = MealEnergy Energy


sum : List MealEnergy -> Result String MealEnergy
sum =
    List.map toEnergy >> Energy.sum >> Result.map MealEnergy


toEnergy : MealEnergy -> Energy
toEnergy (MealEnergy m) =
    m


calculate : MealWeight -> FoodEnergyRate -> MealEnergy
calculate weight rate =
    let
        massRatio : Int
        massRatio =
            (Mass.toInt (MealWeight.mass weight)) //
                (Mass.toInt (FoodEnergyRate.mass rate))
    in
        MealEnergy
            (massRatio * FoodEnergyRate.toInt (FoodEnergyRate.energy rate))
    (MealWeight.toInt weight // FoodEnergyRate.massInt rate) *
    FoodEnergyRate.numerator * 
    FoodEnergyRate.multiply (MealWeight.toMass weight) rate
        |> MealEnergy
