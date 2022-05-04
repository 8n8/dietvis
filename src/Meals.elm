module Meals exposing
    ( Meals
    , decode
    , empty
    , encode
    , energyToday
    , insert
    )

import Array exposing (Array)
import Energy exposing (Energy)
import EnergyRate exposing (EnergyRate)
import FoodMass exposing (FoodMass)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Meal exposing (Meal)
import Time
import Timestamp exposing (Timestamp)


type Meals
    = Meals (List Meal)


energyToday : Meals -> Timestamp -> Time.Zone -> Energy
energyToday (Meals meals) now zone =
    meals
        |> List.filter
            (Meal.timestamp
                >> (\t ->
                        Timestamp.isToday
                            { now = now, t = t, zone = zone }
                   )
            )
        |> List.map Meal.energy
        |> Energy.sum


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
