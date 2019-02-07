/**
* @author Eneh, James Erozonachi
*
* @description Spins up database tables
*
* */
'use strict';

import pg from 'pg';
import * as Constants from '../helpers/Constants';

const connector = new pg.Pool(Constants.CONNECTION_STRING);

const password = `$2b$10$wwWbO72NdAo2ywE5a7CJReHcufhi4vC/n4N./GiJqRkkcveFkNipG`;
const url = `https://cloudinary.com/admin.jpeg`;

const query = connector.query('INSERT INTO account("firstName", "lastName", "otheName", "email", "phoneNumber", "password", "passportUrl", "isAdmin", "createdOn") values($1, $2, NULL, $3, $4, $5, $6, TRUE, CURRENT_DATE)', ['James', 'Eneh', 'admin@gmail.com', '2349063912145', password, url,]);

query.then(() => {
  connector.end();
}, err => {
  console.log(err);
})
.catch(error => {
  // Remain silent because entry table already exist
});
