module Energy exposing (Energy, decode)


import Json.Decode as Decode exposing (Decoder)


type Energy
    = Energy Int


decode : Decoder Energy
decode =
    Decode.map Energy Decode.int
