/**
* @author Eneh, James Erozonachi
*
* @description Petition model
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
 
  create(newPetition) {
    
    const createPetition = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.CONNECTION_STRING);
      connector.connect();

      const result = connector.query('INSERT INTO petition(office, body, createdBy, createdOn) values($1, $2, $3, $4)',
        [newPetition.office, newPetition.body, newPetition.createdBy, 'CURRENT_DATE']);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });

    });

    return createPetition;

  },

}