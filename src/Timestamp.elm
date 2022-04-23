module Timestamp exposing (Timestamp, decode)


import Json.Decode as Decode exposing (Decoder)


type Timestamp
    = Timestamp Int


decode : Decoder Timestamp
decode =
    Decode.map Timestamp Decode.int
