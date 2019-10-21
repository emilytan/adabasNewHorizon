# AdaNewHorizon

This project gives a user interface to managing data of Adabas Database.
It utilizes Adabas TCP feature via the help of adabas-tcp Node.js module to access any Adabas Database remotely.
On another vision, is to reduce the gap of a use from understanding how data are being consumed in Adabas, such as the CRUD access methods. This is done via a new querying method that are similar to SQL query and then converting it to Adabas calls.

# Installation

- Clone this project
- Go to cloned directory
- Run `npm install`

# Starting a development environment

The project comprises of 2 parts, frontend (Angular) and backend (NestJS). Both of this will need to be started to start the development environment.

To start a frontend (Angular):
`npm run start`

To start backend server (NestJS):
`ng serve backend`
