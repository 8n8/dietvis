module Timestamp exposing
    ( Timestamp
    , decode
    , encode
    , fromPosix
    , isToday
    )

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Time


type Timestamp
    = Timestamp Int


isToday : { now : Timestamp, t : Timestamp, zone : Time.Zone } -> Bool
isToday { now, t, zone } =
    let
        midnight =
            latestMidnight now zone
    in
    midnight
        |> Result.map (\m -> greaterThanOrEqual t m)
        |> Result.withDefault False


greaterThanOrEqual : Timestamp -> Timestamp -> Bool
greaterThanOrEqual (Timestamp a) (Timestamp b) =
    a >= b


latestMidnight : Timestamp -> Time.Zone -> Result String Timestamp
latestMidnight now zone =
    let
        posix =
            toPosix now

        hours =
            Time.toHour zone posix

        minutes =
            Time.toMinute zone posix

        millisSinceMidnight =
            (hours * 60 + minutes) * 60 * 1000
    in
    posix
        |> Time.posixToMillis
        |> (\m -> m - millisSinceMidnight)
        |> Time.millisToPosix
        |> fromPosix


toPosix : Timestamp -> Time.Posix
toPosix (Timestamp t) =
    Time.millisToPosix (t * 3600 * 1000 + epoch)


{-| Posix time in milliseconds at the time of writing. This is the
epoch of time as measured in this program.
-}
epoch : Int
epoch =
    1650999492 * 1000


{-| So the time will go for 100 years from the time of writing.
-}
maxTime : Int
maxTime =
    24 * hour * 365 * 100


{-| There is no need for a time resolution greater than 1 hour.
-}
hour : Int
hour =
    1


{-| There's no need for timestamps in the past.
-}
minTime : Int
minTime =
    0


decode : Decoder Timestamp
decode =
    Decode.map Timestamp Decode.int


encode : Timestamp -> Encode.Value
encode (Timestamp t) =
    Encode.int t


fromPosix : Time.Posix -> Result String Timestamp
fromPosix posix =
    let
        millisPosixEpoch =
            Time.posixToMillis posix

        millisNewEpoch =
            millisPosixEpoch - epoch

        hours =
            round (toFloat millisNewEpoch / (1000 * 3600))
    in
    if hours < minTime then
        Err "time is too far in the past"

    else if hours > maxTime then
        Err "time is too far in the future"

    else
        Ok (Timestamp hours)
