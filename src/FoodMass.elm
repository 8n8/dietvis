module FoodMass exposing (FoodMass, decode)


import Json.Decode as Decode exposing (Decoder)


type FoodMass
    = FoodMass Int


decode : Decoder FoodMass
decode =
    Decode.map FoodMass Decode.int
