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

const query = connector.query('CREATE TABLE account(id SERIAL PRIMARY KEY, firstName VARCHAR(20) NOT NULL, lastName VARCHAR(20) NOT NULL, otheName VARCHAR(20) NULL, email VARCHAR(50) UNIQUE NOT NULL, phoneNumber VARCHAR(15) UNIQUE NOT NULL, password VARCHAR(128) NOT NULL, passportUrl VARCHAR(250) NOT NULL, isAdmin BOOLEAN DEFAULT(false) NULL, createdOn DATE NOT NULL DEFAULT CURRENT_DATE, updatedOn DATE NULL, deleted BOOLEAN DEFAULT(false) NULL)');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
