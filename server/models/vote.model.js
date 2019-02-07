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

      const result = connector.query('INSERT INTO vote("officeId", "candidateId", "accountId", "createdOn") values($1, $2, $3, CURRENT_DATE)',
        [newVote.office, newVote.body, newVote.createdBy,]);

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

  getOfficeVoteResult(id) {
    
    const resultInfo = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT o.office_id AS office, ca.can_id AS candidate, COUNT(v.acct_id) AS result FROM office o, candidate ca, vote v WHERE o.office_id=($1) AND ca.office_id=($1) AND v.office_id=($1) AND v.can_id=ca.can_id GROUP BY o.office_id, ca.can_id', [id,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return resultInfo;

  },

}
