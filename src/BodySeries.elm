module BodySeries exposing (BodySeries, decode, series, encode)


import BodyMass exposing (BodyMass)
import Array exposing (Array)
import Time_ exposing (Time_)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Set exposing (Set)


type BodySeries
    = BodySeries (List Point)


type Point
    = Point
        { time : Time_
        , mass : BodyMass
        }


series : BodySeries -> List {time : Float, mass : Float}
series =
    (\(BodySeries s) -> s)
        >> List.map (\(Point p) -> p) 
        >> List.map (\{time, mass} -> {time = Time_.toFloat time, mass = BodyMass.toFloat mass})


unwrap : BodySeries -> List Point
unwrap (BodySeries s) =
    s


encode : BodySeries -> Encode.Value
encode (BodySeries s) =
    Encode.list encodePoint s


encodePoint : Point -> Encode.Value
encodePoint (Point {time, mass}) =
    Encode.object
        [ ( "time", Time_.encode time)
        , ( "mass", BodyMass.encode mass)
        ]


decode : Decoder BodySeries
decode =
    Decode.list decodePoint |> Decode.map BodySeries


decodePoint : Decoder Point
decodePoint =
    Decode.map2 (\t m -> Point { time = t, mass = m})
        (Decode.field "time" Time_.decode)
        (Decode.field "mass" BodyMass.decode)
