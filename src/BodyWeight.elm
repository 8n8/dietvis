module BodyWeight exposing
    (BodyWeight
    , decode, encode, fromKgString, toKg)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


{-| 0.1 kg
-}
type BodyWeight
    = BodyWeight Int


toKg : BodyWeight -> Float
toKg (BodyWeight bodyWeight) =
    toFloat bodyWeight / 10


decode : Decoder BodyWeight
decode =
    Decode.map BodyWeight Decode.int


encode : BodyWeight -> Encode.Value
encode (BodyWeight b) =
    Encode.int b


maxBodyWeight : Int
maxBodyWeight =
    10000


minBodyWeight : Int
minBodyWeight =
    10


fromKgString : String -> Result String BodyWeight
fromKgString raw =
    case String.toFloat raw of
        Nothing ->
            Err "not a number"

        Just f ->
            let
                asInt =
                    round (f * 10)
            in
            if asInt > maxBodyWeight then
                Err "too high"

            else if asInt < minBodyWeight then
                Err "too low"

            else
                Ok (BodyWeight asInt)
