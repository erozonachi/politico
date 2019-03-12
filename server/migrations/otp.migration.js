/**
* @author Eneh, James Erozonachi
*
* @description Spins up database tables
*
* */
'use strict';

import pg from 'pg';
import * as Constants from '../helpers/Constants';

const connector = new pg.Client(Constants.CONNECTION_STRING);
connector.connect();

const query = connector.query('CREATE TABLE IF NOT EXISTS otp("pass" VARCHAR(10) NOT NULL PRIMARY KEY, "email" VARCHAR(50) NOT NULL REFERENCES account(email) ON DELETE CASCADE, "createdOn" DATE NOT NULL DEFAULT CURRENT_DATE, "used" BOOLEAN DEFAULT(false) NULL, UNIQUE("email", "createdOn", "used"))');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
