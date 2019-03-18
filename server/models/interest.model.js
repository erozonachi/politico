/**
* @author Eneh, James Erozonachi
*
* @description Candidate model
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
 
  create(newInterest) {
    
    const createInterest = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('INSERT INTO interest("officeId", "partyId", "accountId", "createdOn") values($1, $2, $3, DEFAULT)',
        [newInterest.office, newInterest.party, newInterest.candidate]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });

    return createInterest;

  },

  checkUser(user) {
    
    const userInfo = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT * FROM interest WHERE "accountId"=($1)  AND "deleted"=false', [user,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return userInfo;

  },

  getInterests(id) {
    
    const candidates = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT i."interestId" AS "id", i."officeId" AS "office", i."partyId" AS "party", i."accountId" AS "user", o."name" AS "officeName", p."name" AS "partyName", a."firstName", a."lastName" FROM interest i, office o, party p, account a WHERE i."officeId"=($1) AND o."officeId"=i."officeId" AND p."partyId"=i."partyId" AND a."accountId"=i."accountId" AND i."deleted"=false ORDER BY o."name", p."name" ASC', [id,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return candidates;

  },

  deleteInterest(idGroup) {
    
    const candidates = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('UPDATE interest SET "deleted"=true, "updatedOn"=CURRENT_DATE WHERE "officeId"=($1) AND "partyId"=($2)', [idGroup.office, idGroup.party,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return candidates;

  },

}
