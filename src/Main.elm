port module Main exposing (main)

import BodyWeight
import BodyWeightRecords exposing (BodyWeightRecords)
import Browser
import Browser.Dom as Dom
import Element exposing (Element)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Element.Region as Region
import Energy exposing (Energy)
import EnergyRate
import File exposing (File)
import File.Download as Download
import File.Select as Select
import Food exposing (Food)
import FoodDescription
import FoodMass
import Foods exposing (Foods)
import Html exposing (Html)
import Html.Attributes
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Meal exposing (Meal)
import Meals exposing (Meals)
import PageNum exposing (PageNum)
import Task
import Time
import Timestamp exposing (Timestamp)
import WaistSize
import WaistSizeRecords exposing (WaistSizeRecords)


type Model
    = Fatal String
    | LoadingZoneAndTime Cache
    | LoadingZone Cache Timestamp
    | LoadingTime Cache Time.Zone
    | Ok_ OkModel


type Msg
    = FoodSearchBox String
    | NoOp
    | BadTimestamp
    | Now Timestamp
    | Zone Time.Zone
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
    | DownloadData
    | UploadData
    | SelectedFile File
    | FileLoaded String
    | SelectedFoodPosition (Result Dom.Error Dom.Element)


port toLocalStorage : String -> Cmd msg


{-| A rough ASCII art design of the UI:

    **1480** kCal eaten today

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

    _Body weight chart_
    0 30 60 90 120 kg
    #####################  | 25 July 2021
    #######################| 24 July 2021
    ##################     | 23 July 2021
    ####################   | 22 July 2021
    #####################  | 21 July 2021
    ###################    | 20 July 2021
    ####################   | 19 July 2021
    ###################### | 18 July 2021
    <More rows> <Less rows>

    _Waist size chart_
    0 30 60 90 120 cm
    #####################  | 25 July 2021
    #######################| 24 July 2021
    ##################     | 23 July 2021
    ####################   | 22 July 2021
    #####################  | 21 July 2021
    ###################    | 20 July 2021
    ####################   | 19 July 2021
    ###################### | 18 July 2021
    <More rows> <Less rows>

    _Calories chart_
    0 500 1000 1500 2000 kCal
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
    , fileUploadStatus : FileUploadStatus
    , customFoods : Foods
    , mealNotification : NotificationStatus
    , foodNotification : NotificationStatus
    , bodyWeightNotification : NotificationStatus
    , waistSizeNotification : NotificationStatus
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
    , now : Timestamp
    , zone : Time.Zone
    }


type FileUploadStatus
    = BadFile
    | NoProblems


type Cache
    = Empty
    | NonEmpty NonEmptyCache


type alias NonEmptyCache =
    { customFoods : Foods
    , bodyWeightRecords : BodyWeightRecords
    , waistSizeRecords : WaistSizeRecords
    , meals : Meals
    }


decodeCache : Decoder Cache
decodeCache =
    Decode.nullable Decode.string
        |> Decode.andThen
            (\maybeStr ->
                case maybeStr of
                    Nothing ->
                        Decode.succeed Empty

                    Just str ->
                        case Decode.decodeString decodeNonEmptyCache str of
                            Err err ->
                                Decode.fail (Decode.errorToString err)

                            Ok cache ->
                                Decode.succeed (NonEmpty cache)
            )


decodeNonEmptyCache : Decoder NonEmptyCache
decodeNonEmptyCache =
    Decode.map4 NonEmptyCache
        (Decode.field "customFoods" Foods.decode)
        (Decode.field "bodyWeightRecords" BodyWeightRecords.decode)
        (Decode.field "waistSizeRecords" WaistSizeRecords.decode)
        (Decode.field "meals" Meals.decode)


main : Program Decode.Value Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case model of
        Fatal _ ->
            ( model, Cmd.none )

        LoadingZoneAndTime cache ->
            updateLoadingZoneAndTime cache msg

        LoadingZone cache time ->
            updateLoadingZone cache time msg

        LoadingTime cache zone ->
            updateLoadingTime cache zone msg

        Ok_ okModel ->
            updateOk msg okModel


updateLoadingTime : Cache -> Time.Zone -> Msg -> ( Model, Cmd Msg )
updateLoadingTime cache zone msg =
    let
        nothing =
            ( LoadingTime cache zone, Cmd.none )
    in
    case msg of
        Now time ->
            ( initModelHelp cache zone time |> Ok_, Cmd.none )

        FoodSearchBox _ ->
            nothing

        BadTimestamp ->
            nothing

        Zone _ ->
            nothing

        FoodSearchResultClick _ ->
            nothing

        OneMoreFoodSearchPage ->
            nothing

        OneLessFoodSearchPage ->
            nothing

        MealWeightBox _ ->
            nothing

        SubmitMeal ->
            nothing

        NewFoodDescriptionBox _ ->
            nothing

        NewFoodEnergyBox _ ->
            nothing

        SubmitNewFood ->
            nothing

        BodyWeightBox _ ->
            nothing

        SubmitBodyWeight ->
            nothing

        WaistSizeBox _ ->
            nothing

        SubmitWaistSize ->
            nothing

        OneMoreBodyWeightPage ->
            nothing

        OneLessBodyWeightPage ->
            nothing

        OneMoreWaistSizePage ->
            nothing

        OneLessWaistSizePage ->
            nothing

        OneMoreMealsPage ->
            nothing

        OneLessMealsPage ->
            nothing

        DownloadData ->
            nothing

        UploadData ->
            nothing

        SelectedFile _ ->
            nothing

        FileLoaded _ ->
            nothing

        SelectedFoodPosition _ ->
            nothing

        NoOp ->
            nothing


