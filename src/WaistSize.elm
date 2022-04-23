module WaistSize exposing (WaistSize, decode)


import Json.Decode as Decode exposing (Decoder)


type WaistSize
    = WaistSize Int


decode : Decoder WaistSize
decode =
    Decode.map WaistSize Decode.int
