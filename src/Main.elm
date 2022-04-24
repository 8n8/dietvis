port module Main exposing (main)


import PageNum exposing (PageNum)
import Timestamp exposing (Timestamp)
import WaistSize exposing (WaistSize)
import Html exposing (Html)
import FoodDescription exposing (FoodDescription)
import BodyWeight exposing (BodyWeight)
import WaistSizeRecords exposing (WaistSizeRecords)
import Task
import Json.Encode as Encode
import Browser
import Time
import EnergyRate exposing (EnergyRate)
import Food exposing (Food)
import Meals exposing (Meals)
import Foods exposing (Foods)
import BodyWeightRecords exposing (BodyWeightRecords)
import FatalError exposing (FatalError)
import PageNum exposing (PageNum)
import Json.Decode as Decode exposing (Decoder)
import Meal exposing (Meal)
import FoodMass exposing (FoodMass)


type Model
    = Fatal FatalError
    | Ok_ OkModel


type Msg
    = FoodSearchBox String
    | FoodSearchResultClick Food
    | OneMoreFoodSearchPage
    | OneLessFoodSearchPage
    | MealWeightBox String
    | SubmitMeal
    | NewFoodDescriptionBox String
    | NewFoodEnergyBox String
    | SubmitNewFood
    | BodyWeightBox String
    | SubmitBodyWeight
    | WaistSizeBox String
    | SubmitWaistSize
    | OneMoreBodyWeightPage
    | OneLessBodyWeightPage
    | OneMoreWaistSizePage
    | OneLessWaistSizePage
    | OneMoreMealsPage
    | OneLessMealsPage
    | MealTime Time.Posix
    | BodyWeightTime Time.Posix
    | WaistSizeTime Time.Posix


port toLocalStorage : String -> Cmd msg