initModelHelp : Cache -> Time.Zone -> Timestamp -> OkModel
initModelHelp cache zone now =
    { foodSearchBox = ""
    , now = now
    , zone = zone
    , customFoods =
        case cache of
            Empty ->
                Foods.empty

            NonEmpty { customFoods } ->
                customFoods
    , foodSearchResultsPage = PageNum.empty
    , selectedFood = Nothing
    , bodyWeightBox = ""
    , waistSizeBox = ""
    , bodyWeightRecords =
        case cache of
            Empty ->
                BodyWeightRecords.empty

            NonEmpty { bodyWeightRecords } ->
                bodyWeightRecords
    , bodyWeightsPage = PageNum.empty
    , waistSizeRecords =
        case cache of
            Empty ->
                WaistSizeRecords.empty

            NonEmpty { waistSizeRecords } ->
                waistSizeRecords
    , waistSizesPage = PageNum.empty
    , meals =
        case cache of
            Empty ->
                Meals.empty

            NonEmpty { meals } ->
                meals
    , mealsPage = PageNum.empty
    , mealWeightBox = ""
    , newFoodDescriptionBox = ""
    , newFoodEnergyBox = ""
    , fileUploadStatus = NoProblems
    , mealNotification = Off
    , foodNotification = Off
    , bodyWeightNotification = Off
    , waistSizeNotification = Off
    }


updateLoadingZone : Cache -> Timestamp -> Msg -> ( Model, Cmd Msg )
updateLoadingZone cache timestamp msg =
    let
        nothing =
            ( LoadingZone cache timestamp, Cmd.none )
    in
    case msg of
        Zone zone ->
            ( initModelHelp cache zone timestamp |> Ok_, Cmd.none )

        FoodSearchBox _ ->
            nothing

        BadTimestamp ->
            nothing

        Now _ ->
            nothing

        FoodSearchResultClick _ ->
            nothing

        OneMoreFoodSearchPage ->
            nothing

        OneLessFoodSearchPage ->
            nothing

        MealWeightBox _ ->
            nothing

        SubmitMeal ->
            nothing

        NewFoodDescriptionBox _ ->
            nothing

        NewFoodEnergyBox _ ->
            nothing

        SubmitNewFood ->
            nothing

        BodyWeightBox _ ->
            nothing

        SubmitBodyWeight ->
            nothing

        WaistSizeBox _ ->
            nothing

        SubmitWaistSize ->
            nothing

        OneMoreBodyWeightPage ->
            nothing

        OneLessBodyWeightPage ->
            nothing

        OneMoreWaistSizePage ->
            nothing

        OneLessWaistSizePage ->
            nothing

        OneMoreMealsPage ->
            nothing

        OneLessMealsPage ->
            nothing

        DownloadData ->
            nothing

        UploadData ->
            nothing

        SelectedFile _ ->
            nothing

        FileLoaded _ ->
            nothing

        SelectedFoodPosition _ ->
            nothing

        NoOp ->
            nothing


updateLoadingZoneAndTime : Cache -> Msg -> ( Model, Cmd Msg )
updateLoadingZoneAndTime cache msg =
    let
        nothing =
            ( LoadingZoneAndTime cache, Cmd.none )
    in
    case msg of
        Now time ->
            ( LoadingZone cache time, Cmd.none )

        Zone zone ->
            ( LoadingTime cache zone, Cmd.none )

        FoodSearchBox _ ->
            nothing

        BadTimestamp ->
            nothing

        FoodSearchResultClick _ ->
            nothing

        OneMoreFoodSearchPage ->
            nothing

        OneLessFoodSearchPage ->
            nothing

        MealWeightBox _ ->
            nothing

        SubmitMeal ->
            nothing

        NewFoodDescriptionBox _ ->
            nothing

        NewFoodEnergyBox _ ->
            nothing

        SubmitNewFood ->
            nothing

        BodyWeightBox _ ->
            nothing

        SubmitBodyWeight ->
            nothing

        WaistSizeBox _ ->
            nothing

        SubmitWaistSize ->
            nothing

        OneMoreBodyWeightPage ->
            nothing

        OneLessBodyWeightPage ->
            nothing

        OneMoreWaistSizePage ->
            nothing

        OneLessWaistSizePage ->
            nothing

        OneMoreMealsPage ->
            nothing

        OneLessMealsPage ->
            nothing

        DownloadData ->
            nothing

        UploadData ->
            nothing

        SelectedFile _ ->
            nothing

        FileLoaded _ ->
            nothing

        SelectedFoodPosition _ ->
            nothing

        NoOp ->
            nothing


