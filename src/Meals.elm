module Meals exposing (Meals, decode, empty)


import Json.Decode as Decode exposing (Decoder)
import Array exposing (Array)
import Timestamp exposing (Timestamp)
import EnergyRate exposing (EnergyRate)
import FoodMass exposing (FoodMass)


type Meals
    = Meals (List Meal)


empty : Meals
empty =
    Meals []


type alias Meal =
        { timestamp : Timestamp
        , energyRates : EnergyRate
        , masses : FoodMass
        }


decodeMeal : Decoder Meal
decodeMeal =
    Decode.map3 Meal
        Timestamp.decode
        EnergyRate.decode
        FoodMass.decode


decode : Decoder Meals
decode =
    Decode.map Meals (Decode.list decodeMeal)
