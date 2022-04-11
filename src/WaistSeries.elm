module WaistSeries exposing (WaistSeries, decode, series, encode)


import Array exposing (Array)
import Waist exposing (Waist)
import Time_ exposing (Time_)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Set exposing (Set)


type WaistSeries
    -- (Timestamp, Mass)
    = WaistSeries (List Point)


type Point
    = Point { time : Time_ , length : Waist }


series : WaistSeries -> List {time: Float, length: Float}
series =
    (\(WaistSeries w) -> w)
        >> List.map (\(Point w) -> w)
        >> List.map (\{time, length} -> {time = Time_.toFloat time, length = Waist.toFloat length})


encode : WaistSeries -> Encode.Value
encode (WaistSeries w) =
    Encode.list encodePoint w


decode : Decoder WaistSeries
decode =
    Decode.list decodeWaist |> Decode.map WaistSeries


encodePoint : Point -> Encode.Value
encodePoint (Point {time, length}) =
    Encode.object
        [ ( "time", Time_.encode time)
        , ("length", Waist.encode length)
        ]


decodeWaist : Decoder Point
decodeWaist =
    Decode.map2 (\t l -> Point { time = t, length = l })
        (Decode.field "time" Time_.decode)
        (Decode.field "length" Waist.decode)