dumpCache : OkModel -> Cmd Msg
dumpCache =
    encodeCache >> toLocalStorage


encodeCache : OkModel -> String
encodeCache { customFoods, bodyWeightRecords, waistSizeRecords, meals } =
    [ ( "customFoods", Foods.encode customFoods )
    , ( "bodyWeightRecords"
      , BodyWeightRecords.encode bodyWeightRecords
      )
    , ( "waistSizeRecords", WaistSizeRecords.encode waistSizeRecords )
    , ( "meals", Meals.encode meals )
    ]
        |> Encode.object
        |> Encode.encode 4


updateOk : Msg -> OkModel -> ( Model, Cmd Msg )
updateOk msg model =
    case msg of
        DownloadData ->
            ( Ok_ model
            , Download.string
                "diet.json"
                "application/json"
                (encodeCache model)
            )

        UploadData ->
            ( Ok_ model
            , Select.file [ "application/json" ] SelectedFile
            )

        SelectedFile file ->
            ( Ok_ model, Task.perform FileLoaded (File.toString file) )

        FileLoaded raw ->
            case Decode.decodeString decodeNonEmptyCache raw of
                Err _ ->
                    ( Ok_ { model | fileUploadStatus = BadFile }
                    , Cmd.none
                    )

                Ok { customFoods, bodyWeightRecords, waistSizeRecords, meals } ->
                    let
                        newModel =
                            { model
                                | customFoods = customFoods
                                , bodyWeightRecords = bodyWeightRecords
                                , waistSizeRecords = waistSizeRecords
                                , meals = meals
                            }
                    in
                    ( Ok_ newModel, dumpCache newModel )

        FoodSearchBox query ->
            let
                pageNumR : Result String PageNum
                pageNumR =
                    foodSearch model.customFoods query
                        |> List.length
                        |> totalPages
                        |> PageNum.first
            in
            case pageNumR of
                Err err ->
                    ( Fatal err, Cmd.none )

                Ok p ->
                    ( Ok_
                        { model
                            | foodSearchBox = query
                            , foodSearchResultsPage = p
                        }
                    , Cmd.none
                    )

        FoodSearchResultClick food ->
            ( Ok_
                { model
                    | selectedFood = Just food
                    , foodSearchBox = ""
                    , foodSearchResultsPage = PageNum.empty
                }
            , Task.attempt
                SelectedFoodPosition
                (Dom.getElement "selectedFood")
            )

        OneMoreFoodSearchPage ->
            case PageNum.plus1 model.foodSearchResultsPage of
                Err err ->
                    ( Fatal err, Cmd.none )

                Ok newPageNum ->
                    ( { model | foodSearchResultsPage = newPageNum }
                        |> Ok_
                    , Cmd.none
                    )

        OneLessFoodSearchPage ->
            case PageNum.minus1 model.foodSearchResultsPage of
                Err err ->
                    ( Fatal err, Cmd.none )

                Ok newPageNum ->
                    ( { model | foodSearchResultsPage = newPageNum }
                        |> Ok_
                    , Cmd.none
                    )

        MealWeightBox contents ->
            ( Ok_
                { model
                    | mealWeightBox = contents
                    , mealNotification = Off
                }
            , Cmd.none
            )

        SubmitMeal ->
            case model.selectedFood of
                Nothing ->
                    ( Ok_ model, Cmd.none )

                Just selectedFood ->
                    case
                        makeMeal
                            { mealWeight = model.mealWeightBox
                            , food = selectedFood
                            , time = model.now
                            }
                    of
                        Err _ ->
                            ( Ok_ model, Cmd.none )

                        Ok meal ->
                            let
                                newModel =
                                    { model
                                        | meals =
                                            Meals.insert
                                                meal
                                                model.meals
                                        , mealNotification = On
                                    }
                            in
                            ( Ok_ newModel
                            , dumpCache newModel
                            )

        SubmitNewFood ->
            case
                makeFood
                    { description = model.newFoodDescriptionBox
                    , energy = model.newFoodEnergyBox
                    }
            of
                Err _ ->
                    ( Ok_ model, Cmd.none )

                Ok food ->
                    let
                        newModel =
                            { model
                                | customFoods =
                                    Foods.insert
                                        food
                                        model.customFoods
                                , foodNotification = On
                            }
                    in
                    ( Ok_ newModel
                    , dumpCache newModel
                    )

        NewFoodDescriptionBox box ->
            ( Ok_
                { model
                    | newFoodDescriptionBox = box
                    , foodNotification = Off
                }
            , Cmd.none
            )

        NewFoodEnergyBox box ->
            ( Ok_
                { model
                    | newFoodEnergyBox = box
                    , foodNotification = Off
                }
            , Cmd.none
            )

        BodyWeightBox box ->
            ( Ok_
                { model
                    | bodyWeightBox = box
                    , bodyWeightNotification = Off
                }
            , Cmd.none
            )

        SubmitBodyWeight ->
            Result.map
                (\bodyWeight ->
                    let
                        newModel =
                            { model
                                | bodyWeightRecords =
                                    BodyWeightRecords.insert
                                        model.now
                                        bodyWeight
                                        model.bodyWeightRecords
                                , bodyWeightNotification = On
                            }
                    in
                    ( Ok_ newModel, dumpCache newModel )
                )
                (BodyWeight.fromKgString model.bodyWeightBox)
                |> Result.withDefault ( Ok_ model, Cmd.none )

        WaistSizeBox box ->
            ( Ok_
                { model
                    | waistSizeBox = box
                    , waistSizeNotification = Off
                }
            , Cmd.none
            )

        SubmitWaistSize ->
            case WaistSize.fromCmString model.waistSizeBox of
                Err _ ->
                    ( Ok_ model, Cmd.none )

                Ok waistSize ->
                    let
                        newModel =
                            { model
                                | waistSizeRecords =
                                    WaistSizeRecords.insert
                                        model.now
                                        waistSize
                                        model.waistSizeRecords
                                , waistSizeNotification = On
                            }
                    in
                    ( Ok_ newModel, dumpCache newModel )

        OneMoreBodyWeightPage ->
            case PageNum.plus1 model.bodyWeightsPage of
                Err err ->
                    ( Fatal err, Cmd.none )

                Ok newPage ->
                    ( Ok_ { model | bodyWeightsPage = newPage }
                    , Cmd.none
                    )

        OneLessBodyWeightPage ->
            case PageNum.minus1 model.bodyWeightsPage of
                Err err ->
                    ( Fatal err, Cmd.none )

                Ok newPage ->
                    ( Ok_ { model | bodyWeightsPage = newPage }
                    , Cmd.none
                    )

        OneMoreWaistSizePage ->
            case PageNum.plus1 model.waistSizesPage of
                Err err ->
                    ( Fatal err, Cmd.none )

                Ok newPage ->
                    ( Ok_ { model | waistSizesPage = newPage }
                    , Cmd.none
                    )

        OneLessWaistSizePage ->
            case PageNum.minus1 model.waistSizesPage of
                Err err ->
                    ( Fatal err, Cmd.none )

                Ok newPage ->
                    ( Ok_ { model | waistSizesPage = newPage }
                    , Cmd.none
                    )

        OneMoreMealsPage ->
            case PageNum.plus1 model.mealsPage of
                Err err ->
                    ( Fatal err, Cmd.none )

                Ok newPage ->
                    ( Ok_ { model | mealsPage = newPage }
                    , Cmd.none
                    )

        OneLessMealsPage ->
            case PageNum.minus1 model.mealsPage of
                Err err ->
                    ( Fatal err, Cmd.none )

                Ok newPage ->
                    ( Ok_ { model | mealsPage = newPage }
                    , Cmd.none
                    )

        BadTimestamp ->
            ( Fatal "bad timestamp", Cmd.none )

        Now now ->
            ( Ok_ { model | now = now }, Cmd.none )

        Zone zone ->
            ( Ok_ { model | zone = zone }, Cmd.none )

        SelectedFoodPosition (Err _) ->
            ( Ok_ model, Cmd.none )

        SelectedFoodPosition (Ok { element }) ->
            ( Ok_ model
            , Task.perform
                (\_ -> NoOp)
                (Dom.setViewport element.x element.y)
            )

        NoOp ->
            ( Ok_ model, Cmd.none )


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
        ( Err err, Err _ ) ->
            Err err

        ( Ok _, Err err ) ->
            Err err

        ( Err err, Ok _ ) ->
            Err err

        ( Ok description_, Ok energy_ ) ->
            Ok (Food.make description_ energy_)


