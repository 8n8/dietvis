module FoodId exposing (FoodId, decode)


import Json.Decode as Decode exposing (Decoder)


type FoodId
    = FoodId Int


decode : Decoder FoodId
decode =
    Decode.int
        |> Decode.andThen (\raw ->
            if raw < 0 then
                Decode.fail "food IDs can't be negative"

            else 
                Decode.succeed (FoodId raw))
