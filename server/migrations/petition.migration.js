/**
* @author Eneh, James Erozonachi
*
* @description Spins up database tables
*
* */

import pg from 'pg';
import * as Constants from '../helpers/Constants';

const connector = new pg.Client(Constants.connectionString);
connector.connect();

const query = connector.query('CREATE TABLE petition(id SERIAL PRIMARY KEY, createdBy INT NOT NULL, office INT NOT NULL, body VARCHAR(1000) NOT NULL, createdOn DATE NOT NULL DEFAULT CURRENT_DATE, updatedOn DATE NULL, deleted BOOLEAN DEFAULT(false) NULL)');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
