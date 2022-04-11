module Waist exposing (Waist, decode, fromStringCm, toInt, toFloat, encode)


import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


-- cm
type Waist
    = Waist Int


toInt : Waist -> Int
toInt (Waist w) =
    w


toFloat : Waist -> Float
toFloat (Waist l) =
    Basics.toFloat l


minWaist : Int
minWaist =
    10


maxWaist : Int
maxWaist =
    300


encode : Waist -> Encode.Value
encode (Waist l) =
    Encode.int l


decode : Decoder Waist
decode =
    Decode.int
        |> Decode.andThen (\raw ->
            case fromInt raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)


fromInt : Int -> Result String Waist
fromInt i =
    if i < minWaist then
        Err "waist too small"

    else if i > maxWaist then
        Err "waist too big"

    else
        Ok (Waist i)


fromStringCm : String -> Result String Waist
fromStringCm raw =
    case String.toInt raw of
        Nothing ->
            Err "not a number"

        Just cm ->
            fromInt cm
