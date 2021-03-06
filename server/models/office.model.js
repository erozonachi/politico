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

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('INSERT INTO office("type", "name", "createdOn") values($1, $2, DEFAULT) RETURNING "officeId", "type", "name", "createdOn"',
        [newOffice.type.trim().toLowerCase(), newOffice.name.trim().toLowerCase()]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });
    
    return createOffice;

  },

  read() {
    
    const readOffice = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT "officeId", "type", "name", "createdOn" FROM office WHERE "deleted"=false ORDER BY "type", "name" ASC');
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return readOffice;

  },

  readById(id) {
    
    const readOffice = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT "officeId", "type", "name", "createdOn" FROM office WHERE "officeId"=($1) AND "deleted"=false', [id]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return readOffice;

  },

}
