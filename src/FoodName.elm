module FoodName exposing (FoodName, decode, toString, fromString)


import Json.Decode as Decode exposing (Decoder)


type FoodName
    = FoodName String


toString : FoodName -> String
toString (FoodName f) =
    f


decode : Decoder FoodName
decode =
    Decode.string
        |> Decode.andThen (\raw ->
            case fromString raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)


fromString : String -> Result String FoodName
fromString raw =
    if String.isEmpty (String.trim raw) then
        Err "food name must not be empty"
    
    else
        Ok (FoodName raw)
