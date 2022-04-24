module BodyWeightRecords exposing
    ( BodyWeightRecords
    , decode
    , empty
    , encode
    , insert
    )

import Array exposing (Array)
import BodyWeight exposing (BodyWeight)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Timestamp exposing (Timestamp)


type BodyWeightRecords
    = BodyWeightRecords (List BodyWeightRecord)


type alias BodyWeightRecord =
    { timestamp : Timestamp
    , bodyWeight : BodyWeight
    }


insert :
    Timestamp
    -> BodyWeight
    -> BodyWeightRecords
    -> BodyWeightRecords
insert timestamp bodyWeight (BodyWeightRecords bodyWeights) =
    { timestamp = timestamp, bodyWeight = bodyWeight }
        :: bodyWeights
        |> BodyWeightRecords


decode : Decoder BodyWeightRecords
decode =
    Decode.map BodyWeightRecords (Decode.list decodeOne)


encode : BodyWeightRecords -> Encode.Value
encode (BodyWeightRecords records) =
    Encode.list encodeOne records


encodeOne : BodyWeightRecord -> Encode.Value
encodeOne { timestamp, bodyWeight } =
    [ ( "timestamp", Timestamp.encode timestamp )
    , ( "bodyWeight", BodyWeight.encode bodyWeight )
    ]
        |> Encode.object


decodeOne : Decoder BodyWeightRecord
decodeOne =
    Decode.map2 BodyWeightRecord
        (Decode.field "timestamp" Timestamp.decode)
        (Decode.field "bodyWeight" BodyWeight.decode)


empty : BodyWeightRecords
empty =
    BodyWeightRecords []
