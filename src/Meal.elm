module Meal exposing (Meal, encode, decode, time, new, mass, food)


import Time_ exposing (Time_)
import MealMass exposing (MealMass) 
import Food exposing (Food)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Meal =
    Meal
        { time : Time_
        , mass : MealMass
        , food : Food
        }


new : Time_ -> MealMass -> Food -> Meal
new t m f =
    Meal { time = t, mass = m, food = f}


time : Meal -> Time_
time (Meal meal) =
    meal.time


mass : Meal -> MealMass
mass (Meal meal) =
    meal.mass


food : Meal -> Food
food (Meal meal) =
    meal.food


decode : Decoder Meal
decode =
    Decode.map3 (\t m f -> Meal { time = t, mass = m, food = f})
        (Decode.field "time" Time_.decode)
        (Decode.field "mass" MealMass.decode)
        (Decode.field "food" Food.decode)


encode : Meal -> Encode.Value
encode (Meal meal) =
    Encode.object
        [ ( "time", Time_.encode meal.time )
        , ( "mass", MealMass.encode meal.mass )
        , ("food", Food.encode meal.food )
        ]