type alias RawMeal =
    { mealWeight : String
    , food : Food
    , time : Timestamp
    }


makeMeal : RawMeal -> Result String Meal
makeMeal { mealWeight, food, time } =
    Result.map
        (Meal.make time (Food.energyRate food))
        (FoodMass.fromGramString mealWeight)


subscriptions : Model -> Sub Msg
subscriptions _ =
    Time.every halfHour posixMsg


posixMsg : Time.Posix -> Msg
posixMsg =
    Timestamp.fromPosix
        >> Result.map Now
        >> Result.withDefault BadTimestamp


halfHour : Float
halfHour =
    30 * 60 * 1000



-- milliseconds


init : Decode.Value -> ( Model, Cmd Msg )
init flags =
    case Decode.decodeValue decodeCache flags of
        Err err ->
            ( Fatal (Decode.errorToString err)
            , Cmd.none
            )

        Ok cache ->
            ( LoadingZoneAndTime cache
            , Cmd.batch
                [ Task.perform posixMsg Time.now
                , Task.perform Zone Time.here
                ]
            )


view : Model -> Html Msg
view model =
    [ Element.text "Diet tracker"
        |> Element.el
            [ Font.size 18
            , Region.heading 1
            , Font.color darkBrown
            , Element.paddingXY 20 8
            , Font.bold
            , Font.family [ Font.sansSerif ]
            , Element.centerX
            , Element.width (Element.maximum 800 Element.fill)
            ]
        |> Element.el
            [ Background.color bluePaleSky
            , Element.width Element.fill
            , Element.width Element.fill
            ]
    , viewElement model
    ]
        |> Element.column [ Element.width Element.fill, Element.spacing 10 ]
        |> Element.layout
            [ Font.family [ Font.serif ]
            , Element.width Element.fill
            , Background.color white
            ]


