module Mass exposing (Mass, kg, toInt, toHectoGram, fromGrams, decode, tenKilo, gram, greaterThan, lessThan)

import Bitwise
import Json.Decode as Decode exposing (Decoder)


-- g
type Mass
    = Mass Int


kg : Mass
kg =
    Mass 1000


lessThan : Mass -> Mass -> Bool
lessThan (Mass a) (Mass b) =
    a < b


greaterThan : Mass -> Mass -> Bool
greaterThan (Mass a) (Mass b) =
    a > b


toInt : Mass -> Int
toInt (Mass m) =
    m


toHectoGram : Mass -> Int
toHectoGram (Mass m) =
    m // 100


max_ : Int
max_ =
    (Bitwise.shiftLeftBy 31 1) - 1


min_ : Int
min_ =
    1


tenKilo : Mass
tenKilo =
    Mass (10*1000)


gram : Mass
gram =
    Mass 1


fromGrams : Int -> Result String Mass
fromGrams =
    fromInt


fromInt : Int -> Result String Mass
fromInt i =
    if i > max_ then
        Err "mass is too high"

    else if i < min_ then
        Err "mass is too low"

    else
        Ok (Mass i)


decode : Decoder Mass
decode =
    Decode.int
        |> Decode.andThen (\raw ->
            case fromInt raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)
