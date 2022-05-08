port module Main exposing (main)

import BodyWeight exposing (BodyWeight)
import BodyWeightRecords exposing (BodyWeightRecords)
import Browser
import Element exposing (Element)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font exposing (Font)
import Element.Input as Input
import Element.Region as Region
import Energy exposing (Energy)
import EnergyRate exposing (EnergyRate)
import File as File exposing (File)
import File.Download as Download
import File.Select as Select
import Food exposing (Food)
import FoodDescription exposing (FoodDescription)
import FoodMass exposing (FoodMass)
import Foods exposing (Foods)
import Html exposing (Html)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Meal exposing (Meal)
import Meals exposing (Meals)
import PageNum exposing (PageNum)
import Process
import Task
import Time
import Timestamp exposing (Timestamp)
import WaistSize exposing (WaistSize)
import WaistSizeRecords exposing (WaistSizeRecords)


type Model
    = Fatal String
    | LoadingZoneAndTime Cache
    | LoadingZone Cache Timestamp
    | LoadingTime Cache Time.Zone
    | Ok_ OkModel


type Msg
    = FoodSearchBox String
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
        Fatal error ->
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
        |> Encode.encode 0


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
                Err err ->
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
            , Cmd.none
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
    Element.layout
        [ Font.family [ Font.serif ]
        , Element.width Element.fill
        , Element.padding 8
        , Background.color white
        ]
        (viewElement model)


