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

  getPetitions() {
    
    const resultInfo = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT pe."petitionId" AS "id", pe."body" AS "text", pe."evidences" AS "evidence", pe."accountId" AS "createdBy", o."officeId" AS "office", o."name" AS "officeName", ca."candidateId" AS "candidate", a."lastName", a."firstName", p."name" AS "partyName", p."logoUrl" FROM petition pe, office o, candidate ca, account a, party p WHERE o."officeId"=pe."officeId" AND ca."officeId"=pe."officeId" AND ca."accountId"=pe."accountId" AND a."accountId"=ca."accountId" AND p."partyId"=ca."partyId" ORDER BY p."name", o."name" ASC');
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return resultInfo;

  },

}
