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

      const connector = new pg.Client(Constants.CONNECTION_STRING);
      connector.connect();

      const result = connector.query('INSERT INTO party(name, hqAddress, logoUrl, createdOn) values($1, $2, $3, DEFAULT) RETURNING id, name',
        [String(newParty.name).trim().toLowerCase(), String(newParty.hqAddress).trim(), String(newParty.logoUrl).trim()]);

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

      const connector = new pg.Client(Constants.CONNECTION_STRING);
      connector.connect();

      const result = connector.query('UPDATE party SET name=($1), updatedOn=CURRENT_DATE WHERE id=($2) AND deleted=false RETURNING id, name',
        [String(partyInfo.name).trim().toLowerCase(), partyInfo.id]);

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

      const connector = new pg.Client(Constants.CONNECTION_STRING);
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

      const connector = new pg.Client(Constants.CONNECTION_STRING);
      connector.connect();
  
      const result = connector.query('SELECT id, name, hqAddress, logoUrl, createdOn, updatedOn FROM party WHERE id=($1) AND deleted=false', [id]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
  
    });
    
    return readParty;

  },

  search(name, url) {
    
    const search = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.CONNECTION_STRING);
      connector.connect();
  
      const result = connector.query('SELECT * FROM party WHERE (name=($1) OR logoUrl=($2)) AND deleted=false', [String(name).trim().toLowerCase(), String(url).trim()]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
  
    });
    
    return search;

  },

  delete(id) {
    
    const deleteParty = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.CONNECTION_STRING);
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