notificationView : String -> Element Msg
notificationView msg =
    if msg == "" then
        Element.none

    else
        Element.text msg
            |> Element.el
                [ Background.color yellow
                , Element.alignBottom
                , Element.centerX
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


viewOk : OkModel -> Element Msg
viewOk model =
    let
        _ = Debug.log "meals" model.meals
    in
    [ header "Amount eaten today"
    , Meals.energyToday model.meals model.now model.zone
        |> energyTodayView
    , header "Record a meal"
    , foodSearchView
        model.customFoods
        model.foodSearchBox
        model.foodSearchResultsPage
    , makeNewMealView
        model.selectedFood
        model.mealWeightBox
        model.mealNotification
    , header "Record a new food"
    , makeNewFoodView
        model.newFoodDescriptionBox
        model.newFoodEnergyBox
        model.foodNotification
    , header "Record a body weight"
    , bodyWeightView model.bodyWeightBox model.bodyWeightNotification
    , header "Record a waist size"
    , waistSizeView model.waistSizeBox model.waistSizeNotification
    , header "Body weight chart"
    , dailyChartView
        { zone = model.zone
        , now = model.now
        , pageNum = model.bodyWeightsPage
        , data =
            BodyWeightRecords.dailyAverage
                model.zone
                model.bodyWeightRecords
                model.now
        , toString =
            (*) 10
                >> round
                >> toFloat
                >> (\f -> f / 10)
                >> String.fromFloat
        }
    , header "Waist size chart"
    , dailyChartView
        { zone = model.zone
        , now = model.now
        , pageNum = model.waistSizesPage
        , data =
            WaistSizeRecords.dailyAverage
                model.zone
                model.waistSizeRecords
                model.now
        , toString =
            (*) 10
                >> round
                >> toFloat
                >> (\f -> f / 10)
                >> String.fromFloat
        }
    , header "Daily calories chart"
    , dailyChartView
        { zone = model.zone
        , now = model.now
        , pageNum = model.mealsPage
        , data = Meals.dailyCalories model.zone model.meals model.now
        , toString = round >> String.fromInt
        }
    ]
        |> Element.column
            [ Element.spacing 15
            , Element.width Element.fill
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
    }
    -> Element Msg
dailyChartView {zone, now, pageNum, data, toString} =
    let
        numRows = dataPerPage * (PageNum.pageNum pageNum)
        dates = Timestamp.nDaysUpTo (List.length data) now 
        maxData = List.maximum data |> Maybe.withDefault 0
    in
        List.map2
            (\point date ->
                dataPointView
                    { zone = zone
                    , max_ = maxData
                    , point = point
                    , toString = toString
                    , date = date
                    })
            (List.take numRows data)
            dates
        |> Element.column []


barScale : Float
barScale =
    200


dataPointView :
    { zone : Time.Zone
    , max_ : Float
    , point : Float
    , toString : Float -> String
    , date : Timestamp
    }
    -> Element Msg
dataPointView {zone, max_, point, toString, date} =
    let
        barWidth = point * barScale / max_
        gap = barScale - barWidth
    in
    [ Element.el
        [Element.width (Element.px (round barWidth))
        , Element.height (Element.px 12)
        , Background.color blueMountain
        ]
        Element.none
    , Element.el
        [Element.width (Element.px (round gap))
        , Element.height (Element.px 12)
        ]
        Element.none
    , Element.el
        [Element.width (Element.px 60)]
        (Element.text (toString point))
    , Element.el
        []
        (Element.text (Timestamp.ddMmYy zone date))
    ]
    |> Element.row [Element.spacing 8]


saved notificationStatus =
    case notificationStatus of
        On ->
            Element.el
                [ Background.color yellow ]
                (Element.text "saved")
                |> List.singleton

        Off ->
            []


bodyWeightView : String -> NotificationStatus -> Element Msg
bodyWeightView bodyWeightBox notificationStatus =
    [ { onChange = BodyWeightBox
      , label =
            Element.text "Body weight in kg:"
                |> Input.labelLeft []
      , placeholder = Nothing
      , text = bodyWeightBox
      }
        |> Input.text [ Element.width (Element.px 100) ]
        |> List.singleton
    , boxErr bodyWeightBox BodyWeight.fromKgString
    , saveButton SubmitBodyWeight
    , saved notificationStatus
    ]
        |> List.concat
        |> Element.wrappedRow [ Element.spacing 8 ]


saveButton msg =
    { onPress = Just msg
    , label = Element.text "Save"
    }
        |> Input.button lessMoreStyle
        |> List.singleton


waistSizeView : String -> NotificationStatus -> Element Msg
waistSizeView waistSizeBox notificationStatus =
    [ { onChange = WaistSizeBox
      , label =
            Element.text "Waist size in cm:"
                |> Input.labelLeft []
      , placeholder = Nothing
      , text = waistSizeBox
      }
        |> Input.text [ Element.width (Element.px 100) ]
        |> List.singleton
    , saveButton SubmitWaistSize
    , boxErr waistSizeBox WaistSize.fromCmString
    , saved notificationStatus
    ]
        |> List.concat
        |> Element.wrappedRow [ Element.spacing 8 ]


makeNewFoodView : String -> String -> NotificationStatus -> Element Msg
makeNewFoodView description energy notificationStatus =
    [ { onChange = NewFoodDescriptionBox
      , label =
            Input.labelLeft
                []
                (Element.text "Food description:")
      , placeholder = Nothing
      , text = description
      }
        |> Input.text [ Element.width (Element.maximum 400 Element.fill), Element.alignLeft ]
        |> List.singleton
    , boxErr description FoodDescription.fromString
    , { onChange = NewFoodEnergyBox
      , label =
            Input.labelLeft [] (Element.text "Food energy in kCal per 100g:")
      , placeholder = Nothing
      , text = energy
      }
        |> Input.text [ Element.width (Element.px 100) ]
        |> List.singleton
    , boxErr energy EnergyRate.fromKcalPer100gString
    , saveButton SubmitNewFood
    , saved notificationStatus
    ]
        |> List.concat
        |> Element.column [ Element.spacing 8 ]


type NotificationStatus
    = On
    | Off


makeNewMealView : Maybe Food -> String -> NotificationStatus -> Element Msg
makeNewMealView selectedFood mealWeightBox notificationStatus =
    case selectedFood of
        Nothing ->
            Element.none

        Just selectedFood_ ->
            Element.column
                [ Element.spacing 8 ]
                [ selectedFoodView selectedFood_
                , [ mealWeightBoxView mealWeightBox |> List.singleton
                  , mealWeightBoxError mealWeightBox
                  ]
                    |> List.concat
                    |> Element.wrappedRow [ Element.spacing 8 ]
                , [ saveButton SubmitMeal
                  , saved notificationStatus
                  ]
                    |> List.concat
                    |> Element.row [ Element.spacing 8 ]
                ]


mealWeightBoxError : String -> List (Element Msg)
mealWeightBoxError contents =
    boxErr contents FoodMass.fromGramString


boxErr : String -> (String -> Result String a) -> List (Element Msg)
boxErr contents f =
    if contents == "" then
        []

    else
        case f contents of
            Err err ->
                Element.text err
                    |> Element.el [ Background.color yellow ]
                    |> List.singleton

            Ok _ ->
                []


mealWeightBoxView : String -> Element Msg
mealWeightBoxView contents =
    Input.text
        [ Element.width (Element.px 100) ]
        { onChange = MealWeightBox
        , text = contents
        , placeholder = Nothing
        , label = Input.labelLeft [] (Element.text "Meal weight in grams: ")
        }


submitButtonStyle =
    [ Element.padding 15
    , Element.mouseOver [ Background.color whiteHover ]
    , Border.solid
    , Border.width 1
    , Border.color darkBrown
    , Border.rounded 3
    ]


submitMealButton : Element Msg
submitMealButton =
    Input.button
        submitButtonStyle
        { onPress = Just SubmitMeal
        , label = Element.text "Record meal"
        }


selectedFoodView : Food -> Element Msg
selectedFoodView food =
    Element.paragraph
        [ Font.size 30 ]
        [ "Selected food: "
            |> Element.text
            |> Element.el [ Font.size 20, Font.regular ]
        , food
            |> Food.description
            |> FoodDescription.toString
            |> Element.text
        , food
            |> Food.energyRate
            |> EnergyRate.energy
            |> Energy.toInt
            |> String.fromInt
            |> (\s -> " (" ++ s ++ " kCal / 100g)")
            |> Element.text
        ]


foodResultsPerPage : Int
foodResultsPerPage =
    20


totalPages : Int -> Int
totalPages numResults =
    (toFloat numResults / toFloat foodResultsPerPage) |> ceiling


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
        ]
        (foodSearchBoxView searchBox
            :: (foodSearchResultsView matches
                    ++ foodSearchPaginationView pageNum
               )
        )


