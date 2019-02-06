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

const query = connector.query('CREATE TABLE vote(vote_id SERIAL PRIMARY KEY, acct_id INT NOT NULL REFERENCES account, office_id INT NOT NULL REFERENCES office, can_id INT NOT NULL REFERENCES candidate, createdOn DATE NOT NULL DEFAULT CURRENT_DATE, deleted BOOLEAN DEFAULT(false) NULL, UNIQUE(acct_id, office_id))');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
