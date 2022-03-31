module Waist exposing (Waist, decode)


import Json.Decode as Decode exposing (Decoder)


type Waist
    = Waist Int


minWaist : Int
minWaist =
    200


maxWaist : Int
maxWaist =
    5000


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
