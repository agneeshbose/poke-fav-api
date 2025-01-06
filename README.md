# Introduction

This is the backend api for poke-fav application having features to view a list of pokeman species, preview their attributes and mark those you like as favourites.

# Approach

The API will act as a proxy to handle all the read operations regarding pokemon species and integrates with `https://pokeapi.co/` to fetch required data. They are not stored locally. But natively handles favourites management, exposing endpoints for GET, POST and DELETE operations.

## Technical details

**Server**: An Express server is used to handle backend requests, with middleware functions for request handling and error management.
**Store**: The API has two versions, where in the first, a json file locally stored on the disk will be storing the favourites. The file will be updated based oneach user interaction. In the second version, the app can be connected to a mongodb instance to store and manage favourites. Mongoose driver is used to establish connection and manage data models.
**External API integration**: Axios is used to manage HTTP requests to external APIs to handle communication with third-party services.

## How to run the app

1.  Clone the repository to your local machine
2.  Install the dependencies using `npm install`
3.  Add `POKE_API_URL` in a `.env.development` file in the project root
4.  Add`MONGO_DB_URI` in the `.env.development` file to point to a running mongo db instance.
5.  Run `npm run dev` to start the app locally.
