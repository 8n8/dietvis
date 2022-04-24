module Energy exposing (Energy, decode, encode, fromKcalString)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode



-- Energy is measured in kCal


type Energy
    = Energy Int


decode : Decoder Energy
decode =
    Decode.map Energy Decode.int


encode : Energy -> Encode.Value
encode (Energy energy) =
    Encode.int energy


{-| The highest value this holds is a few days of eating by one person.
This is unlikely to be more than 100,000.
-}
maxEnergy : Int
maxEnergy =
    100000



-- The string should be a number of kCal.


fromKcalString : String -> Result String Energy
fromKcalString raw =
    case String.toInt raw of
        Nothing ->
            Err "not a number"

        Just num ->
            if num < 0 then
                Err "negative"

            else if num > maxEnergy then
                Err "too high"

            else
                Ok (Energy num)
