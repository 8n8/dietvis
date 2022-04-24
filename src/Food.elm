module Food exposing (Food, encode, decode, energyRate, make)


import EnergyRate exposing (EnergyRate)
import FoodDescription exposing (FoodDescription)
import Json.Encode as Encode
import Json.Decode as Decode exposing (Decoder)

type Food
    = Food
        { description : FoodDescription
        , energyRate : EnergyRate
        }


make : FoodDescription -> EnergyRate -> Food
make description energyRate_ =
    Food { description = description , energyRate = energyRate_ }


energyRate : Food -> EnergyRate
energyRate (Food food) =
    food.energyRate


encode : Food -> Encode.Value
encode (Food food) =
    [ ( "description", FoodDescription.encode food.description )
    , ( "energyRate", EnergyRate.encode food.energyRate )
    ]
    |> Encode.object


decode : Decoder Food
decode =
    Decode.map2 make
        (Decode.field "description" FoodDescription.decode)
        (Decode.field "energyRate" EnergyRate.decode)
