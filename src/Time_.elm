module Time_ exposing (Time_, decode, greaterThan)


import Json.Decode as Decode exposing (Decoder)


type Time_
    = Time_ Int


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


greaterThan : Time_ -> Time_ -> Bool
greaterThan (Time_ a) (Time_ b) =
    a > b
