module Meals exposing
    ( Meals
    , decode
    , empty
    , encode
    , energyToday
    , insert
    , dailyCalories
    )

import Array exposing (Array)
import Energy exposing (Energy)
import EnergyRate exposing (EnergyRate)
import Dict exposing (Dict)
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


dailyCalories : Time.Zone -> Meals -> Timestamp -> List Float
dailyCalories zone (Meals meals) now =
    let
        binned = List.foldl (mealDailyBin zone now) Dict.empty meals
        days = 
            Dict.keys binned
            |> List.maximum
            |> Maybe.map (\oldest -> List.range 0 oldest)
            |> Maybe.withDefault []
    in
        List.map (\d -> Dict.get d binned |> Maybe.withDefault 0) days


mealDailyBin : Time.Zone -> Timestamp -> Meal -> Dict Int Float -> Dict Int Float
mealDailyBin zone now meal bins =
    let
        daysOld =
            Timestamp.daysAgo
                {now = now, t = Meal.timestamp meal, zone = zone}
        _ = Debug.log "daysOld" daysOld
        kCal = meal |> Meal.energy |> Energy.toKcal |> toFloat
    in
        case Dict.get daysOld bins of
            Nothing ->
                Dict.insert daysOld kCal bins

            Just oldBin ->
                Dict.insert daysOld (kCal + oldBin) bins
