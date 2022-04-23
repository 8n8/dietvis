module FoodDescription exposing (FoodDescription, decode)


import Json.Decode as Decode exposing (Decoder)


type FoodDescription
    = FoodDescription String


decode : Decoder FoodDescription
decode =
    Decode.map FoodDescription Decode.string
