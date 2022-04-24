module Meal exposing (Meal, encode, decode, make)

import Timestamp exposing (Timestamp)
import EnergyRate exposing (EnergyRate)
import FoodMass exposing (FoodMass)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Meal =
    Meal
        { timestamp : Timestamp
        , energyRate : EnergyRate
        , foodMass : FoodMass
        }


make : Timestamp -> EnergyRate -> FoodMass -> Meal
make timestamp energyRate foodMass =
    Meal
        { timestamp = timestamp
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
encode (Meal {timestamp, energyRate, foodMass}) =
    [ ( "timestamp", Timestamp.encode timestamp)
    , ( "energyRate", EnergyRate.encode energyRate)
    , ("foodMass", FoodMass.encode foodMass)
    ]
    |> Encode.object