{-|
**1480** kCal eaten in the last 24 hours

Food search: |#############|
<Avocado (320 kCal / 100g)> <Aubergine (50 kCal / 100g)>
<Apple (63 kCal / 100g)>
<more results> <less results>

**Banana** is selected
Meal weight in grams: |##########|
!!Error: meal weight must be a whole number between 1 and 9999!!
<Submit meal>

New food description: |################|
Energy (kCal / 100g): |########|
<Submit new food>

Body weight in kg: |##########|
!!Error: body weight must be a number between 10.0 and 700.0!!
<Submit body weight>

Waist size in cm: |#########|
!!Error: waist size must be a number between 20.0 and 400.0!!
<Submit waist size>

*Body weight chart*
0  30  60  90  120 kg
#####################  | 25 July 2021
#######################| 24 July 2021
##################     | 23 July 2021
####################   | 22 July 2021
#####################  | 21 July 2021
###################    | 20 July 2021
####################   | 19 July 2021
###################### | 18 July 2021
<More rows> <Less rows>

*Waist size chart*
0  30  60  90  120 cm
#####################  | 25 July 2021
#######################| 24 July 2021
##################     | 23 July 2021
####################   | 22 July 2021
#####################  | 21 July 2021
###################    | 20 July 2021
####################   | 19 July 2021
###################### | 18 July 2021
<More rows> <Less rows>

*Calories chart*
0 500 1000 1500 2000  kCal
#####################  | 25 July 2021
#######################| 24 July 2021
##################     | 23 July 2021
####################   | 22 July 2021
#####################  | 21 July 2021
###################    | 20 July 2021
####################   | 19 July 2021
###################### | 18 July 2021
<More rows> <Less rows>

<Download data> <Upload data>
-}
type alias OkModel =
    { foodSearchBox : String
    , customFoods : Foods
    , foodSearchResultsPage : PageNum
    , selectedFood : Maybe Food
    , mealWeightBox : String
    , newFoodDescriptionBox : String
    , newFoodEnergyBox : String
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
    case model of
        Fatal error ->
            (model, Cmd.none)

        Ok_ okModel ->
            updateOk msg okModel


dumpCache : OkModel -> Cmd Msg
dumpCache =
    encodeCache >> toLocalStorage


encodeCache : OkModel -> String
encodeCache {customFoods, bodyWeightRecords, waistSizeRecords, meals} =
    [ ("customFoods", Foods.encode customFoods)
    , ("bodyWeightRecords"
      , BodyWeightRecords.encode bodyWeightRecords )
    , ("waistSizeRecords", WaistSizeRecords.encode waistSizeRecords )
    , ("meals", Meals.encode meals)
    ]
        |> Encode.object
        |> Encode.encode 0


updateOk : Msg -> OkModel -> (Model, Cmd Msg)
updateOk msg model =
    case msg of
        FoodSearchBox query ->
            ( Ok_ { model | foodSearchBox = query }, Cmd.none )

        FoodSearchResultClick food ->
            ( Ok_ { model | selectedFood = Just food }, Cmd.none )

        OneMoreFoodSearchPage ->
            case PageNum.plus1 model.foodSearchResultsPage of
                Err err ->
                    ( Fatal (FatalError.fromString err)
                    , Cmd.none
                    )

                Ok newPageNum ->
                    ( { model | foodSearchResultsPage = newPageNum }
                        |> Ok_
                    , Cmd.none
                    )

        OneLessFoodSearchPage ->
            case PageNum.minus1 model.foodSearchResultsPage of
                Err err ->
                    ( Fatal (FatalError.fromString err)
                    , Cmd.none
                    )

                Ok newPageNum ->
                    ( { model | foodSearchResultsPage = newPageNum }
                        |> Ok_
                    , Cmd.none
                    )

        MealWeightBox mealWeightBox ->
            (Ok_ { model | mealWeightBox = mealWeightBox }, Cmd.none)

        SubmitMeal ->
            (Ok_ model, Task.perform MealTime Time.now)

        MealTime posix ->
            case model.selectedFood of
                Nothing ->
                    (Ok_ model, Cmd.none)

                Just selectedFood ->
                    case
                        makeMeal
                            { mealWeight = model.mealWeightBox
                            , food = selectedFood
                            , time = posix
                            }
                    of
                        Err _ ->
                            (Ok_ model, Cmd.none)

                        Ok meal ->
                            let
                                newModel =
                                    { model
                                        | meals =
                                            Meals.insert
                                                meal
                                                model.meals
                                    }
                            in
                            ( Ok_ newModel, dumpCache newModel)

        SubmitNewFood ->
            case
                makeFood
                    { description = model.newFoodDescriptionBox
                    , energy = model.newFoodEnergyBox
                    }
            of
                Err _ ->
                    (Ok_ model, Cmd.none)

                Ok food ->
                    let
                        newModel =
                            { model
                                | customFoods =
                                    Foods.insert
                                        food
                                        model.customFoods
                            }
                    in
                    (Ok_ newModel, dumpCache newModel)

        NewFoodDescriptionBox box ->
            ( Ok_ { model | newFoodDescriptionBox = box }, Cmd.none)

        NewFoodEnergyBox box ->
            ( Ok_ { model | newFoodEnergyBox = box }, Cmd.none )

        BodyWeightBox box ->
            ( Ok_ { model | bodyWeightBox = box }, Cmd.none )

        SubmitBodyWeight ->
            (Ok_ model, Task.perform BodyWeightTime Time.now)

        BodyWeightTime posix ->
            case BodyWeight.fromKgString model.bodyWeightBox of
                Err _ ->
                    (Ok_ model, Cmd.none)

                Ok bodyWeight ->
                    let
                        newModel =
                            { model
                                | bodyWeightRecords =
                                    BodyWeightRecords.insert
                                        (Timestamp.fromPosix posix)
                                        bodyWeight
                                        model.bodyWeightRecords
                            }
                    in
                        ( Ok_ newModel, dumpCache newModel )

        WaistSizeBox box ->
            ( Ok_ { model | waistSizeBox = box }, Cmd.none )

        SubmitWaistSize ->
            (Ok_ model, Task.perform WaistSizeTime Time.now)

        WaistSizeTime posix ->
            case WaistSize.fromCmString model.waistSizeBox of
                Err _ ->
                    (Ok_ model, Cmd.none)

                Ok waistSize ->
                    let
                        newModel =
                            { model
                                | waistSizeRecords =
                                    WaistSizeRecords.insert
                                        (Timestamp.fromPosix posix)
                                        waistSize
                                        model.waistSizeRecords
                            }
                    in
                        (Ok_ newModel, dumpCache newModel)

        OneMoreBodyWeightPage ->
            case PageNum.plus1 model.bodyWeightsPage of
                Err err ->
                    (Fatal (FatalError.fromString err), Cmd.none)

                Ok newPage ->
                    ( Ok_ { model | bodyWeightsPage = newPage }
                    , Cmd.none)

        OneLessBodyWeightPage ->
            case PageNum.minus1 model.bodyWeightsPage of
                Err err ->
                    (Fatal (FatalError.fromString err), Cmd.none)

                Ok newPage ->
                    (Ok_ { model | bodyWeightsPage = newPage}
                    , Cmd.none)

        OneMoreWaistSizePage ->
            case PageNum.plus1 model.waistSizesPage of
                Err err ->
                    (Fatal (FatalError.fromString err), Cmd.none)

                Ok newPage ->
                    ( Ok_ { model | waistSizesPage = newPage }
                    , Cmd.none
                    )

        OneLessWaistSizePage ->
            case PageNum.minus1 model.waistSizesPage of
                Err err ->
                    (Fatal (FatalError.fromString err), Cmd.none)

                Ok newPage ->
                    ( Ok_ { model | waistSizesPage = newPage }
                    , Cmd.none
                    )

        OneMoreMealsPage ->
            case PageNum.plus1 model.mealsPage of
                Err err ->
                    (Fatal (FatalError.fromString err), Cmd.none)

                Ok newPage ->
                    ( Ok_ { model | mealsPage = newPage }
                    , Cmd.none )

        OneLessMealsPage ->
            case PageNum.minus1 model.mealsPage of
                Err err ->
                    (Fatal (FatalError.fromString err), Cmd.none)

                Ok newPage ->
                    ( Ok_ { model | mealsPage = newPage }
                    , Cmd.none
                    )


type alias RawFood =
    { description : String
    , energy : String
    }


makeFood : RawFood -> Result String Food
makeFood { description, energy } =
    case
        ( FoodDescription.fromString description
        , EnergyRate.fromKcalPer100gString energy
        )
    of
        (Err err, Err _) ->
            Err err

        (Ok _, Err err) ->
            Err err

        (Err err, Ok _) ->
            Err err

        (Ok description_, Ok energy_) ->
            Ok (Food.make description_ energy_)


type alias RawMeal =
    { mealWeight : String
    , food : Food
    , time : Time.Posix
    }


makeMeal : RawMeal -> Result String Meal
makeMeal { mealWeight, food, time } =
    case FoodMass.fromGramString mealWeight of
        Err err ->
            Err err

        Ok foodMass ->
            Meal.make
                (Timestamp.fromPosix time)
                (Food.energyRate food)
                foodMass
                |> Ok


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
              , foodSearchResultsPage = PageNum.first
              , selectedFood = Nothing
              , mealWeightBox = ""
              , newFoodDescriptionBox = ""
              , newFoodEnergyBox = ""
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
              , foodSearchResultsPage = PageNum.first
              , selectedFood = Nothing
              , bodyWeightBox = ""
              , waistSizeBox = ""
              , bodyWeightRecords = BodyWeightRecords.empty
              , bodyWeightsPage = PageNum.first
              , waistSizeRecords = WaistSizeRecords.empty
              , waistSizesPage = PageNum.first
              , meals = Meals.empty
              , mealsPage = PageNum.first
              , mealWeightBox = ""
              , newFoodDescriptionBox = ""
              , newFoodEnergyBox = ""
              }
              |> Ok_
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    Html.text "Hello"
