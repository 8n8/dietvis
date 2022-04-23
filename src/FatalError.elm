module FatalError exposing (FatalError, fromString)


type FatalError
    = FatalError String


fromString : String -> FatalError
fromString err =
    FatalError err