viewElement : Model -> Element Msg
viewElement model =
    case model of
        Fatal err ->
            viewFatalError err

        LoadingZoneAndTime _ ->
            Element.none

        LoadingZone _ _ ->
            Element.none

        LoadingTime _ _ ->
            Element.none

        Ok_ okModel ->
            viewOk okModel


bodyToString : Float -> String
bodyToString =
    (*) 10
        >> round
        >> toFloat
        >> (\f -> f / 10)
        >> String.fromFloat
        >> (\s ->
                if s == "0" then
                    "-"

                else
                    s
           )


paragraph : String -> Element Msg
paragraph =
    Element.text
        >> Element.el [ normalFontSize ]
        >> List.singleton
        >> Element.paragraph [ Font.color darkBrown ]


viewOk : OkModel -> Element Msg
viewOk model =
    [ paragraph "A tool for tracking a calorie-counting diet."
    , header "Amount eaten today"
    , paragraph "The total number of calories consumed today is:"
    , Meals.energyToday model.meals model.now model.zone
        |> energyTodayView
    , header "Record a meal"
        |> Element.el
            [ Html.Attributes.id "selectedFood"
                |> Element.htmlAttribute
            ]
    , paragraph "To record a meal, first find the food by typing in the search box. Then enter the weight of the meal. If the food is not in the list, make a new one in the next section."
    , foodSearchView
        model.customFoods
        model.foodSearchBox
        model.foodSearchResultsPage
    , makeNewMealView
        model.selectedFood
        model.mealWeightBox
        model.mealNotification
    , header "Record a new food"
    , paragraph "This section is for adding a new type of food to the database. First check if it is already there by searching in the previous section. If not, enter a description for the new food, and the energy."
    , makeNewFoodView
        model.newFoodDescriptionBox
        model.newFoodEnergyBox
        model.foodNotification
    , header "Record a body weight"
    , paragraph "This will record body weight and add it to the charts."
    , bodyWeightView model.bodyWeightBox model.bodyWeightNotification
    , header "Record a waist size"
    , paragraph "This will record waist size and add it to the charts."
    , waistSizeView model.waistSizeBox model.waistSizeNotification
    , header "Body weight chart"
    , paragraph "This chart shows the average body weight for each day, in kilograms, compared to the overall average. A dash means that there was no weight recorded for that day. A brown bar means the weight was less than the average, and a blue bar means it was greater."
    , dailyChartView
        (let
            data =
                BodyWeightRecords.dailyAverage
                    model.zone
                    model.bodyWeightRecords
                    model.now
         in
         { zone = model.zone
         , now = model.now
         , pageNum = model.bodyWeightsPage
         , more = OneMoreBodyWeightPage
         , less = OneLessBodyWeightPage
         , data = data
         , toString = bodyToString
         }
        )
    , header "Waist size chart"
    , paragraph "This chart shows the average waist size for each day, in centimeters, compared to the overall average."
    , dailyChartView
        (let
            data =
                WaistSizeRecords.dailyAverage
                    model.zone
                    model.waistSizeRecords
                    model.now
         in
         { zone = model.zone
         , now = model.now
         , pageNum = model.waistSizesPage
         , more = OneMoreWaistSizePage
         , less = OneLessWaistSizePage
         , data = data
         , toString = bodyToString
         }
        )
    , header "Daily calories chart"
    , paragraph "This chart shows the total calories recorded for each day, in kCal, compared to the first day."
    , dailyChartView
        (let
            data =
                Meals.dailyCalories model.zone model.meals model.now
         in
         { zone = model.zone
         , now = model.now
         , pageNum = model.mealsPage
         , more = OneMoreMealsPage
         , less = OneLessMealsPage
         , data = data
         , toString =
            round
                >> String.fromInt
                >> (\s ->
                        if s == "0" then
                            "-"

                        else
                            s
                   )
         }
        )
    , header "Download data"
    , paragraph "Click this button to download all the data. It's a good idea to do this now and then in case the browser data is deleted."
    , Input.button
        (Element.alignLeft :: lessMoreStyle)
        { onPress = Just DownloadData
        , label = Element.text "Download data"
        }
        |> Element.el [ Element.width Element.fill ]
    , header "Upload data"
    , paragraph "This button is for uploading a previously downloaded data file, and restoring the data in the tool to an earlier point. Note that this will overwrite the data currently in the tool."
    , Input.button
        (Element.alignLeft :: lessMoreStyle)
        { onPress = Just UploadData
        , label = Element.text "Upload data"
        }
        |> Element.el [ Element.width Element.fill ]
    , header "About this tool"
    , [ Element.text "The food database was downloaded from the website of the US Department of Agriculture at "
      , { url = "https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_survey_food_json_2021-10-28.zip"
        , label = Element.text "https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_survey_food_json_2021-10-28.zip"
        }
            |> Element.link [ Font.color blueLink ]
      , Element.text "."
      ]
        |> Element.paragraph [ normalFontSize, Font.color darkBrown ]
    , [ Element.text "The code for this site is available on Github at "
      , { url = "https://github.com/8n8/dietvis"
        , label = Element.text "https://github.com/8n8/dietvis"
        }
            |> Element.link [ Font.color blueLink ]
      , Element.text "."
      ]
        |> Element.paragraph [ normalFontSize, Font.color darkBrown ]
    ]
        |> Element.column
            [ Element.spacing 15
            , Element.width (Element.maximum 800 Element.fill)
            , Element.centerX
            , Element.paddingEach
                { top = 0, bottom = 160, left = 20, right = 20 }
            ]


