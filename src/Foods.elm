module Foods exposing (Foods, decode, empty, encode, insert)

import EnergyRate exposing (EnergyRate)
import Food exposing (Food)
import FoodDescription exposing (FoodDescription)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Foods
    = Foods (List Food)


insert : Food -> Foods -> Foods
insert food (Foods foods) =
    Foods (food :: foods)


decode : Decoder Foods
decode =
    Decode.map Foods (Decode.list Food.decode)


encode : Foods -> Encode.Value
encode (Foods foods) =
    Encode.list Food.encode foods


empty : Foods
empty =
    Foods []