header : String -> Element Msg
header text =
    Element.el
        [ Font.size 25
        , Region.heading 1
        , Font.color blueMountain
        ]
        (Element.text text)


foodSearchPaginationView : PageNum -> List (Element Msg)
foodSearchPaginationView pageNum =
    if PageNum.totalPages pageNum <= 1 then
        []

    else if PageNum.isFirstPage pageNum then
        moreFoodSearchResultsButton |> List.singleton

    else if PageNum.isLastPage pageNum then
        lessFoodSearchResultsButton |> List.singleton

    else
        Element.row
            [ Element.spacing 8
            ]
            [ moreFoodSearchResultsButton
            , lessFoodSearchResultsButton
            ]
            |> List.singleton


moreFoodSearchResultsButton : Element Msg
moreFoodSearchResultsButton =
    Input.button
        lessMoreStyle
        { onPress = Just OneMoreFoodSearchPage
        , label = Element.text "more results"
        }


lessMoreStyle : List (Element.Attribute Msg)
lessMoreStyle =
    [ Element.padding 15
    , Element.mouseOver [ Background.color whiteHover ]
    , Border.solid
    , Font.color mustard
    , Border.width 1
    , Border.color mustard
    , Border.rounded 3
    ]


lessFoodSearchResultsButton : Element Msg
lessFoodSearchResultsButton =
    Input.button
        lessMoreStyle
        { onPress = Just OneLessFoodSearchPage
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
        [ Element.width (Element.maximum 400 Element.fill) ]
        { onChange = FoodSearchBox
        , text = contents
        , placeholder = Nothing
        , label = Input.labelLeft [] (Element.text "Food search:")
        }


energyTodayView : Energy -> Element Msg
energyTodayView energy =
    Element.paragraph
        [ Font.color darkBrown ]
        [ energy
            |> Energy.toKcal
            |> String.fromInt
            |> Element.text
            |> Element.el [ Font.size 50 ]
        , Element.text " kCal eaten today"
        ]


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


orange : Element.Color
orange =
    Element.rgb255 238 155 17


beige : Element.Color
beige =
    Element.rgb255 242 200 158


yellow : Element.Color
yellow =
    Element.rgb255 255 176 63


blueMountain : Element.Color
blueMountain =
    Element.rgb255 137 180 214


blueCloud : Element.Color
blueCloud =
    Element.rgb255 180 204 232


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
