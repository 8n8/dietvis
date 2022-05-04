module FoodMass exposing
    ( FoodMass
    , decode
    , encode
    , fromGramString
    , hundredGrams
    , ratio
    )

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


{-| Measured in grams
-}
type FoodMass
    = FoodMass Int


ratio : FoodMass -> FoodMass -> Float
ratio (FoodMass a) (FoodMass b) =
    toFloat a / toFloat b


hundredGrams : FoodMass
hundredGrams =
    FoodMass 100


decode : Decoder FoodMass
decode =
    Decode.map FoodMass Decode.int


encode : FoodMass -> Encode.Value
encode (FoodMass f) =
    Encode.int f


{-| Food masses are not added, so it is assumed that a meal won't be
more than 10kg.
-}
maxMass : Int
maxMass =
    10000


minMass : Int
minMass =
    1


fromGramString : String -> Result String FoodMass
fromGramString raw =
    case String.toInt raw of
        Nothing ->
            Err "not a whole number"

        Just intGrams ->
            if intGrams < 0 then
                Err "not a positive number"

            else if intGrams > maxMass then
                Err "too high"

            else if intGrams < minMass then
                Err "too low"

            else
                Ok (FoodMass intGrams)
