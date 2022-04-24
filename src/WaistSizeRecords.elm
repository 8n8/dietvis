module WaistSizeRecords exposing
    ( WaistSizeRecords
    , decode
    , empty
    , encode
    , insert
    )

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Timestamp exposing (Timestamp, decode)
import WaistSize exposing (WaistSize, decode)


type WaistSizeRecords
    = WaistSizeRecords (List WaistSizeRecord)


type alias WaistSizeRecord =
    { timestamp : Timestamp
    , waistSize : WaistSize
    }


insert : Timestamp -> WaistSize -> WaistSizeRecords -> WaistSizeRecords
insert timestamp waistSize (WaistSizeRecords waistSizes) =
    { timestamp = timestamp, waistSize = waistSize }
        :: waistSizes
        |> WaistSizeRecords


encodeOne : WaistSizeRecord -> Encode.Value
encodeOne { timestamp, waistSize } =
    [ ( "timestamp", Timestamp.encode timestamp )
    , ( "waistSize", WaistSize.encode waistSize )
    ]
        |> Encode.object


decode : Decoder WaistSizeRecords
decode =
    Decode.map WaistSizeRecords (Decode.list decodeWaistSizeRecord)


encode : WaistSizeRecords -> Encode.Value
encode (WaistSizeRecords records) =
    Encode.list encodeOne records


decodeWaistSizeRecord : Decoder WaistSizeRecord
decodeWaistSizeRecord =
    Decode.map2 WaistSizeRecord
        (Decode.field "timestamp" Timestamp.decode)
        (Decode.field "waistSize" WaistSize.decode)


empty : WaistSizeRecords
empty =
    WaistSizeRecords []
