# How to get going khanom NC

To start developing you can enter:

## Development

`yarn dev`

next dev starts the application in development mode with hot-code reloading, error reporting, and more:

The application will start at http://localhost:3000 by default. The default port can be changed with -p, like so:

`yarn next dev -p 4000`

## Build

`next build`

next build creates an optimized production build of your application. The output displays information about each route.

– `Size`: The number of assets downloaded when navigating to the page client-side. The size for each route only includes its dependencies.

– `First Load JS`: The number of assets downloaded when visiting the page from the server. The amount of JS shared by all is shown as a separate metric.

The first load is colored green, yellow, or red. Aim for green for performant applications.



## Production

`yarn start`

next start starts the application in production mode. The application should be compiled with next build first.

The application will start at http://localhost:3000 by default. The default port can be changed with -p, like so:

`yarn next start -p 4000`

