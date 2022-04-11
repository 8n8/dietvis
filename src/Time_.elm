module Time_ exposing (Time_, decode, greaterThan, toInt, toFloat, day, floorMinus, encode)


import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Time_
    = Time_ Int


floorMinus : Time_ -> Time_ -> Time_
floorMinus (Time_ a) (Time_ b) =
    a - b |> max 0 |> Time_


toFloat : Time_ -> Float
toFloat (Time_ t) =
    Basics.toFloat t


toInt : Time_ -> Int
toInt (Time_ t) =
    t


posixEpochSeconds : Int
posixEpochSeconds =
    1648661481


decode : Decoder Time_
decode =
    Decode.int
        |> Decode.andThen (\raw ->
            if raw < 0 then
                Decode.fail "Can't have negative time"

            else
                Decode.succeed (Time_ raw))


encode : Time_ -> Encode.Value
encode (Time_ t) =
    Encode.int t


greaterThan : Time_ -> Time_ -> Bool
greaterThan (Time_ a) (Time_ b) =
    a > b


day : Time_
day =
    Time_ 24
