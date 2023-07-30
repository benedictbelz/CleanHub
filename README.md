# Technical project task for CleanHub

## Description

This is a technical project task for CleanHub. The briefing was to show a number of collection hubs to showcase the work they do. The customers should be able to read their stories and decide which hub they would like to support.

## Requirements

- The solution must be using React
- Fetch all collection hubs from https://marketplace-demo.cleanhub.com/api/public/hubs
- The API accepts requests from http://localhost:3000/
- List all the collection hubs on a page
- Display a progress for each - the amount of total recovered plastic vs unassigned plastic
- It should link to a details page
- Display whether they are part of a portfolio or not
- Implement a filtering with at least three different types of filters

## Technologies

- NodeJS
- ReactJS
- TypeScript
- Webpack
- Axios
- LoDash

## Installation

1. Make sure you have installed a version of node greater than `14.15.0`, if you have not, install it from their [website](https://nodejs.org/en/download).
2. Clone the repository and install all packages via `yarn`.
3. Execute the application via `yarn start`, now it should run on `http://localhost:3000/`.

## Building

1. Create the distribution via `yarn build`
2. The build should be packed in `/dist` folder, where you can provide it on your server.
