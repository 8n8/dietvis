module Foods exposing
    ( Foods
    , builtIns
    , decode
    , empty
    , encode
    , insert
    , search
    )

import EnergyRate exposing (EnergyRate)
import Food exposing (Food)
import FoodDescription exposing (FoodDescription)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Set


type Foods
    = Foods (List Food)


search : String -> Foods -> List Food
search searchString (Foods foods) =
    List.filter (Food.search searchString) foods
        |> List.sortBy
            (Food.description
                >> FoodDescription.toString
                >> String.toLower)


insert : Food -> Foods -> Foods
insert food (Foods foods) =
    let
        descriptions =
            foods
            |> List.map Food.description
            |> List.map FoodDescription.toString
            |> Set.fromList

        description =
            food |> Food.description |> FoodDescription.toString
    in
    if Set.member description descriptions then
        Foods foods

    else
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


builtIns : Foods
builtIns =
    List.map2
        Food.make
        FoodDescription.builtIns
        EnergyRate.builtIns
        |> Foods
