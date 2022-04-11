module BodyMass exposing (BodyMass, decode, fromStringKg, toInt, toFloat, encode)


import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


-- 100g
type BodyMass
    = BodyMass Int


toFloat : BodyMass -> Float
toFloat (BodyMass b) =
    Basics.toFloat b
    

toInt : BodyMass -> Int
toInt (BodyMass b) =
    b


maxWeight : Int
maxWeight =
    200*10


minWeight : Int
minWeight =
    10


encode : BodyMass -> Encode.Value
encode (BodyMass b) =
    Encode.int b


decode : Decoder BodyMass
decode =
    Decode.int
        |> Decode.andThen (\raw ->
            case fromInt raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)


fromInt : Int -> Result String BodyMass
fromInt i =
            if i < minWeight then
                Err "body weight too low"

            else if i > maxWeight then
                Err "body weight too high"

            else
                Ok (BodyMass i)


fromStringKg : String -> Result String BodyMass
fromStringKg raw =
    case String.toFloat raw of
        Nothing ->
            Err "not a number"

        Just n ->
            fromInt (round (n * 10))
