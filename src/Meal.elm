module Meal exposing (Meal, weight)


import Time_ exposing (Time_)
import MealWeight exposing (MealWeight)
import FoodId exposing (FoodId)


type Meal
    = Meal
        { timestamp : Time_
        , weight : MealWeight
        , foodId : FoodId
        }


weight : Meal -> MealWeight
weight (Meal meal) =
    meal.weight
