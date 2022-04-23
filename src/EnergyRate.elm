module EnergyRate exposing (EnergyRate, decode)


import Energy exposing (Energy)
import FoodMass exposing (FoodMass)
import Json.Decode as Decode exposing (Decoder)


type EnergyRate
    = EnergyRate Energy FoodMass


decode : Decoder EnergyRate
decode =
    Decode.map2 EnergyRate
        Energy.decode
        FoodMass.decode

