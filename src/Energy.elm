module Energy exposing (Energy, fromKcal, toInt, max_, min_, toKcal, sum)


import Bitwise


-- Cal == KCal / 1000
type Energy
    = Energy Int


sum : List Energy -> Result String Energy
sum =
    sumHelp zero


sumHelp : Energy -> List Energy -> Result String Energy
sumHelp oldSum energies =
    case energies of
        [] ->
            Ok oldSum 

        head :: tail -> 
            case plus oldSum head of
                Err err ->
                    Err err

                Ok newSum ->
                    sumHelp newSum tail


plus : Energy -> Energy -> Result String Energy
plus (Energy a) (Energy b) =
    fromInt (a + b)


zero : Energy
zero =
    Energy 0


max_ : Energy
max_ =
    Energy rawMax


rawMax : Int
rawMax =
    (Bitwise.shiftLeftBy 31 1) - 1


min_ : Energy
min_ =
    Energy rawMin


rawMin : Int
rawMin =
    0


fromKcal : Int -> Result String Energy
fromKcal raw =
    fromInt (raw * 1000)


fromInt : Int -> Result String Energy
fromInt raw =
    if raw < rawMin then
        Err "energy cannot be negative"

    else
        if raw > rawMax then
            Err "energy is too high"

        else
            Ok (Energy raw)


toInt : Energy -> Int
toInt (Energy e) =
    e


toKcal : Energy -> Int
toKcal (Energy e) =
    e // 1000
