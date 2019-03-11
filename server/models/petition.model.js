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

      const result = connector.query('INSERT INTO petition("officeId", "body", "accountId", "evidences", "createdOn") values($1, $2, $3, $4, CURRENT_DATE) RETURNING "petitionId", "createdOn"',
        [newPetition.office, newPetition.text.trim(), newPetition.createdBy, JSON.stringify(newPetition.evidence),]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });

    return createPetition;

  },

}
