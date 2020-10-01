![Graphy Careers](https://graphy-static.ams3.cdn.digitaloceanspaces.com/careers-alt.png)

# Graphy React Coding Challenge
## The challenge

Tool that allows users to add annotations to arbitrary points on the screen with react.js

## Prerequisites
  - Node 12 for babel/webpack/jest compability 
  - npm/yarn

## Setup
#### Development environment

1. Clone this repo to your dev environment.
2. Run `yarn` (or `npm install`).
3. Run `yarn dev` (or `npm run dev`) to start the dev server.

#### Production environment

1. Clone this repo to your dev environment.
2. Run `yarn` (or `npm install`).
3. Run `yarn build` (or `npm run build`).
4. Run the server in the dist folder created (i.e http-server) `http-server .`
5. Open the url created in a browser i.e http://127.0.0.1:8080

#### Test

1. Clone this repo to your dev environment.
2. Run `yarn` (or `npm install`).
3. Run `yarn test` (or `npm run test`).

## Features

1. Add functionality that allows users to add annotations anywhere on the screen.
2. When an annotation is added, a marker is generated and shown on the screen.
3. Markers should be interactive. When you hover over a marker, the annotation should show up as a tooltip. Please implement your own version of tooltips (e.g. don't use an external library or the "title" attribute).
4. Add the ability to edit and delete annotations.
5. ***Bonus*** When hovering over a marker, the annotation tooltip will be shown. Make sure this tooltip never overflows the screen. In other words, make sure these tooltips are always visible on the screen and they don't get cropped.
6. ***Bonus*** Add support for multi-line annotations.
7. ***Bonus*** You'll notice that as you add more and more markers, many of the tooltips will start to overlap with other markers making it difficult to select those overlapped markers. Please implement a way to make this interaction more user friendly. *Hint: When interacting with large numbers of data points (or lines), [Voronoi diagrams](https://en.wikipedia.org/wiki/Voronoi_diagram) can be generated to help delimit invisible boundaries around a given point. Check out this multi-line chart [example](https://bl.ocks.org/mbostock/8033015) for a working example.*
8. Finally, write 1-2 paragraph on what on the project you would focus on next, if you had time.

## Architecture/technical choices
- The application is divided in containers and components. The container is annotations.js that is the big component that will content the other ones. The components are divided in annotation.js that corresponds to the note where the user can write, marker.js that is the marker that is displayed in the page, and tooltip.js. This way we can define each component style separately and they can be reused.
- Marker.js and tooltip.js both have the coordinates reference so they can always fit the screen so they do not overflow.
- All the components are functional with react hooks, the container allocations.js is OOP class react component type. I wanted to use them both as I don't know which style adjust better to the team one.
- Also the components sizes can be edited in the file constants.js so the design can be modified with no big effort.
- I would have added eslint if I would have more time and more testing.
- For future steps:
1. I would do the annotation component draggable so the user can allocate it anywhere in the case the user desire to hover over a markup behind the annotation component to read another annotation.
2. I would add a container with the list of last edited annotations.
3. I would add information about the creation date/last edited.
4. I would add font styling and also color palette to choose to the annotation component.

## Wireframe

This is a wireframe of several of the requirements mentioned above.

![Illustration](https://i.imgur.com/1k84vVF.png)

