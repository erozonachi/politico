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

const query = connector.query("SET timezone = 'Africa/Lagos';");

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
