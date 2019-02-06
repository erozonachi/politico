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
        
        user.password = hash;
        const result = User.create(user);
        result.then((result) => {
          resolve(result);
        }, (error) => {
          if (error.code === '23505') {

            if (error.detail.includes('email')) {
              const error = {status: 400, error: `email already in use`,};
              reject(error);
            }
            if (error.detail.includes('phoneNumber')) {
              const error = {status: 400, error: `phoneNumber already in use`,};
              reject(error);
            }
            if (error.detail.includes('passportUrl')) {
              const error = {status: 400, error: `passportUrl already exists`,};
              reject(error);
            }

          }
        });

      }, (error) => {
        reject(error);
      });
    });
    createUser.then((result) => {
      if (result.rowCount <= 0) {
        return res.status(400).json({ status: 400, error: 'User already exists'});
      } else {
        const output = result.rows.map(info => (
          {
            id: info.accountId,
            firstName: info.firstName,
            lastName: info.lastName,
            email: info.email,
            phoneNumber: info.phoneNumber,
            passportUrl: info.passportUrl,
            isAdmin: info.isAdmin
          }
        ));
        const token = jwt.sign({id: output[0].id, email: output[0].email, isAdmin: output[0].isAdmin}, process.env.SECRET_KEY, {expiresIn: '1d'});
        return res.status(201).json({ status: 201, data: [{token: token, user: output[0]}] });
      }
    }, (error) => {
      if (error.status === 400) {
        return res.status(400).json(error);
      }
      return res.status(508).json({ status: 508, error: 'Database connection failed, try again'});
    });

  }

  static signIn(req, res) {

    const { username, password } = req.body;
    
    const result = User.fetchByUsername(username);
    result.then((result) => {
      if (result.rowCount <= 0){
        return res.status(400).json({ status: 400, error: 'Incorrect username or password' });
      } else {
        const user = result.rows[0];
        const userInfo = {
          id: user.accountId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          passportUrl: user.passportUrl,
          isAdmin: user.isAdmin
        };
        bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            return res.status(400).json({ status: 400, error: 'Incorrect username or password' });
          }
          const tokenPaylod = {
            id: user.accountDd,
            email: user.email,
            isAdmin: user.isAdmin,
          }
          const token = jwt.sign(tokenPaylod, process.env.SECRET_KEY, {expiresIn: '1d'});
          if (!token) {
            return res.status(508).json({ status: 508, error: 'Token generation failed'});
          } else {
            const authResult = {
              token: token,
              user: userInfo,
            };
            
            return res.status(200).json({ status: 200, data: [authResult] });
          }
        }, (error) => {
          return res.status(400).json({ status: 400, error: 'Incorrect username or password'});
        }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));
      }
    }, (error) => {
      return res.status(508).json({ status: 508, error: 'Database connection failed, try again'});
    })
    .catch((error) => {
      return res.status(508).json({ status: 508, error: 'Database connection failed, try again'});
    });

  }

}

export default AuthController;
