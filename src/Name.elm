module Name exposing (Name, encode, decode, fromString, toString, contains, equals)


import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Name
    = Name String


equals : Name -> Name -> Bool
equals (Name a) (Name b) =
    a == b


contains : String -> Name -> Bool
contains query (Name n) =
    String.contains query n 


encode : Name -> Encode.Value
encode (Name name) =
    Encode.string name


decode : Decoder Name
decode =
    Decode.string
        |> Decode.andThen (\raw ->
            case fromString raw of
                Err err ->
                    Decode.fail err

                Ok ok ->
                    Decode.succeed ok)


fromString : String -> Result String Name
fromString raw =
    if String.isEmpty (String.trim raw) then
        Err "food name must not be empty"
    
    else
        Ok (Name raw)


toString : Name -> String
toString (Name name) =
    name
