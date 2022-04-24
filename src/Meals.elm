module Meals exposing (Meals, decode, empty, encode, insert)

import Array exposing (Array)
import EnergyRate exposing (EnergyRate)
import FoodMass exposing (FoodMass)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Meal exposing (Meal)
import Timestamp exposing (Timestamp)


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