dataPerPage : Int
dataPerPage =
    10


dailyChartView :
    { zone : Time.Zone
    , now : Timestamp
    , pageNum : PageNum
    , data : List Float
    , toString : Float -> String
    , more : Msg
    , less : Msg
    }
    -> Element Msg
dailyChartView { zone, now, pageNum, data, toString, more, less } =
    let
        numRows =
            dataPerPage * PageNum.pageNum pageNum

        dates =
            Timestamp.nDaysUpTo (List.length data) now

        mean =
            let
                len =
                    data |> List.filter (\f -> f > 0.1) |> List.length
            in
            if len == 0 then
                0

            else
                List.sum data / toFloat len
    in
    [ List.map2
        (\point date ->
            dataPointView
                { zone = zone
                , mean = mean
                , max_ = List.maximum data |> Maybe.withDefault 0
                , min_ =
                    data
                        |> List.filter (\f -> f > 0.1)
                        |> List.minimum
                        |> Maybe.withDefault 0
                , point = point
                , toString = toString
                , date = date
                }
        )
        (List.take numRows data)
        dates
    , paginationView
        { pageNum = pageNum, more = more, less = less }
    ]
        |> List.concat
        |> Element.column [ normalFontSize, Element.spacing 8 ]


barScale : Float
barScale =
    200


maxDataPoint : Float
maxDataPoint =
    10000


dataPointView :
    { zone : Time.Zone
    , max_ : Float
    , mean : Float
    , min_ : Float
    , point : Float
    , toString : Float -> String
    , date : Timestamp
    }
    -> Element Msg
dataPointView { zone, min_, max_, mean, point, toString, date } =
    let
        zero : Float
        zero =
            abs (mean - min_)

        range : Float
        range =
            max_ - min_

        otherEnd : Float
        otherEnd =
            if point < 0.1 then
                zero

            else
                zero + point - mean

        barStart : Float
        barStart =
            barScale * min zero otherEnd / range

        barEnd : Float
        barEnd =
            barScale * max zero otherEnd / range

        gap : Float
        gap =
            barScale - barEnd
    in
    [ Element.el
        [ Element.width (Element.px (round barStart))
        , Element.height (Element.px 4)
        , Element.moveUp 2
        ]
        Element.none
    , Element.el
        [ Element.width (Element.px (round (barEnd - barStart)))
        , Element.height (Element.px 8)
        , Background.color
            (if otherEnd < zero then
                mustard

             else
                blueMountain
            )
        ]
        Element.none
    , Element.el
        [ Element.width (Element.px (round gap))
        , Element.height (Element.px 12)
        ]
        Element.none
    , Element.el
        [ Element.width (Element.px 70)
        , Element.paddingXY 10 0
        ]
        (Element.text
            (if point > maxDataPoint then
                "high"

             else
                toString point
            )
        )
    , Element.el
        []
        (Element.text (Timestamp.ddMm zone date))
    ]
        |> Element.row []


saved : NotificationStatus -> Element Msg
saved notificationStatus =
    case notificationStatus of
        On ->
            Element.el
                [ Background.color yellow
                , Element.alignRight
                , Font.color darkBrown
                , Element.moveDown 4
                ]
                (Element.text "saved")

        Off ->
            Element.none


bodyWeightView : String -> NotificationStatus -> Element Msg
bodyWeightView bodyWeightBox notificationStatus =
    [ { onChange = BodyWeightBox
      , label =
            Element.text "Body weight in kg:"
                |> Input.labelAbove []
      , placeholder = Nothing
      , text = bodyWeightBox
      }
        |> Input.text
            [ Element.width (Element.px 100)
            , boxErr bodyWeightBox BodyWeight.fromKgString
                |> Element.below
            ]
        |> List.singleton
    , saveButton notificationStatus SubmitBodyWeight
        |> List.singleton
    ]
        |> List.concat
        |> Element.row
            [ Element.spacing 8
            , normalFontSize
            , Element.width Element.fill
            ]


