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

const query = connector.query('CREATE TABLE party("partyId" SERIAL PRIMARY KEY, "name" VARCHAR(100) UNIQUE NOT NULL, "hqAddress" VARCHAR(150) NOT NULL, "logoUrl" VARCHAR(250) UNIQUE NOT NULL, "createdOn" DATE NOT NULL DEFAULT CURRENT_DATE, "updatedOn" DATE NULL, "deleted" BOOLEAN DEFAULT(false) NULL)');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
