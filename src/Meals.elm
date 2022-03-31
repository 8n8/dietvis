module Meals exposing (Meals, decode, last24Hours)


import Array exposing (Array)
import Time_ exposing (Time_)
import MealWeight exposing (MealWeight)
import FoodId exposing (FoodId)
import Json.Decode as Decode exposing (Decoder)


type Meals
    = Meals Unwrapped


type alias Unwrapped =
    { timestamps : Array Time_
    , weights : Array MealWeight
    , foodIds : Array FoodId
    }


last24Hours : Meals -> Time_ -> Meals
last24Hours (Meals {timestamps, weights, foodIds}) now =
    let
        i : Int
        i = getFirstIndex timestamps now
    in
        { timestamps = Array.slice i -1 timestamps
        , weights = Array.slice i -1 weights
        , foodIds = Array.slice i -1 foodIds
        }
        |> Meals


getFirstIndex : Array Time_ -> Time_ -> Int
getFirstIndex timestamps now =
    getFirstIndexHelp (Array.toList timestamps) now 0


getFirstIndexHelp : List Time_ -> Time_ -> Int -> Int
getFirstIndexHelp remaining now i =
    case remaining of
        [] ->
            i

        top :: tail ->
            if Time_.greaterThan top now then
                i

            else
                getFirstIndexHelp tail now (i+1)


decode : Decoder Meals
decode =
    Decode.map3 Unwrapped
        (Decode.field "timestamps" (Decode.array Time_.decode))
        (Decode.field "weights" (Decode.array MealWeight.decode))
        (Decode.field "foodids" (Decode.array FoodId.decode))
        |> Decode.andThen (\r ->
            if Array.length r.timestamps == Array.length r.weights &&
                Array.length r.timestamps == Array.length r.foodIds
            then
                Decode.succeed (Meals r)

            else
                Decode.fail "must have equal numbers of weights, timestamps and food IDs")
                
