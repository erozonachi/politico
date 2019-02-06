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

      const result = connector.query('INSERT INTO vote(office_id, can_id, acct_id, createdOn) values($1, $2, $3, CURRENT_DATE)',
        [newVote.office, newVote.candidate, newVote.voter,]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });

    return createVote;

  },

  checkCandidate(info) {
    
    const candidateInfo = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT * FROM candidate WHERE can_id=($1)  AND office_id=($2)', [info.candidate, info.office,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return candidateInfo;

  },

}
