module Meals exposing (Meals, decode, last24Hours, insert, encode)


import Array exposing (Array)
import Time_ exposing (Time_)
import MealMass exposing (MealMass)
import Meal exposing (Meal, encode, decode)
import Food exposing (Food)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Meals
    = Meals (List Meal)


type alias Insert =
    { time : Time_
    , oldMeals : Meals
    , food : Food 
    , mass : String
    }


insert : Insert -> Result String Meals
insert {time, oldMeals, food, mass} =
    case MealMass.fromStringGrams mass of
        Err err ->
            Err err

        Ok okMass -> 
            let
                (Meals unwrapped) = oldMeals 
            in
            Meal.new time okMass food :: unwrapped
            |> Meals |> Ok


last24Hours : Time_ -> Meals -> Meals
last24Hours now =
    unwrap
        >> List.filter (last24HoursFilter now)
        >> Meals


unwrap : Meals -> List Meal
unwrap (Meals m) =
    m


last24HoursFilter : Time_ -> Meal -> Bool
last24HoursFilter now meal =
    Time_.greaterThan (Meal.time meal) (Time_.floorMinus now Time_.day)


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
    Decode.list Meal.decode |> Decode.map Meals


encode : Meals -> Encode.Value
encode (Meals meals) =
    Encode.list Meal.encode meals
