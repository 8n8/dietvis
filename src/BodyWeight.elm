module BodyWeight exposing (BodyWeight, decode)

import Json.Decode as Decode exposing (Decoder)

type BodyWeight
    = BodyWeight Int


decode : Decoder BodyWeight
decode =
    Decode.map BodyWeight Decode.int
