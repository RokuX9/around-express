# Around the U.S. BackEnd

## Description

Backend project with mongodb, connecting express app to mongodb server and modify it's content.
validation is used with regex to verify that a url is inserted in some fields.

### As of now its possible to:

- get all users from the db
- look for a user by id
- create a user
- update profile info
- update profile picture
- get all cards from the db
- create a card
- delete a card
- add like to a card
- delete like from a card

## Technologies

Javascript, express, mongodb, mongoose

## Directories

`/controllers` - mongodb model queries/route handler files.

`/models` - schema and model files.

`/routes` - routing files.

`/utils` - misc. files.

## Running the Project

`npm run start` — to launch the server.

`npm run dev` — to launch the server with the hot reload feature.