saveButton : NotificationStatus -> Msg -> Element Msg
saveButton notificationStatus msg =
    { onPress = Just msg
    , label = Element.text "Save"
    }
        |> Input.button
            (Element.alignRight
                :: Element.moveDown 11
                :: Element.below (saved notificationStatus)
                :: lessMoreStyle
            )


waistSizeView : String -> NotificationStatus -> Element Msg
waistSizeView waistSizeBox notificationStatus =
    [ { onChange = WaistSizeBox
      , label =
            Element.text "Waist size in cm:"
                |> Input.labelAbove []
      , placeholder = Nothing
      , text = waistSizeBox
      }
        |> Input.text
            [ Element.width (Element.px 100)
            , boxErr waistSizeBox WaistSize.fromCmString
                |> Element.below
            ]
        |> List.singleton
    , saveButton notificationStatus SubmitWaistSize
        |> List.singleton
    ]
        |> List.concat
        |> Element.row [ Element.spacing 8, normalFontSize, Element.width Element.fill ]


makeNewFoodView : String -> String -> NotificationStatus -> Element Msg
makeNewFoodView description energy notificationStatus =
    [ { onChange = NewFoodDescriptionBox
      , label =
            Input.labelAbove
                []
                (Element.text "Food description:")
      , placeholder = Nothing
      , text = description
      }
        |> Input.text
            [ Element.width (Element.maximum 400 Element.fill)
            , Element.alignLeft
            , boxErr description FoodDescription.fromString
                |> Element.below
            ]
        |> List.singleton
    , [ { onChange = NewFoodEnergyBox
        , label =
            Input.labelAbove [] (Element.text "Food energy in kCal per 100g:")
        , placeholder = Nothing
        , text = energy
        }
            |> Input.text
                [ Element.width (Element.px 100)
                , boxErr energy EnergyRate.fromKcalPer100gString
                    |> Element.below
                ]
            |> List.singleton
      , saveButton notificationStatus SubmitNewFood
            |> List.singleton
      ]
        |> List.concat
        |> Element.row [ Element.spacing 8, Element.width Element.fill ]
        |> List.singleton
    ]
        |> List.concat
        |> Element.column
            [ Element.spacing 8
            , normalFontSize
            , Element.width Element.fill
            ]


type NotificationStatus
    = On
    | Off


makeNewMealView : Maybe Food -> String -> NotificationStatus -> Element Msg
makeNewMealView selectedFood mealWeightBox notificationStatus =
    case selectedFood of
        Nothing ->
            Element.none

        Just selectedFood_ ->
            [ selectedFoodView selectedFood_
            , [ mealWeightBoxView mealWeightBox
              , saveButton notificationStatus SubmitMeal
              ]
                |> Element.row
                    [ Element.spacing 8
                    , Element.width Element.fill
                    ]
            ]
                |> Element.column [ Element.spacing 8, normalFontSize ]


boxErr : String -> (String -> Result String a) -> Element Msg
boxErr contents f =
    if contents == "" then
        Element.none

    else
        case f contents of
            Err err ->
                Element.text err
                    |> Element.el
                        [ Background.color yellow
                        , Element.moveDown 4
                        ]

            Ok _ ->
                Element.none


mealWeightBoxView : String -> Element Msg
mealWeightBoxView contents =
    { onChange = MealWeightBox
    , text = contents
    , placeholder = Nothing
    , label = Input.labelAbove [] (Element.text "Meal weight in grams: ")
    }
        |> Input.text
            [ Element.width (Element.px 100)
            , boxErr contents FoodMass.fromGramString
                |> Element.below
            ]


normalFontSize : Element.Attribute Msg
normalFontSize =
    Font.size 18


selectedFoodView : Food -> Element Msg
selectedFoodView food =
    Element.paragraph
        [ normalFontSize ]
        [ Element.text "Selected food: "
        , food
            |> Food.description
            |> FoodDescription.toString
            |> Element.text
            |> Element.el [ Font.semiBold ]
        , food
            |> Food.energyRate
            |> EnergyRate.energy
            |> Energy.toInt
            |> String.fromInt
            |> (\s -> " (" ++ s ++ " kCal / 100g)")
            |> Element.text
            |> Element.el [ Font.semiBold ]
        ]


foodResultsPerPage : Int
foodResultsPerPage =
    20


totalPages : Int -> Int
totalPages numResults =
    (toFloat numResults / toFloat foodResultsPerPage) |> ceiling


foodSearch : Foods -> String -> List Food
foodSearch customFoods query =
    if String.isEmpty query then
        []

    else
        let
            customMatches : List Food
            customMatches =
                Foods.search query customFoods

            builtInMatches : List Food
            builtInMatches =
                Foods.search query Foods.builtIns
        in
        customMatches ++ builtInMatches


