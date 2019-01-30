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

const query = connector.query('CREATE TABLE party(id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, hqAddress VARCHAR(150) NOT NULL, logoUrl VARCHAR(250) NOT NULL, createdOn DATE NOT NULL DEFAULT CURRENT_DATE, updatedOn DATE NULL, deleted BOOLEAN DEFAULT(false) NULL)');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
