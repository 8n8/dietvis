module BodyMasses exposing (BodyMasses, decode)


import BodyMass exposing (BodyMass)
import Array exposing (Array)
import Time_ exposing (Time_)
import Json.Decode as Decode exposing (Decoder)


type BodyMasses
    = BodyMasses
        { timestamps : Array Time_
        , weights : Array BodyMass
        }


decode : Decoder BodyMasses
decode =
    Decode.map2 (\t w -> { timestamps = t, weights = w})
        (Decode.field "timestamps" (Decode.array Time_.decode))
        (Decode.field "weights" (Decode.array BodyMass.decode))
        |> Decode.andThen (\r ->
            if Array.length r.timestamps == Array.length r.weights then
                Decode.succeed (BodyMasses r)

            else
                Decode.fail "must have equal numbers of weights and timestamps")
