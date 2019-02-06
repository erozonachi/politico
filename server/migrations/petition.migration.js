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

const query = connector.query('CREATE TABLE petition("petitionId" SERIAL PRIMARY KEY, "accountId" INT NOT NULL REFERENCES account, "officeId" INT NOT NULL REFERENCES office, "body" TEXT NOT NULL, "evidences" TEXT NULL, "createdOn" DATE NOT NULL DEFAULT CURRENT_DATE, "updatedOn" DATE NULL, "deleted" BOOLEAN DEFAULT(false) NULL, UNIQUE("accountId", "officeId"))');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
