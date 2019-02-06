/**
* @author Eneh, James Erozonachi
*
* @description Vote model
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
 
  create(newVote) {
    
    const createVote = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('INSERT INTO vote(office, candidate, createdBy, createdOn) values($1, $2, $3, $4)',
        [newVote.office, newVote.body, newVote.createdBy, 'CURRENT_DATE']);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });

    return createVote;

  },

}
