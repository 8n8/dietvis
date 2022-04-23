module BodyWeightRecords exposing (BodyWeightRecords, decode, empty)


import Json.Decode as Decode exposing (Decoder)
import Array exposing (Array)
import BodyWeight exposing (BodyWeight)
import Timestamp exposing (Timestamp)


type BodyWeightRecords =
    BodyWeightRecords (List BodyWeightRecord)


type alias BodyWeightRecord =
    { timestamp : Timestamp
    , bodyWeight : BodyWeight
    }


decode : Decoder BodyWeightRecords
decode =
    Decode.map BodyWeightRecords (Decode.list decodeOne)


decodeOne : Decoder BodyWeightRecord
decodeOne =
    Decode.map2 BodyWeightRecord
        (Decode.field "timestamp" Timestamp.decode)
        (Decode.field "bodyWeight" BodyWeight.decode)


empty : BodyWeightRecords
empty =
    BodyWeightRecords []
