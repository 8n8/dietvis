module WaistSizeRecords exposing (WaistSizeRecords, decode, empty)


import WaistSize exposing (WaistSize, decode)
import Timestamp exposing (Timestamp, decode)
import Json.Decode as Decode exposing (Decoder)


type WaistSizeRecords
    = WaistSizeRecords (List WaistSizeRecord)


type alias WaistSizeRecord =
        { timestamp : Timestamp
        , waistSizes : WaistSize
        }


decode : Decoder WaistSizeRecords
decode =
    Decode.map WaistSizeRecords (Decode.list decodeWaistSizeRecord)


decodeWaistSizeRecord : Decoder WaistSizeRecord
decodeWaistSizeRecord =
    Decode.map2 WaistSizeRecord
        (Decode.field "timestamp" Timestamp.decode)
        (Decode.field "waistSize" WaistSize.decode)


empty : WaistSizeRecords
empty =
    WaistSizeRecords []
