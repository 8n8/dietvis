module Timestamp exposing (Timestamp, decode, encode, fromPosix)


import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Time


type Timestamp
    = Timestamp Time.Posix


decode : Decoder Timestamp
decode =
    Decode.map (Time.millisToPosix >> Timestamp) Decode.int


encode : Timestamp -> Encode.Value
encode (Timestamp t) =
    Encode.int (Time.posixToMillis t)


fromPosix : Time.Posix -> Timestamp
fromPosix posix =
    Timestamp posix
