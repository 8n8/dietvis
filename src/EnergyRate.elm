module EnergyRate exposing
    ( EnergyRate
    , decode
    , encode
    , fromKcalPer100gString
    )

import Energy exposing (Energy)
import FoodMass exposing (FoodMass)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type EnergyRate
    = EnergyRate Energy FoodMass


decode : Decoder EnergyRate
decode =
    Decode.map2 EnergyRate
        (Decode.field "energy" Energy.decode)
        (Decode.field "foodMass" FoodMass.decode)


encode : EnergyRate -> Encode.Value
encode (EnergyRate energy foodMass) =
    [ ( "energy", Energy.encode energy )
    , ( "foodMass", FoodMass.encode foodMass )
    ]
        |> Encode.object


fromKcalPer100gString : String -> Result String EnergyRate
fromKcalPer100gString raw =
    case Energy.fromKcalString raw of
        Err err ->
            Err err

        Ok energy ->
            Ok (EnergyRate energy FoodMass.hundredGrams)
