# Author: Aston Wiggin

# React Weather App
Technologies used:
  TypeScript,
  React,
  React router,
  Bootstrap,
  HTML,
  CSS,
  Vite

# Project Structure

The code for the project exists in the ./weather-app folder, which contains the following structure:

`./src` contains the builk of the code

 L `./assets` has folders to store images and styles, so any PNG and CSS files will be here

 L `./components` has the components

   L `./Common` has components that are used multiple times, or that could conceivable be used multiple times in a more complex application

   L `./Navbar` has components used in the Navbar

 L `./utility` as typescript files that are used to keep hooks, common functions, and common variables
 
   L `./hooks` keep all of the hooks (useWeatherData)

# How to run

## The production build:

1. Navigate to the dist folder in command prompt
2. Host a local server using `py -m http.server` or the equivalent for your machine (assuming python is installed)
3. Using the port number given by the command, go to the URL `localhost:{port}` in your browser

## The test build:

1. Open the base directory of the app in command prompt
2. Run `npm run dev` (assuming npm is installed)
3. Using the URL given by the command, open that URL in your browser
