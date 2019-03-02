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

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('INSERT INTO candidate("officeId", "partyId", "accountId", "createdOn") values($1, $2, $3, DEFAULT)',
        [newCandidate.office, newCandidate.party, newCandidate.candidate]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });

    return createCandidate;

  },

  checkUser(user) {
    
    const userInfo = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT * FROM candidate WHERE "accountId"=($1)  AND "deleted"=false', [user,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return userInfo;

  },

  getCandidates(id) {
    
    const candidates = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT i."candidateId" AS "id", i."officeId" AS "office", i."partyId" AS "party", i."accountId" AS "user", p."logoUrl", p."name" AS "partyName", a."firstName", a."lastName" FROM candidate i, party p, account a WHERE i."officeId"=($1) AND p."partyId"=i."partyId" AND a."accountId"=i."accountId" AND i."deleted"=false ORDER BY p."name" ASC', [id,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return candidates;

  },

}
