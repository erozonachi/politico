/**
* @author Eneh, James Erozonachi
*
* @description Auth resource module
*
* */
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Constants from '../helpers/Constants';

class AuthController {

  static signUp(req, res) {

    const user = req.body;

    const createUser = new Promise((resolve, reject) => {
      bcrypt.hash(user.password, Constants.HASH_SALT_ROUNDS).then((hash) => {
        
        const checkUniqueness = User.search(user);
        checkUniqueness.then(result => {
          if (result.rowCount > 0) {
            if (result.rows[0].phonenumber === user.phoneNumber) {
              const error = {status: 400, error: 'Phone number already in use'};
              reject(error);
            } else if (result.rows[0].passporturl === user.passportUrl) {
              const error = {status: 400, error: 'Passport already exists'};
              reject(error);
            } else {
              const error = {status: 400, error: 'Email already in use'};
              reject(error);
            }
          } else {
            user.password = hash;
            const result = User.create(user);
            result.then((result) => {
              resolve(result);
            }, (error) => {
              reject(error);
            });
          }
        }, error => {
          reject(error);
        })
      }, (error) => {
        reject(error);
      });
    });
    createUser.then((result) => {
      if (result.rowCount <= 0) {
        return res.status(503).json({ status: 503, error: 'Database connection failed'});
      } else {
        const output = result.rows.map(info => ({id: info.id, firstName: info.firstname, lastName: info.lastname, email: info.email, phoneNumber: info.phonenumber, passportUrl: info.passporturl, isAdmin: info.isadmin}));
        const token = jwt.sign({id: output[0].id, email: output[0].email, isAdmin: output[0].isAdmin}, process.env.SECRET_KEY, {expiresIn: '1d'});
        return res.status(201).json({ status: 201, data: [{token: token, user: output[0]}] });
      }
    }, (error) => {
      if (error.status === 400) {
        return res.status(400).json(error);
      }
      return res.status(503).json({ status: 503, error: 'Database connection failed'});
    });

  }

}

export default AuthController;
