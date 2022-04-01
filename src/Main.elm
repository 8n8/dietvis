port module Main exposing (main)


import BodyMasses exposing (BodyMasses)
import Element.Font as Font
import Waists exposing (Waists)
import Energy exposing (Energy)
import MealMass exposing (MealMass)
import FoodName exposing (FoodName)
import Element.Input as Input
import Meals exposing (Meals)
import Foods exposing (Foods, Food)
import EnergyPerMass exposing (EnergyPerMass)
import Time_ exposing (Time_)
import Meal exposing (Meal)
import Element exposing (Element)
import Json.Encode as Encode
import Json.Decode as Decode exposing (Decoder)
import Browser
import Browser.Navigation as Navigation
import Url exposing (Url)
import Chart
import Chart.Attributes as Attributes


port elmToJs : Encode.Value -> Cmd msg


getLocalStorageData : Encode.Value
getLocalStorageData =
    Encode.object [ ( "key", Encode.null ) ]


calculateEnergy : MealMass -> EnergyPerMass -> Result String Energy
calculateEnergy mass rate =
    let
        ratio : Int
        ratio =
            MealMass.toInt mass //
                MealMass.toInt (EnergyPerMass.mass rate)
    in
        Energy.fromInt (ratio * EnergyPerMass.energy rate)


type Model
    = LoadingLocalStorage
    | Fatal String
    | LoadedLocalStorage OkModel


type alias OkModel =
        { foodSearchBox : String
        , foodWeightBox : String
        , bodyWeightBox : String
        , waistBox : String
        , meals : Meals
        , weights : BodyMasses
        , waists : Waists
        , foods : Foods
        , now : Time_
        , newFoodNameBox : String
        , newFoodCaloriesBox : String
        }


main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = onUrlRequest
        , onUrlChange = onUrlChange
        }


init : () -> Url -> Navigation.Key -> (Model, Cmd Msg)
init _ _ _ =
    (LoadingLocalStorage, elmToJs getLocalStorageData)


onUrlChange : Url -> Msg
onUrlChange url =
    UrlChange url


onUrlRequest : Browser.UrlRequest -> Msg
onUrlRequest url =
    LinkClick url


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


type alias LocalStorage =
    { meals : Meals
    , weights : BodyMasses
    , waists : Waists
    , foods : Foods
    }


decodeFromJs : Decoder LocalStorage
decodeFromJs =
    Decode.map4 LocalStorage
        Meals.decode
        BodyMasses.decode
        Waists.decode
        Foods.decode


type Msg
    = FromPortOk LocalStorage
    | LinkClick Browser.UrlRequest
    | UrlChange Url
    | SubmitNewMeal
    | NewMealWeight String
    | NewFoodSearch String
    | SubmitNewFood


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        FromPortOk {meals, weights, waists} ->

                    ( LoadedLocalStorage
                        { foodSearchBox = ""
                        , weightBox = ""
                        , waistBox = ""
                        , meals = meals
                        , weights = weights
                        , waists = waists
                        }
                    , Cmd.none
                    )


view : Model -> Browser.Document Msg
view model =
    { title = "Diet"
    , body = Element.layout [] (viewElement model)
    }


viewElement : Model -> Element Msg
viewElement model =
    case model of
        LoadingLocalStorage ->
            Element.text "Loading..."

        Fatal err ->
            Element.text ("Fatal error: " ++ err)

        LoadedLocalStorage loaded ->
            viewLoaded loaded


viewLoaded : OkModel -> Element Msg
viewLoaded {foodSearchBox, foodWeightBox, bodyWeightBox, waistBox, meals, weights, waists, foods, now, newFoodNameBox, newFoodCaloriesBox} =
    Element.column
        []
        [ viewCalories (caloriesLast24Hours meals foods now)
        , addMeal foodSearchBox foodWeightBox foods meals
        , addFood foods newFoodNameBox newFoodCaloriesBox
        , addWaist waistBox
        , addWeight bodyWeightBox
        , weightChart weights
        , waistChart waists
        ]


viewCalories : EnergyPerMass -> Element Msg
viewCalories calories =
    Element.paragraph
        []
        [ Element.el
            [Font.size 30]
            (EnergyPerMass.toKcalPer100g calories)
        , Element.text " consumed in the last 24 hours"
        ]


caloriesLast24Hours : Meals -> Foods -> Time_ -> Energy
caloriesLast24Hours meals foods now =
    Meals.last24Hours meals now
    |> List.map (caloriesInMeal foods)
    |> Energy.sum


