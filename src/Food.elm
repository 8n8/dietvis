module Food exposing
    ( Food
    , decode
    , description
    , encode
    , energyRate
    , make
    , search
    )

import EnergyRate exposing (EnergyRate)
import FoodDescription exposing (FoodDescription)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Food
    = Food
        { description : FoodDescription
        , energyRate : EnergyRate
        }


description : Food -> FoodDescription
description (Food food) =
    food.description


energyRate : Food -> EnergyRate
energyRate (Food food) =
    food.energyRate


search : String -> Food -> Bool
search searchString (Food food) =
    String.contains
        (String.toLower searchString)
        (food.description
            |> FoodDescription.toString
            |> String.toLower
        )


make : FoodDescription -> EnergyRate -> Food
make description_ energyRate_ =
    Food { description = description_, energyRate = energyRate_ }


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
