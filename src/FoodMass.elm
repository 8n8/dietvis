module FoodMass exposing (FoodMass, decode, encode, fromGramString, hundredGrams)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


{-| Measured in grams
-}
type FoodMass
    = FoodMass Int


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


fromGramString : String -> Result String FoodMass
fromGramString raw =
    case String.toInt raw of
        Nothing ->
            Err "a food weight must be a whole number"

        Just intGrams ->
            if intGrams < 0 then
                Err "a food weight must be a positive number"

            else if intGrams > maxMass then
                Err "a food weight must not be more than 10kg"

            else
                Ok (FoodMass intGrams)
