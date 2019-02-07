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
  
      const result = connector.query('SELECT * FROM candidate WHERE "candidateId"=($1)  AND "officeId"=($2)', [info.candidate, info.office,]);
  
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
  
      const result = connector.query('SELECT o."officeId" AS office, ca."candidateId" AS candidate, COUNT(v."accountId") AS result FROM office o, candidate ca, vote v WHERE o."officeId"=($1) AND ca."officeId"=($1) AND v."officeId"=($1) AND v."candidateId"=ca."candidateId" GROUP BY o."officeId", ca."candidateId"', [id,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return resultInfo;

  },

}
