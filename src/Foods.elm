module Foods exposing (Foods, decode, empty)


import Json.Decode as Decode exposing (Decoder)
import EnergyRate exposing (EnergyRate)
import FoodDescription exposing (FoodDescription)


type Foods
    = Foods (List Food)


type alias Food =
    { description : FoodDescription
    , energyRate : EnergyRate
    }


decode : Decoder Foods
decode =
    Decode.map Foods (Decode.list decodeFood)


decodeFood : Decoder Food
decodeFood =
    Decode.map2 Food
        (Decode.field "description" FoodDescription.decode)
        (Decode.field "energyRate" EnergyRate.decode)
    

empty : Foods
empty =
    Foods []
