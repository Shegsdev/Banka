[![Build Status](https://travis-ci.com/Shegsdev/Banka.svg?branch=ft-signin-endpoint-164982322)](https://travis-ci.com/Shegsdev/Banka) [![Coverage Status](https://coveralls.io/repos/github/Shegsdev/Banka/badge.svg?branch=develop)](https://coveralls.io/github/Shegsdev/Banka?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/7375c2bea8fcd4984968/maintainability)](https://codeclimate.com/github/Shegsdev/Banka/maintainability)

# Banka

Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money.
___

**Features**
01. User signup.
02. User signin.
03. User can create a bank account.
04. User can view account details.
05. User can view account transaction history.
06. User can view a specific account transaction.
07. Admin can view a specific user account.
08. Admin/Staff can view all bank accounts.
09. Admin/Staff can view a specific bank account.
10. Admin/Staff can activate or deactivate a bank account.
11. Admin/Staff can view all active bank accounts.
12. Admin/Staff can view all dormant bank accounts.
13. Staff can credit an account.
14. Staff can debit an account.
15. Admin/Staff can delete a bank account.

___

## Templates
UI Templates for this application can be accessed via this [link](https://shegsdev.github.io/Banka)

___

## Technologies Used
* [Node.js](https://nodejs.org/en/) - A runtime environment based off of Chromes's V8 Engine for writing Javascript server-side applications.
* [Express.js](https://expressjs.com/) - Web application framework based on Node.js.
* [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
* [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.
* [PostgreSQL](https://www.postgresql.org) - Relational Database Management System.
* [Swagger](https://swagger.io/) - Document your code and keep a live and reusable OpenAPI (Swagger) specification.

___


## Testing Tools
* [Mocha](https://mochajs.org/) - A JavaScript test framework.
* [Chai](https://www.chaijs.com/) - A test assertion library for JavaScript.
* [Supertest](https://www.npmjs.com/package/supertest) - A module that provides high-level abstraction for HTTP testing.

___

## API Information
- The API for this application is documented using [Swagger](https://surebanka.herokuapp.com/api/docs)
- The API endpoints are hosted on Heroku - [Banka](https://surebanka.herokuapp.com/api/v1)

|METHOD  |DESCRIPTION                             |ENDPOINT                                            |
|------- |----------------------------------------|----------------------------------------------------|
|POST    |Sign Up                                 |api/v1/auth/signup                                  |
|POST    |Sign In                                 |api/v1/auth/signin                                  |
|GET     |Get a specific user account             |api/v1/users/:id                                    |
|POST    |Create a bank account                   |api/v1/accounts                                     |
|GET     |Get all bank accounts                   |api/v1/accounts                                     |
|GET     |Get a specific bank account             |api/v1/accounts/:acccountNumber                     |
|GET     |Get an account's transaction history    |api/v1/accounts/:accountNumber/transactions         |
|GET     |Get a specific account's transaction    |api/v1/transactions/:transactionId                  |
|GET     |Get all accounts owned by specific user |api/v1/user/:userEmail/accounts                     |
|GET     |Get a list of all active bank accounts  |api/v1/accounts?status=active                       |
|GET     |Get a list of all dormant bank accounts |api/v1/accounts?status=dormant                      |
|PATCH   |Activate or Deactivate a bank account   |api/v1/accounts/:acccountNumber                     |
|POST    |Credit a bank account                   |api/v1/transactions/:acccountNumber/credit          |
|POST    |Debit a bank account                    |api/v1/transactions/:acccountNumber/debit           |
|DELETE  |Delete a bank account                   |api/v1/accounts/:acccountNumber                     |




|DESCRIPTION                        |REQUIRED FIELDS                                                   |                 
|-----------------------------------|------------------------------------------------------------------|
|Sign Up                            |firstName, lastName, email, password                              |
|Sign In                            |email, password                                                   |
|Create bank account                |firstName, lastName, email, type, password                        |
|Credit account                     |cashier, amount                                                   |
|Debit                              |cashier, amount                                                   |
|Activate/deactivate                |status

___
## The Endpoints can be accessed remotely or locally.

#### Database setup
Before getting started, make sure to configure the database as follows:
1. Download and install PostgreSQL using this [link](https://www.postgresql.org).
2. In the project's root directory, create a `.env` file and add the following variables:
   `SECRET=your_secret_key_here`
   `DB_URL=postgresql://username:password@host:port/database`
   where `your_secret_key_here` refers to a custom secret key for the application (you can choose a secured key).
   `username` - username of the currently logged in user on your local machine.
   `password` - password of the currently logged in user on your local machine.
   `host` - database hostname, default is `127.0.0.1`.
   `port` - database port, default is `5432`.
3. After successfully configuring the database, run the following commands to create the database:
   `$ psql CREATE DATABASE banka`
   `$ npm run migration:create`

   Optionally, you can seed the database by running:
   `$ npm run migration:seed`

   To drop the tables, run:
   `$ npm run migration:drop`

#### Accessing the endpoints remotely via POSTMAN
You will need to have [POSTMAN](https://www.getpostman.com/downloads/) app installed on your computer.

##### Example 
###### Sign In
1. Launch POSTMAN
2. Click the dropdown menu to the left of the URL bar and select POST as a method.
3. To access the Sign In endpoint, at the end of Banka's URL attach the sign in endpoint to it as seen in step 4
4. https://surebanka.herokuapp.com/api/v1/auth/signin 
5. Then paste the full URL in the URL bar.
6. Click 'Body' tab below the URL, then select x-www-form-urlencoded radio button.
7. Fill in the required fields correctly.
8. Click the blue Send button to the right of the URL bar.
9. And wait for a response.


#### Accessing the endpoints locally via POSTMAN

1. On the terminal of your computer, navigate into the cloned repo's folder
2. Make sure you have Node installed. If not click [npm](https://www.npmjs.com/get-npm) and [Node.js](https://nodejs.org/en/) to download npm and node.
3. Clone the repo `https://github.com/Shegsdev/Banka.git` on your local machine.
4. Run `$ npm install` to install all dependencies.
5. Configure database (See `Database setup` above).
5. Run `$ npm run dev` to power up the server.
6. The procedure for using POSTMAN here is the same as when accessing the endpoint remotely except that you make use of http://localhost:5000 as the full URL's prefix in place of the app's URL on heroku
e.g To access Sign In endpoint you will have a full URL like http://localhost:5000/api/v1/auth/signin

#### Test
You can locally run the test by running
`npm run dev` and in separate terminal window,
 run `npm test`.

___

## Author
### Segun Akanbi
You can follow me on [Twitter](http://twitter.com/shegsdev)


