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

      const connector = new pg.Client(Constants.CONNECTION_STRING);
      connector.connect();

      const result = connector.query('INSERT INTO account(firstName, lastName, otheName, email, phoneNumber, password, passportUrl, createdOn) values($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE) RETURNING *',
        [String(newUser.firstName).trim(), String(newUser.lastName).trim(), String(newUser.otherName).trim(), String(newUser.email).trim().toLowerCase(), String(newUser.phoneNumber).trim(), newUser.password, newUser.passportUrl.trim()]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });

    });

    return createUser;

  },

  search(data) {
    
    const search = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.CONNECTION_STRING);
      connector.connect();
  
      const result = connector.query('SELECT * FROM account WHERE (email=($1) OR phoneNumber=($2) OR passportUrl=($3)) AND deleted=false', [data.email.trim().toLowerCase(), data.phoneNumber.trim(), data.passportUrl.trim()]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
  
    });
    
    return search;

  },

  fetchByUsername(username) {
    
    const info = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.CONNECTION_STRING);
      connector.connect();
  
      const result = connector.query('SELECT * FROM account WHERE email=($1) OR phoneNumber=($1)', [username.toLowerCase()]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
  
    });
    
    return info;

  },

}
