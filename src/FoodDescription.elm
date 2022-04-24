module FoodDescription exposing (FoodDescription, decode, encode, fromString)


import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Set exposing (Set)


type FoodDescription
    = FoodDescription String


{-| Nothing special, just intended to be larger than any food
description is likely to be.
-}
maxLength : Int
maxLength =
    1000


fromString : String -> Result String FoodDescription
fromString untrimmed =
    let
        trimmed = String.trim untrimmed
    in
    if String.length trimmed > maxLength then
        Err "too long"

    else if String.length trimmed == 0 then
        Err "empty"

    else if isOkChars trimmed then
        Ok (FoodDescription trimmed)

    else
        Err "contains invalid characters"


isOkChars : String -> Bool
isOkChars s =
    case String.uncons s of
        Just (top, tail) ->
            if Set.member top okChars then
                isOkChars tail

            else
                False

        Nothing ->
            True


okChars : Set Char
okChars =
    [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n'
    , 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A'
    , 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'
    , 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0'
    , '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', '!', '"', '£'
    , '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '~', '#'
    , '[', ']', '{', '}', ';', ':', '\'', '@', '<', ',', '>', '.', '/'
    , '?'
    ]
        |> Set.fromList


decode : Decoder FoodDescription
decode =
    Decode.map FoodDescription Decode.string


encode : FoodDescription -> Encode.Value
encode (FoodDescription f) =
    Encode.string f
