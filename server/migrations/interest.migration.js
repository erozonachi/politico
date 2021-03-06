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

const query = connector.query('CREATE TABLE interest("interestId" SERIAL PRIMARY KEY, "officeId" INT NOT NULL REFERENCES office, "partyId" INT NOT NULL REFERENCES party ON DELETE CASCADE, "accountId" INT NOT NULL REFERENCES account, "createdOn" DATE NOT NULL DEFAULT CURRENT_DATE, "updatedOn" DATE NULL, "deleted" BOOLEAN DEFAULT(false) NULL, UNIQUE("officeId", "partyId", "accountId"))');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
