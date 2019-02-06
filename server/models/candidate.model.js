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

      const result = connector.query('INSERT INTO candidate(office_id, party_id, acct_id, createdOn) values($1, $2, $3, DEFAULT)',
        [newCandidate.office, newCandidate.party, newCandidate.createdBy]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => console.error('Error executing query', err.stack));

    });

    return createCandidate;

  },

  checkUser(user) {
    
    const userInfo = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT * FROM candidate WHERE acct_id=($1)  AND deleted=false', [user,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => console.error('Error executing query', err.stack));
  
    });
    
    return userInfo;

  },

}
