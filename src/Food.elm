module Food exposing (Food)


import EnergyRate exposing (EnergyRate)
import FoodDescription exposing (FoodDescription)

type Food
    = Food
        { description : FoodDescription
        , energyRate : EnergyRate
        }
