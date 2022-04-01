module Meal exposing (Meal, weight, foodId)


import Time_ exposing (Time_)
import MealMass exposing (MealMass)
import Foods exposing (FoodId)


type Meal
    = Meal
        { timestamp : Time_
        , weight : MealMass
        , foodId : FoodId
        }


weight : Meal -> MealMass
weight (Meal meal) =
    meal.weight


foodId : Meal -> FoodId
foodId (Meal meal) =
    meal.foodId
