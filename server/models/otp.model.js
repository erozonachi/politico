/**
* @author Eneh, James Erozonachi
*
* @description Candidate model
*
* */
import pg from 'pg';
import * as Constants from '../helpers/Constants';

export default {
 
  create(newOtp) {
    
    const createOtp = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);

      const result = connector.query('INSERT INTO otp("pass", "email", "createdOn") values($1, $2, DEFAULT) RETURNING *',
        [newOtp.pass, newOtp.email,]);

      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));

    });

    return createOtp;

  },

  checkOtp(otp) {
    
    const otpInfo = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT * FROM otp WHERE "pass"=($1) AND "email"=($2) AND "createdOn"=CURRENT_DATE  AND "used"=false', [otp.pass, otp.email,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return otpInfo;

  },

  getOtp(email) {
    
    const otp = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('SELECT * FROM otp WHERE "email"=($1) AND "createdOn"::DATE=CURRENT_DATE  AND "used"=false', [email,]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return otp;

  },

  markAsUsed(otp) {
    
    const otpInfo = new Promise((resolve, reject) => {

      const connector = new pg.Pool(Constants.CONNECTION_STRING);
  
      const result = connector.query('UPDATE otp SET "used"=true WHERE "email"=($1) AND "pass"=($2)', [otp.email, otp.pass]);
  
      result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      }).catch(err => reject(err));
  
    });
    
    return otpInfo;

  },

}
