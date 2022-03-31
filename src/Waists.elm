module Waists exposing (Waists, decode)


import Array exposing (Array)
import Waist exposing (Waist)
import Time_ exposing (Time_)
import Json.Decode as Decode exposing (Decoder)


type Waists
    = Waists
        { timestamps : Array Time_
        , waists : Array Waist
        }


decode : Decoder Waists
decode =
    Decode.map2 (\t w -> {timestamps = t, waists = w})
        (Decode.field "timestamps" (Decode.array Time_.decode))
        (Decode.field "waists" (Decode.array Waist.decode))
        |> Decode.andThen (\r ->
            if Array.length r.timestamps == Array.length r.waists then
                Decode.succeed (Waists r)
            else
                Decode.fail "must have equal numbers of waists and timestamps")
                
