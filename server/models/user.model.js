/**
* @author Eneh, James Erozonachi
*
* @description User model
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {

  create(newUser) {
    
    const createUser = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('INSERT INTO account("firstName", "lastName", "otheName", "email", "phoneNumber", "password", "passportUrl", "createdOn") values($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE) RETURNING *',
        [String(newUser.firstName).trim(), String(newUser.lastName).trim(), String(newUser.otherName).trim(), String(newUser.email).trim().toLowerCase(), String(newUser.phoneNumber).trim(), newUser.password, newUser.passportUrl.trim()]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });

    return createUser;

  },

  fetchByUsername(username) {
    
    const info = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT * FROM account WHERE "email"=($1)', [username.toLowerCase()]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return info;

  },

  updateToAdmin(id) {

    const makeAdmin = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('UPDATE account SET "isAdmin"=TRUE WHERE "accountId"=($1)',
        [id.trim(),]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });
  
    return makeAdmin;

  },

  updatePassword(info) {

    const resetPassword = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('UPDATE account SET "password"=($1) WHERE "email"=($2) RETURNING "accountId", "email"',
        [info.password, info.email.trim(),]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });
  
    return resetPassword;

  },

}
