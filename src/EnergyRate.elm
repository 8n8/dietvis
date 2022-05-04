module EnergyRate exposing
    ( EnergyRate
    , builtIns
    , decode
    , denominator
    , encode
    , energy
    , fromKcalPer100gString
    )

import Energy exposing (Energy)
import FoodMass exposing (FoodMass)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type EnergyRate
    = EnergyRate Energy FoodMass


energy : EnergyRate -> Energy
energy (EnergyRate e _) =
    e


denominator : EnergyRate -> FoodMass
denominator (EnergyRate _ m) =
    m


decode : Decoder EnergyRate
decode =
    Decode.map2 EnergyRate
        (Decode.field "energy" Energy.decode)
        (Decode.field "foodMass" FoodMass.decode)


encode : EnergyRate -> Encode.Value
encode (EnergyRate energy_ foodMass) =
    [ ( "energy", Energy.encode energy_ )
    , ( "foodMass", FoodMass.encode foodMass )
    ]
        |> Encode.object


fromKcalPer100gString : String -> Result String EnergyRate
fromKcalPer100gString raw =
    case Energy.fromKcalString raw of
        Err err ->
            Err err

        Ok energy_ ->
            Ok (EnergyRate energy_ FoodMass.hundredGrams)


builtIns : List EnergyRate
builtIns =
    List.map
        (\e -> EnergyRate e FoodMass.hundredGrams)
        Energy.builtIns
