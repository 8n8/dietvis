port module Main exposing (main)


import BodySeries exposing (BodySeries)
import Element.Font as Font
import WaistSeries exposing (WaistSeries)
import Energy exposing (Energy)
import MealMass exposing (MealMass)
import Name exposing (Name)
import Element.Input as Input
import BodyMass exposing (BodyMass)
import Meals exposing (Meals)
import Meal exposing (Meal)
import Foods exposing (Foods)
import Food exposing (Food)
import EnergyPerMass exposing (EnergyPerMass)
import Time_ exposing (Time_)
import Element exposing (Element)
import Json.Encode as Encode
import Waist exposing (Waist)
import Json.Decode as Decode exposing (Decoder)
import Browser
import Browser.Navigation as Navigation
import Url exposing (Url)
import Chart
import Chart.Attributes as Attributes
import Time


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
    = Fatal String
    | Valid OkModel


type alias OkModel =
    { foodSearchBox : String
    , mealWeightBox : String
    , selectedFood : Maybe Food
    , bodyWeightBox : String
    , waistBox : String
    , meals : Meals
    , weights : BodySeries
    , waists : WaistSeries
    , foods : Foods
    , now : Maybe Time_
    , newFoodNameBox : String
    , newFoodCaloriesBox : String
    }


dataDump : OkModel -> Cmd Msg
dataDump {meals, weights, waists, foods} =
        [ ( "meals", Meals.encode meals )
        , ( "weights", BodySeries.encode weights )
        , ( "waists", WaistSeries.encode waists )
        , ( "foods", Foods.encode foods )
        ]
        |> Encode.object
        |> elmToJs


main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlRequest = onUrlRequest
        , onUrlChange = onUrlChange
        }


init : Decode.Value -> Url -> Navigation.Key -> (Model, Cmd Msg)
init flags _ _ =
    case Decode.decodeValue cacheDecoder flags of
        Err err ->
            ( Fatal (Decode.errorToString err)
            , Cmd.none
            )

        Ok {meals, weights, waists, foods} ->
            ( { foodSearchBox = ""
              , mealWeightBox = ""
              , selectedFood = Nothing
              , bodyWeightBox = ""
              , waistBox = ""
              , meals = meals
              , weights = weights
              , waists = waists
              , foods = foods
              , now = Nothing
              , newFoodNameBox = ""
              , newFoodCaloriesBox = ""
              }
            , Time.now
            )


type alias Flags =
    { now : Time_
    , cache : Cache
    }


type alias Cache =
    { meals : Meals
    , weights : BodySeries
    , waists : WaistSeries
    , foods : Foods
    }


cacheDecoder : Decoder Cache
cacheDecoder =
    Decode.map4 Cache
        (Decode.field "meals" Meals.decode)
        (Decode.field "weights" BodySeries.decode)
        (Decode.field "waists" WaistSeries.decode)
        (Decode.field "foods" Foods.decode)


onUrlChange : Url -> Msg
onUrlChange url =
    UrlChange url


onUrlRequest : Browser.UrlRequest -> Msg
onUrlRequest url =
    LinkClick url


subscriptions : Model -> Sub Msg
subscriptions _ =
    Time.every (60*1000) TimeNow


type alias LocalStorage =
    { meals : Meals
    , weights : BodySeries
    , waists : WaistSeries
    , foods : Foods
    }


decodeFromJs : Decoder LocalStorage
decodeFromJs =
    Decode.map4 LocalStorage
        Meals.decode
        BodySeries.decode
        WaistSeries.decode
        Foods.decode


type Msg
    = LinkClick Browser.UrlRequest
    | UrlChange Url
    | SubmitNewMeal
    | NewMealWeight String
    | NewFoodSearch String
    | SubmitNewFood
    | NewFoodCaloriesBox String
    | NewFoodNameBox String
    | SubmitBodyWeight
    | NewBodyWeightBox String
    | SubmitWaist
    | NewWaistBox String
    | TimeNow Time.Posix


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case model of
        Fatal err ->
            (model, Cmd.none)

        Valid valid ->
            updateOk msg valid


