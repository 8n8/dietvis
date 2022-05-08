module WaistSizeRecords exposing
    ( WaistSizeRecords
    , decode
    , empty
    , encode
    , insert
    , dailyAverage
    )

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Timestamp exposing (Timestamp, decode)
import WaistSize exposing (WaistSize, decode)
import Time
import Dict exposing (Dict)


type WaistSizeRecords
    = WaistSizeRecords (List WaistSizeRecord)


type alias WaistSizeRecord =
    { timestamp : Timestamp
    , waistSize : WaistSize
    }


dailyAverage : Time.Zone -> WaistSizeRecords -> Timestamp -> List Float
dailyAverage zone (WaistSizeRecords waists) now =
    let
        binned =
            List.foldl (waistDailyBin zone now) Dict.empty waists
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


waistDailyBin : Time.Zone -> Timestamp -> WaistSizeRecord -> Dict Int (List Float) -> Dict Int (List Float)
waistDailyBin zone now waist bins =
    let
        daysOld =
            Timestamp.daysAgo
                { now = now
                , t = waist.timestamp
                , zone = zone
                }
        size = waist.waistSize |> WaistSize.toCm
    in
        case Dict.get daysOld bins of
            Nothing ->
                Dict.insert daysOld [size] bins

            Just oldBin ->
                Dict.insert daysOld (size :: oldBin) bins


insert : Timestamp -> WaistSize -> WaistSizeRecords -> WaistSizeRecords
insert timestamp waistSize (WaistSizeRecords waistSizes) =
    { timestamp = timestamp, waistSize = waistSize }
        :: waistSizes
        |> WaistSizeRecords


encodeOne : WaistSizeRecord -> Encode.Value
encodeOne { timestamp, waistSize } =
    [ ( "timestamp", Timestamp.encode timestamp )
    , ( "waistSize", WaistSize.encode waistSize )
    ]
        |> Encode.object


decode : Decoder WaistSizeRecords
decode =
    Decode.map WaistSizeRecords (Decode.list decodeWaistSizeRecord)


encode : WaistSizeRecords -> Encode.Value
encode (WaistSizeRecords records) =
    Encode.list encodeOne records


decodeWaistSizeRecord : Decoder WaistSizeRecord
decodeWaistSizeRecord =
    Decode.map2 WaistSizeRecord
        (Decode.field "timestamp" Timestamp.decode)
        (Decode.field "waistSize" WaistSize.decode)


empty : WaistSizeRecords
empty =
    WaistSizeRecords []
