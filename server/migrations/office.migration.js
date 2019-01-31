/**
* @author Eneh, James Erozonachi
*
* @description Spins up database tables
*
* */
'use strict';

import pg from 'pg';
import * as Constants from '../helpers/Constants';

const connector = new pg.Client('postgres://postgres:root@localhost:5432/politicodb');
connector.connect();

const query = connector.query('CREATE TABLE office(id SERIAL PRIMARY KEY, type VARCHAR(25) NOT NULL, name VARCHAR(100) NOT NULL, createdOn DATE NOT NULL DEFAULT CURRENT_DATE, updatedOn DATE NULL, deleted BOOLEAN DEFAULT(false) NULL)');

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
