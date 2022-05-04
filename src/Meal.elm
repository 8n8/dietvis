module Meal exposing (Meal, decode, encode, energy, make, timestamp)

import Energy exposing (Energy)
import EnergyRate exposing (EnergyRate)
import FoodMass exposing (FoodMass)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Timestamp exposing (Timestamp)


type Meal
    = Meal
        { timestamp : Timestamp
        , energyRate : EnergyRate
        , foodMass : FoodMass
        }


timestamp : Meal -> Timestamp
timestamp (Meal meal) =
    meal.timestamp


energy : Meal -> Energy
energy (Meal { energyRate, foodMass }) =
    let
        denominator =
            EnergyRate.denominator energyRate

        ratio =
            FoodMass.ratio foodMass denominator

        energy_ =
            EnergyRate.energy energyRate
    in
    Energy.scale ratio energy_


make : Timestamp -> EnergyRate -> FoodMass -> Meal
make timestamp_ energyRate foodMass =
    Meal
        { timestamp = timestamp_
        , energyRate = energyRate
        , foodMass = foodMass
        }


decode : Decoder Meal
decode =
    Decode.map3 make
        (Decode.field "timestamp" Timestamp.decode)
        (Decode.field "energyRate" EnergyRate.decode)
        (Decode.field "foodMass" FoodMass.decode)


encode : Meal -> Encode.Value
encode (Meal meal) =
    [ ( "timestamp", Timestamp.encode meal.timestamp )
    , ( "energyRate", EnergyRate.encode meal.energyRate )
    , ( "foodMass", FoodMass.encode meal.foodMass )
    ]
        |> Encode.object
