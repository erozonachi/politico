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

      const result = connector.query('INSERT INTO office(type, name, createdOn) values($1, $2, DEFAULT) RETURNING office_id, type, name, createdOn',
        [newOffice.type.trim().toLowerCase(), newOffice.name.trim().toLowerCase()]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => console.error('Error executing query', err.stack));

    });

    return createOffice;

  },

  search(data) {
    
    const search = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT * FROM office WHERE type=($1) AND name=($2) AND deleted=false', [data.type.trim().toLowerCase(), data.name.trim().toLowerCase()]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => console.error('Error executing query', err.stack));
  
    });
    
    return search;

  },

  read() {
    
    const readOffice = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT office_id, type, name, createdOn FROM office WHERE deleted=false ORDER BY type, name ASC');
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => console.error('Error executing query', err.stack));
  
    });
    
    return readOffice;

  },

  readById(id) {
    
    const readOffice = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT office_id, type, name, createdOn FROM office WHERE office_id=($1) AND deleted=false', [id]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => console.error('Error executing query', err.stack));
  
    });
    
    return readOffice;

  },

}