foodSearchView : Foods -> String -> PageNum -> Element Msg
foodSearchView customFoods searchBox pageNum =
    let
        matches : List Food
        matches =
            foodSearch customFoods searchBox
                |> List.take (PageNum.pageNum pageNum * foodResultsPerPage)
    in
    Element.column
        [ Font.color darkBrown
        , Element.spacing 8
        , Element.width Element.fill
        , normalFontSize
        ]
        (foodSearchBoxView searchBox
            :: (foodSearchResultsView matches
                    ++ paginationView
                        { pageNum = pageNum
                        , more = OneMoreFoodSearchPage
                        , less = OneLessFoodSearchPage
                        }
               )
        )


header : String -> Element Msg
header text =
    Element.el
        [ Font.size 20
        , Region.heading 2
        , Font.bold
        , Font.color blueMountain
        ]
        (Element.text text)


paginationView :
    { pageNum : PageNum
    , more : Msg
    , less : Msg
    }
    -> List (Element Msg)
paginationView { pageNum, more, less } =
    if PageNum.totalPages pageNum <= 1 then
        []

    else if PageNum.isFirstPage pageNum then
        moreResultsButton more |> List.singleton

    else if PageNum.isLastPage pageNum then
        lessResultsButton less |> List.singleton

    else
        Element.row
            [ Element.spacing 8
            ]
            [ moreResultsButton more
            , lessResultsButton less
            ]
            |> List.singleton


moreResultsButton : Msg -> Element Msg
moreResultsButton msg =
    Input.button
        lessMoreStyle
        { onPress = Just msg
        , label = Element.text "more results"
        }


lessMoreStyle : List (Element.Attribute Msg)
lessMoreStyle =
    [ Element.padding 12
    , Element.mouseOver [ Background.color whiteHover ]
    , Border.solid
    , Font.color mustard
    , Border.width 1
    , Border.color mustard
    , Border.rounded 3
    , normalFontSize
    ]


lessResultsButton : Msg -> Element Msg
lessResultsButton msg =
    Input.button
        lessMoreStyle
        { onPress = Just msg
        , label = Element.text "less results"
        }


foodSearchResultsView : List Food -> List (Element Msg)
foodSearchResultsView foods =
    if List.isEmpty foods then
        []

    else
        foods
            |> List.map foodSearchResultView
            |> Element.wrappedRow
                [ Element.spacing 8 ]
            |> List.singleton


foodSearchResultView : Food -> Element Msg
foodSearchResultView food =
    Input.button
        [ Background.color bluePaleSky
        , Element.mouseOver [ Background.color bluePaleSkyHover ]
        , Element.padding 20
        , Border.rounded 3
        , Element.height Element.fill
        ]
        { onPress = Just (FoodSearchResultClick food)
        , label =
            [ food
                |> Food.description
                |> FoodDescription.toString
            , food
                |> Food.energyRate
                |> EnergyRate.energy
                |> Energy.toInt
                |> String.fromInt
                |> (\e -> " (" ++ e ++ " kCal / 100g)")
            ]
                |> String.concat
                |> Element.text
                |> List.singleton
                |> Element.paragraph [ Element.width (Element.px 300), Element.height Element.fill ]
        }


foodSearchBoxView : String -> Element Msg
foodSearchBoxView contents =
    Input.text
        [ Element.width (Element.maximum 600 Element.fill) ]
        { onChange = FoodSearchBox
        , text = contents
        , placeholder = Nothing
        , label = Input.labelAbove [] (Element.text "Food search:")
        }


energyTodayView : Energy -> Element Msg
energyTodayView energy =
    [ energy
        |> Energy.toKcal
        |> String.fromInt
        |> Element.text
        |> Element.el [ Font.bold ]
    , Element.text " kCal"
        |> Element.el [ normalFontSize ]
    ]
        |> Element.paragraph
            [ Font.color darkBrown ]


viewFatalError : String -> Element Msg
viewFatalError err =
    Element.column
        [ Element.spacing 20 ]
        [ Element.paragraph
            [ Font.size 40
            , Font.color darkBrown
            ]
            [ Element.text "Sorry, something went wrong" ]
        , Element.paragraph
            [ Font.size 20
            , Font.color darkBrown
            ]
            [ Element.text "It's not your fault. It's because of a mistake in the code."
            ]
        , Element.paragraph
            [ Font.size 20
            , Font.family [ Font.monospace ]
            , Font.color mustard
            ]
            [ Element.text err ]
        ]


darkBrown : Element.Color
darkBrown =
    Element.rgb255 34 19 16


mustard : Element.Color
mustard =
    Element.rgb255 185 119 32


yellow : Element.Color
yellow =
    Element.rgb255 255 176 63


blueLink : Element.Color
blueLink =
    Element.rgb255 107 150 184


blueMountain : Element.Color
blueMountain =
    Element.rgb255 137 180 214


bluePaleSky : Element.Color
bluePaleSky =
    Element.rgb255 214 236 249


bluePaleSkyHover : Element.Color
bluePaleSkyHover =
    Element.rgb255 204 226 239


white : Element.Color
white =
    Element.rgb255 244 243 238


whiteHover : Element.Color
whiteHover =
    Element.rgb255 234 233 228
