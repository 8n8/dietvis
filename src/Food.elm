module Food exposing (Food, encode, decode, name, new, energyPerMass)


import EnergyPerMass exposing (EnergyPerMass)
import Name exposing (Name)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type Food =
    Food
        { energyPerMass : EnergyPerMass
        , name : Name
        }


energyPerMass : Food -> EnergyPerMass
energyPerMass (Food food) =
    food.energyPerMass


new : EnergyPerMass -> Name -> Food
new energyPerMass_ name_ =
    Food
        { energyPerMass = energyPerMass_
        , name = name_
        }


decode : Decoder Food
decode =
    Decode.map2 (\e n -> Food { energyPerMass = e, name = n })
        (Decode.field "energyPerMass" EnergyPerMass.decode)
        (Decode.field "name" Name.decode)


encode : Food -> Encode.Value
encode (Food food) =
    Encode.object
        [ ( "energyPerMass", EnergyPerMass.encode food.energyPerMass )
        , ( "name", Name.encode food.name )
        ]


name : Food -> Name
name (Food food) =
    food.name
