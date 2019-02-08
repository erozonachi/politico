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

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('INSERT INTO petition("officeId", "body", "accountId", "evidence", "createdOn") values($1, $2, $3, CURRENT_DATE)',
        [newPetition.office, newPetition.body, newPetition.createdBy,]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });

    return createPetition;

  },

}
