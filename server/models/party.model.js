/**
* @author Eneh, James Erozonachi
*
* @description Party model
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
 
  create(newParty) {
    
    const createParty = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.connectionString);
      connector.connect();

      const result = connector.query('INSERT INTO party(name, hqAddress, logoUrl, createdOn) values($1, $2, $3, DEFAULT) RETURNING id, name',
        [newParty.name, newParty.hqAddress, newParty.logoUrl]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });

    });

    return createParty;

  },

  update(partyInfo) {

    const updateParty = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.connectionString);
      connector.connect();

      const result = connector.query('UPDATE party SET name=($1), updatedOn=($2) WHERE id=($3) AND deleted=false',
        [partyInfo.name, 'CURRENT_DATE', partyInfo.id]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });

    });
  
    return updateParty;

  },

  read() {
    
    const readParty = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.connectionString);
      connector.connect();
  
      const result = connector.query('SELECT id, name, hqAddress, logoUrl, createdOn, updatedOn FROM party WHERE deleted=false ORDER BY name ASC');
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
  
    });
    
    return readParty;

  },

  readById(id) {
    
    const readParty = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.connectionString);
      connector.connect();
  
      const result = connector.query('SELECT id, name, hqAddress, logoUrl, createdOn, updatedOn FROM party WHERE id=($1) AND deleted=false ORDER BY name ASC', [id]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
  
    });
    
    return readParty;

  },

  delete(id) {
    
    const deleteParty = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.connectionString);
      connector.connect();
  
      const result = connector.query('UPDATE party SET deleted=true WHERE id=($1)', [id]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
  
    });
    
    return deleteParty;

  },

}
