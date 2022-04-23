port module Main exposing (main)


import PageNum exposing (PageNum)
import Html exposing (Html)
import WaistSizeRecords exposing (WaistSizeRecords)
import Browser
import Food exposing (Food)
import Meals exposing (Meals)
import Foods exposing (Foods)
import BodyWeightRecords exposing (BodyWeightRecords)
import FatalError exposing (FatalError)
import PageNum exposing (PageNum)
import Json.Decode as Decode exposing (Decoder)


type Model
    = Fatal FatalError
    | Ok_ OkModel


type Msg
    = Msg Never


port toLocalStorage : String -> Cmd msg


-- **1480** kCal eaten in the last 24 hours
-- 
-- Food search: |#############|
-- <Avocado (320 kCal / 100g)> <Aubergine (50 kCal / 100g)>
-- <Apple (63 kCal / 100g)>
-- <more results> <less results>
-- 
-- **Banana** is selected
-- Meal weight in grams: |##########|
-- !!Error: meal weight must be a whole number between 1 and 9999!!
-- <Submit meal>
-- 
-- Body weight in kg: |##########|
-- !!Error: body weight must be a number between 10.0 and 700.0!!
-- <Submit body weight>
-- 
-- Waist size in cm: |#########|
-- !!Error: waist size must be a number between 20.0 and 400.0!!
-- 
-- *Body weight chart*
-- 0  30  60  90  120 kg
-- #####################  | 25 July 2021
-- #######################| 24 July 2021
-- ##################     | 23 July 2021
-- ####################   | 22 July 2021
-- #####################  | 21 July 2021
-- ###################    | 20 July 2021
-- ####################   | 19 July 2021
-- ###################### | 18 July 2021
-- <More rows> <Less rows>
-- 
-- *Waist size chart*
-- 0  30  60  90  120 cm
-- #####################  | 25 July 2021
-- #######################| 24 July 2021
-- ##################     | 23 July 2021
-- ####################   | 22 July 2021
-- #####################  | 21 July 2021
-- ###################    | 20 July 2021
-- ####################   | 19 July 2021
-- ###################### | 18 July 2021
-- <More rows> <Less rows>
-- 
-- *Calories chart*
-- 0 500 1000 1500 2000  kCal
-- #####################  | 25 July 2021
-- #######################| 24 July 2021
-- ##################     | 23 July 2021
-- ####################   | 22 July 2021
-- #####################  | 21 July 2021
-- ###################    | 20 July 2021
-- ####################   | 19 July 2021
-- ###################### | 18 July 2021
-- <More rows> <Less rows>
-- 
-- <Download data> <Upload data>
type alias OkModel =
    { foodSearchBox : String
    , customFoods : Foods
    , foodResultsPage : PageNum
    , selectedFood : Maybe Food
    , bodyWeightBox : String
    , waistSizeBox : String
    , bodyWeightRecords : BodyWeightRecords
    , bodyWeightsPage : PageNum
    , waistSizeRecords : WaistSizeRecords
    , waistSizesPage : PageNum
    , meals : Meals
    , mealsPage : PageNum
    }


type alias Cache =
    { customFoods : Foods
    , bodyWeightRecords : BodyWeightRecords
    , waistSizeRecords : WaistSizeRecords
    , meals : Meals
    }


decodeCache : Decoder Cache
decodeCache =
    Decode.map4 Cache
        (Decode.field "foods" Foods.decode)
        (Decode.field "bodyWeightRecords" BodyWeightRecords.decode)
        (Decode.field "waistSizeRecords" WaistSizeRecords.decode)
        (Decode.field "meals" Meals.decode)

main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    (model, Cmd.none)


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


init : Decode.Value -> (Model, Cmd Msg)
init flags =
    case Decode.decodeValue (Decode.nullable decodeCache) flags of
        Err err ->
            ( Fatal (FatalError.fromString (Decode.errorToString err))
            , Cmd.none)

        Ok (Just {customFoods, bodyWeightRecords, waistSizeRecords, meals}) ->
            ( { foodSearchBox = ""
              , customFoods = customFoods
              , foodResultsPage = PageNum.first
              , selectedFood = Nothing
              , bodyWeightBox = ""
              , waistSizeBox = ""
              , bodyWeightRecords = bodyWeightRecords
              , bodyWeightsPage = PageNum.first
              , waistSizeRecords = waistSizeRecords
              , waistSizesPage = PageNum.first
              , meals = meals
              , mealsPage = PageNum.first
              }
              |> Ok_
            , Cmd.none
            )

        Ok Nothing ->
            ( { foodSearchBox = ""
              , customFoods = Foods.empty
              , foodResultsPage = PageNum.first
              , selectedFood = Nothing
              , bodyWeightBox = ""
              , waistSizeBox = ""
              , bodyWeightRecords = BodyWeightRecords.empty
              , bodyWeightsPage = PageNum.first
              , waistSizeRecords = WaistSizeRecords.empty
              , waistSizesPage = PageNum.first
              , meals = Meals.empty
              , mealsPage = PageNum.first
              }
              |> Ok_
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    Html.text "Hello"
