module WaistSize exposing (WaistSize, decode, encode, fromCmString, toCm)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


{-| mm
-}
type WaistSize
    = WaistSize Int


toCm : WaistSize -> Float
toCm (WaistSize waistSize) =
    toFloat waistSize / 10


decode : Decoder WaistSize
decode =
    Decode.map WaistSize Decode.int


encode : WaistSize -> Encode.Value
encode (WaistSize w) =
    Encode.int w


minWaistSize : Int
minWaistSize =
    1


maxWaistSize : Int
maxWaistSize =
    5000


fromCmString : String -> Result String WaistSize
fromCmString raw =
    case String.toFloat raw of
        Nothing ->
            Err "not a number"

        Just f ->
            let
                asInt =
                    round (f * 10)
            in
            if asInt < minWaistSize then
                Err "too low"

            else if asInt > maxWaistSize then
                Err "too high"

            else
                Ok (WaistSize asInt)
