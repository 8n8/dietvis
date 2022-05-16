# Diet

Diet is a web app for tracking a calorie-counting diet. It makes it easy to enter meals and record body weight and waist size. It displays charts of the data.

There is no backend. All the data is kept in the browser in localstorage.

It is written in Elm.

## Build instructions

- install Git and Elm
- clone this repository
- in the root of the repository, run `elm make src/Main.elm --output=dist/elm.js --optimize`, and then deploy the `dist` directory as a static web app
