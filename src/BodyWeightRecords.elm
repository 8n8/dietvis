module BodyWeightRecords exposing
    ( BodyWeightRecords
    , dailyAverage
    , decode
    , empty
    , encode
    , insert
    )

import Array exposing (Array)
import BodyWeight exposing (BodyWeight)
import Dict exposing (Dict)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Time
import Timestamp exposing (Timestamp)


type BodyWeightRecords
    = BodyWeightRecords (List BodyWeightRecord)


dailyAverage : Time.Zone -> BodyWeightRecords -> Timestamp -> List Float
dailyAverage zone (BodyWeightRecords weights) now =
    let
        binned =
            List.foldl (weightDailyBin zone now) Dict.empty weights
                |> Dict.map (\_ v -> mean v)

        days =
            Dict.keys binned
                |> List.maximum
                |> Maybe.map (\oldest -> List.range 0 oldest)
                |> Maybe.withDefault []
    in
    List.map (\d -> Dict.get d binned |> Maybe.withDefault 0) days


mean : List Float -> Float
mean data =
    List.sum data |> (\sum -> sum / toFloat (List.length data))


weightDailyBin : Time.Zone -> Timestamp -> BodyWeightRecord -> Dict Int (List Float) -> Dict Int (List Float)
weightDailyBin zone now weight bins =
    let
        daysOld =
            Timestamp.daysAgo
                { now = now
                , t = weight.timestamp
                , zone = zone
                }

        mass =
            weight.bodyWeight |> BodyWeight.toKg
    in
    case Dict.get daysOld bins of
        Nothing ->
            Dict.insert daysOld [ mass ] bins

        Just oldBin ->
            Dict.insert daysOld (mass :: oldBin) bins


type alias BodyWeightRecord =
    { timestamp : Timestamp
    , bodyWeight : BodyWeight
    }


insert :
    Timestamp
    -> BodyWeight
    -> BodyWeightRecords
    -> BodyWeightRecords
insert timestamp bodyWeight (BodyWeightRecords bodyWeights) =
    { timestamp = timestamp, bodyWeight = bodyWeight }
        :: bodyWeights
        |> BodyWeightRecords


decode : Decoder BodyWeightRecords
decode =
    Decode.map BodyWeightRecords (Decode.list decodeOne)


encode : BodyWeightRecords -> Encode.Value
encode (BodyWeightRecords records) =
    Encode.list encodeOne records


encodeOne : BodyWeightRecord -> Encode.Value
encodeOne { timestamp, bodyWeight } =
    [ ( "timestamp", Timestamp.encode timestamp )
    , ( "bodyWeight", BodyWeight.encode bodyWeight )
    ]
        |> Encode.object


decodeOne : Decoder BodyWeightRecord
decodeOne =
    Decode.map2 BodyWeightRecord
        (Decode.field "timestamp" Timestamp.decode)
        (Decode.field "bodyWeight" BodyWeight.decode)


empty : BodyWeightRecords
empty =
    BodyWeightRecords []
