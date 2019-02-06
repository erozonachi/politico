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

const query = connector.query('CREATE TABLE candidate(can_id SERIAL PRIMARY KEY, office_id INT NOT NULL REFERENCES office, party_id INT NOT NULL REFERENCES party, acct_id INT NOT NULL REFERENCES account, createdOn DATE NOT NULL DEFAULT CURRENT_DATE, updatedOn DATE NULL, deleted BOOLEAN DEFAULT(false) NULL, UNIQUE(office_id, party_id))');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