caloriesInMeal : Foods -> Meal -> Maybe Energy
caloriesInMeal foods meal =
    Foods.getEnergyRate (Meal.foodId meal) foods
        |> Maybe.map (calculateEnergy (Meal.weight meal))


addMeal :
    { searchBox : String
    , weightBox : String
    , foods : Foods 
    } -> Element Msg
addMeal {searchBox, weightBox, foods} =
    Element.column
        []
        [ Input.text
            []
            { onChange = NewFoodSearch
            , text = searchBox
            , placeHolder = Nothing
            , label =
                Element.text "Search for food"
                |> Input.labelAbove []
            }
        , foodSearchResults (Foods.search searchBox foods)
        , Input.text
            []
            { onChange = NewMealWeight
            , text = weightBox
            , placeHolder = Nothing
            , label =
                Element.text ("Meal weight in grams")
                |> Input.labelAbove []
            }
        , case MealMass.fromStringGrams weightBox of
            Err err ->
                Element.text err

            Ok _ ->
                Element.none
        , Input.button
            []
            { onPress =
                MealMass.fromStringGrams weightBox 
                |> Result.toMaybe
                |> Maybe.map (\_ -> SubmitNewMeal)
            , label = Element.text "Submit meal"
            }
        ]


foodSearchResults : List Food -> Element Msg
foodSearchResults =
    List.map foodSearchResult >> Element.column []


foodSearchResult : Food -> Element Msg
foodSearchResult {name} =
    Element.text (FoodName.toString name)


addFood : Foods -> String -> String -> Element Msg
addFood foods nameBox caloriesBox =
    Element.column
        []
        [ Input.text
            []
            { onChange = NewFoodNameBox
            , text = nameBox
            , placeHolder = Nothing
            , label =
                Element.text "Name of new food"
                |> Element.labelAbove []
            }
        , Input.text
            []
            { onChange = NewFoodCaloriesBox
            , text = caloriesBox
            , placeHolder = Nothing
            , label = Element.text ("Calories in " ++ Calories.units)
            }
        , case Foods.insert nameBox caloriesBox foods of
            Err err ->
                Element.text err

            Ok _ ->
                Element.none
        , Input.button
            []
            { onPress =
                Foods.insert nameBox caloriesBox foods
                |> Result.toMaybe
                |> Maybe.map (\_ -> SubmitNewFood)
            , label = Element.text "Submit new food"
            }
        ]


addWeight : String -> Element Msg
addWeight weightBox =
    Element.row
        []
        [ Input.text
            []
            { onChange = NewWeightBox
            , text = weightBox
            , placeHolder = Nothing
            , label =
                ("Body weight in " ++ BodyWeight.units)
                |> Element.text
                |> Element.labelAbove []
            }
        , Input.button
            []
            { onPress =
                BodyWeight.fromString weightBox
                |> Result.toMaybe
                |> Maybe.map (\_ -> SubmitWeight)
            , label = Element.text "Submit body weight"
            }
        , case BodyWeight.fromString weightBox of
            Err err ->
                Element.text err

            Ok _ ->
                Element.none
        ]


addWaist : String -> Element Msg
addWaist waistBox =
    Element.row
        []
        [ Input.text
            []
            { onChange = NewWaistBox
            , text = waistBox
            , placeHolder = Nothing
            , label =
                ("Waist measurement in " ++ Waist.units)
                |> Element.text
                |> Element.labelAbove []
            }
        , Input.button
            []
            { onPress = Just SubmitWaist
            , label = Element.text "Submit waist measurement"
            }
        , case Waist.fromString waistBox of
            Err err ->
                Element.text err

            Ok _ ->
                Element.none
        ]


weightChart : Weights -> Element Msg
weightChart weights =
    Chart.chart
        [ Attributes.height 300
        , Attributes.width 600
        ]
        [ Chart.xLabels [ Attributes.withGrid ]
        , Chart.yLabels [ Attributes.withGrid ]
        , Chart.series
            .x
            [ Chart.scatter .y [] ]
            (Weights.series weights)
        ]
        |> Element.html


waistChart : Waists -> Element Msg
waistChart waists =
    Chart.chart
        [ Attribute.height 300
        , Attribute.width 600
        ]
        [ Chart.xLabels [ Attributes.withGrid ]
        , Chart.yLabels [ Attributes.withGrid ]
        , Chart.series
            .x
            [ Chart.scatter .y [] ]
            (Waists.series waists)
        ]
        |> Element.html
