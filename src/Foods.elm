module Foods exposing (Foods, decode)


import FoodEnergyRate exposing (FoodEnergyRate)
import Dict exposing (Dict)
import Json.Decode as Decode exposing (Decoder)


type Foods
    = Foods (Dict String FoodEnergyRate)



decode : Decoder Foods
decode =
    Decode.map Foods (Decode.dict FoodEnergyRate.decode)
