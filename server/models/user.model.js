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

      const result = connector.query('INSERT INTO account(firstName, lastName, otherName, email, phoneNumber, password, passportUrl, isAdmin, createdOn) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [newUser.firstName, newUser.lastName, newUser.otherName, newUser.email, newUser.phoneNumber, newUser.password, newUser.passportUrl, newUser.isAdmin, 'CURRENT_DATE']);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });

    });

    return createUser;

  },

}
