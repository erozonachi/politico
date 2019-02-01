/**
* @author Eneh, James Erozonachi
*
* @description Candidate model
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
 
  create(newCandidate) {
    
    const createCandidate = new Promise((resolve, reject) => {

      const connector = new pg.Client(Constants.CONNECTION_STRING);
      connector.connect();

      const result = connector.query('INSERT INTO candidate(office, party, createdBy, createdOn) values($1, $2, $3, $4)',
        [newCandidate.office, newCandidate.party, newCandidate.createdBy, 'CURRENT_DATE']);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });

    });

    return createCandidate;

  },

}
