module BodyWeights exposing (BodyWeights, decode)


import BodyWeight exposing (BodyWeight)
import Array exposing (Array)
import Time_ exposing (Time_)
import Json.Decode as Decode exposing (Decoder)


type BodyWeights
    = BodyWeights
        { timestamps : Array Time_
        , weights : Array BodyWeight
        }


decode : Decoder BodyWeights
decode =
    Decode.map2 (\t w -> { timestamps = t, weights = w})
        (Decode.field "timestamps" (Decode.array Time_.decode))
        (Decode.field "weights" (Decode.array BodyWeight.decode))
        |> Decode.andThen (\r ->
            if Array.length r.timestamps == Array.length r.weights then
                Decode.succeed (BodyWeights r)

            else
                Decode.fail "must have equal numbers of weights and timestamps")