updateOk : Msg -> OkModel -> (Model, Cmd Msg)
updateOk msg model =
    case msg of
        LinkClick _ ->
            (Valid model, Cmd.none)

        UrlChange _ ->
            (Valid model, Cmd.none)

        SubmitNewMeal ->
            let
                newModel : OkModel
                newModel =
                    { model
                      | meals =
                          Meals.insert
                              { time = model.now
                              , oldMeals = model.meals
                              , food = model.selectedFood
                              , mass = model.mealWeightBox
                              }
                              |> Result.withDefault model.meals
                    }
            in
                (Valid newModel, dataDump model)


view : Model -> Browser.Document Msg
view model =
    { title = "Diet"
    , body = Element.layout [] (viewElement model)
    }


viewElement : Model -> Element Msg
viewElement model =
    case model of
        Valid ok ->
            viewOk ok

        Fatal err ->
            Element.text ("Fatal error: " ++ err)


viewOk : OkModel -> Element Msg
viewOk {foodSearchBox, mealWeightBox, bodyWeightBox, waistBox, meals, weights, waists, foods, now, newFoodNameBox, newFoodCaloriesBox} =
    Element.column
        []
        [ viewCalories (caloriesLast24Hours meals foods now)
        , addMeal foodSearchBox mealWeightBox foods meals
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
            (Element.text <| EnergyPerMass.toKcalPer100g calories)
        , Element.text " consumed in the last 24 hours"
        ]


caloriesLast24Hours : Meals -> Foods -> Time_ -> Energy
caloriesLast24Hours meals foods now =
    Meals.last24Hours meals now
    |> List.map (caloriesInMeal foods)
    |> Energy.sum


caloriesInMeal : Foods -> Meal -> Maybe Energy
caloriesInMeal foods meal =
    (Food.energyPerMass (Meal.food meal))
        |> Maybe.map (calculateEnergy (Meal.mass meal))


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
foodSearchResult =
    Food.name >> Name.toString >> Element.text


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
                Element.text "Name of new food" |> Input.labelAbove []
            }
        , Input.text
            []
            { onChange = NewFoodCaloriesBox
            , text = caloriesBox
            , placeHolder = Nothing
            , label = Element.text "Calories in kCal per 100g"
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
            { onChange = NewBodyWeightBox
            , text = weightBox
            , placeHolder = Nothing
            , label =
                "Body weight in kg"
                |> Element.text
                |> Input.labelAbove []
            }
        , Input.button
            []
            { onPress =
                BodyMass.fromStringKg weightBox
                |> Result.toMaybe
                |> Maybe.map (\_ -> SubmitBodyWeight)
            , label = Element.text "Submit body weight"
            }
        , case BodyMass.fromStringKg weightBox of
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
                "Waist measurement in cm"
                |> Element.text
                |> Input.labelAbove []
            }
        , Input.button
            []
            { onPress = Just SubmitWaist
            , label = Element.text "Submit waist measurement"
            }
        , case Waist.fromStringCm waistBox of
            Err err ->
                Element.text err

            Ok _ ->
                Element.none
        ]


weightChart : BodySeries -> Element Msg
weightChart weights =
    Chart.chart
        [ Attributes.height 300
        , Attributes.width 600
        ]
        [ Chart.xLabels [ Attributes.withGrid ]
        , Chart.yLabels [ Attributes.withGrid ]
        , Chart.series
            .time
            [ Chart.scatter .mass [] ]
            (BodySeries.series weights)
        ]
        |> Element.html


waistChart : WaistSeries -> Element Msg
waistChart waists =
    Chart.chart
        [ Attributes.height 300
        , Attributes.width 600
        ]
        [ Chart.xLabels [ Attributes.withGrid ]
        , Chart.yLabels [ Attributes.withGrid ]
        , Chart.series
            .time
            [ Chart.scatter .length [] ]
            (WaistSeries.series waists)
        ]
        |> Element.html
