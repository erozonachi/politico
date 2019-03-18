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

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('INSERT INTO party("name", "hqAddress", "logoUrl", "createdOn") values($1, $2, $3, DEFAULT) RETURNING "partyId", "name"',
        [String(newParty.name).trim().toLowerCase(), String(newParty.hqAddress).trim(), String(newParty.logoUrl).trim()]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });

    return createParty;

  },

  update(partyInfo) {

    const updateParty = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('UPDATE party SET "name"=($1), "updatedOn"=CURRENT_DATE WHERE "partyId"=($2) AND "deleted"=false RETURNING "partyId", "name"',
        [String(partyInfo.name).trim().toLowerCase(), partyInfo.id]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });
  
    return updateParty;

  },

  read() {
    
    const readParty = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT "partyId", "name", "hqAddress", "logoUrl", "createdOn", "updatedOn" FROM party WHERE "deleted"=false ORDER BY "name" ASC');
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return readParty;

  },

  readById(id) {
    
    const readParty = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT "partyId", "name", "hqAddress", "logoUrl", "createdOn", "updatedOn" FROM party WHERE "partyId"=($1) AND "deleted"=false', [id]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return readParty;

  },

  delete(id) {
    
    const deleteParty = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('DELETE FROM party WHERE "partyId"=($1)', [id]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return deleteParty;

  },

}
