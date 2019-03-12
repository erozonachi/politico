/**
* @author Eneh, James Erozonachi
*
* @description Auth resource module
*
* */
import User from '../models/user.model';
import Otp from '../models/otp.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Constants from '../helpers/Constants';
import Mail from '../helpers/Mail';

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
            id: user.accountId,
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

  static isAuthenticated(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).json({ status: 401, error: 'Authentication failed' });
        } else {
          req.params.userId = parseInt(decoded.id, 10);
          next();
        }
      });
    } else {
      return res.status(401).send({ 
        status: 401, 
        error: 'User not authenticated',
      });
    }
  }

  static isAdmin(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          return res.status(401).json({ status: 401, error: 'Authentication failed' });
        } else {
          if (decoded.isAdmin === true) {
            req.params.userId = parseInt(decoded.id, 10);
            next();
          } else {
            return res.status(403).json({status: 403, error: 'Not authorized'});
          }
        }
      });
    } else {
      return res.status(401).send({ 
        status: 401, 
        error: 'User not authenticated',
      });
    }
  }

  static makeUserAdmin(req, res) {
      
    const id = req.params.id;
    const makeAdmin = User.updateToAdmin(id);
    makeAdmin.then((result) => {
      if (result.rowCount <= 0) {
        return res.status(404).json({ status: 404, error: 'User not found'});
      } else {
        return res.status(200).json({ status: 200, data: [{message: `success`}]});
      }
    }, (error) => {

      return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});

    }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }
  
  static createResetOtp(req, res) {
      
    const info = req.body;
    info.pass = Math.floor(Math.random() * (Constants.MAX - Constants.MIN)) + Constants.MIN;
    const createOtp = Otp.create(info);
    createOtp.then((result) => {
      info.pass = result.rows[0].pass || info.pass;
      const sendOtp = Mail.sendOtp(Mail.messanger(), info);
      sendOtp.then((result) => {
        return res.status(201).json({ status: 201, data: [{message: `Check your email for password reset OTP`, email: info.email,}]});
      }, (error) => {
        return res.status(508).json({ status: 508, error: 'Oops! Mailing error, try again'});
      }).catch(err => {return res.status(508).json({ status: 508, error: `Oops! Mailing error, try again`})});
        
    }, (error) => {

      if (error.code === '23503') {

        if (error.detail.includes('email')) {
          return res.status(404).json({status: 404, error: `email not found`,});
        }

      } else if (error.code === '23505') {
        const getOtp = Otp.getOtp(info.email);
        getOtp.then((result) => {
          info.pass = result.rows[0].pass;
          const sendOtp = Mail.sendOtp(Mail.messanger(), info);
          sendOtp.then((result) => {
            return res.status(200).json({ status: 200, data: [{message: `Check your email for password reset OTP`, email: info.email,}]});
          }, (error) => {
            return res.status(508).json({ status: 508, error: 'Oops! Mailing error, try again'});
          }).catch(err => {return res.status(508).json({ status: 508, error: `Oops! Mailing error, try again`})});
        }, (error) => {

          return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});

        }).catch(err => {return res.status(500).json({ status: 500, error: `Server error, try again`})});
      } else {
        return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});
      }

    }).catch(err => {return res.status(500).json({ status: 500, error: `Server error, try again`})});

  }

}

export default AuthController;
