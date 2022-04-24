module Meals exposing (Meals, decode, empty, encode, insert)


import Json.Encode as Encode
import Json.Decode as Decode exposing (Decoder)
import Array exposing (Array)
import Timestamp exposing (Timestamp)
import EnergyRate exposing (EnergyRate)
import FoodMass exposing (FoodMass)
import Meal exposing (Meal)


type Meals
    = Meals (List Meal)


empty : Meals
empty =
    Meals []


decode : Decoder Meals
decode =
    Decode.map Meals (Decode.list Meal.decode)


encode : Meals -> Encode.Value
encode (Meals meals) =
    Encode.list Meal.encode meals


insert : Meal -> Meals -> Meals
insert meal (Meals meals) =
    Meals (meal :: meals)
