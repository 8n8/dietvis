module BodyWeight exposing (BodyWeight, decode)


import Json.Decode as Decode exposing (Decoder)


type BodyWeight
    = BodyWeight Int


maxWeight : Int
maxWeight =
    200*1000


minWeight : Int
minWeight =
    1000


decode : Decoder BodyWeight
decode =
    Decode.int
        |> Decode.andThen (\raw ->
            case fromInt raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)


fromInt : Int -> Result String BodyWeight
fromInt i =
            if i < minWeight then
                Err "body weight too low"

            else if i > maxWeight then
                Err "body weight too high"

            else
                Ok (BodyWeight i)
                
