/**
* @author Eneh, James Erozonachi
*
* @description Office model
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
 
  create(newOffice) {
    
    const createOffice = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.connectionString);
      connector.connect();

      const result = connector.query('INSERT INTO office(type, name, createdOn) values($1, $2, $3)',
        [newOffice.type, newOffice.name, 'CURRENT_DATE']);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });

    });

    return createOffice;

  },

}
