module ReviewConfig exposing (config)

{-| Do not rename the ReviewConfig module or the config function, because
`elm-review` will look for these.

To add packages that contain rules, add them to this review project using

    `elm install author/packagename`

when inside the directory containing this file.

-}

import Review.Rule exposing (Rule)
import NoBooleanCase
import NoDebug.Log
import NoDuplicatePorts
import NoUnusedPorts
import NoDeprecated
import NoExposingEverything
import NoImportingEverything
import NoMissingTypeAnnotation
import NoPrematureLetComputation
import NoUnused.CustomTypeConstructors
import NoUnused.Dependencies
import NoUnused.Exports
import NoUnused.Modules
import NoUnused.Parameters
import NoUnused.Patterns
import NoUnused.Variables


config : List Rule
config =
    [ NoBooleanCase.rule
    , NoDebug.Log.rule
    , NoDuplicatePorts.rule
    , NoUnusedPorts.rule
    , NoExposingEverything.rule
    , NoDeprecated.rule NoDeprecated.defaults
    , NoImportingEverything.rule []
    , NoMissingTypeAnnotation.rule
    , NoPrematureLetComputation.rule
    , NoUnused.CustomTypeConstructors.rule []
    , NoUnused.Dependencies.rule
    , NoUnused.Exports.rule
    , NoUnused.Modules.rule
    , NoUnused.Parameters.rule
    , NoUnused.Patterns.rule
    , NoUnused.Variables.rule
    ]
