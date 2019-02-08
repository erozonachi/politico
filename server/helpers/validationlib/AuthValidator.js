/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for Party resource
*
* */
import FieldValidator from './FieldValidator';

export default {
  signUp(req, res, next) {
    
    if (FieldValidator.isEmpty(req.body.firstName)) {
      return res.status(400).json({status: 400, error: 'firstName is required'});
    }
    if (!FieldValidator.isAlpha(req.body.firstName)) {
      return res.status(400).json({status: 400, error: 'firstName can only be letters'});
    }

    if (FieldValidator.isEmpty(req.body.lastName)) {
      return res.status(400).json({status: 400, error: 'lastName is required'});
    }
    if (!FieldValidator.isAlpha(req.body.lastName)) {
      return res.status(400).json({status: 400, error: 'lastName can only be letters'});
    }

    if (!FieldValidator.isEmpty(req.body.otherName)) {
      if (!FieldValidator.isAlpha(req.body.otherName)) {
        return res.status(400).json({status: 400, error: 'otherName can only be letters'});
      }
    } else req.body.otherName = '';

    if (FieldValidator.isEmpty(req.body.email)) {
      return res.status(400).json({status: 400, error: 'email is required'});
    }
    if (!FieldValidator.isEmail(req.body.email)) {
      return res.status(400).json({status: 400, error: 'Invalid email'});
    }

    if (FieldValidator.isEmpty(req.body.phoneNumber)) {
      return res.status(400).json({status: 400, error: 'phoneNumber is required'});
    }
    if (!FieldValidator.isPhone(req.body.phoneNumber)) {
      return res.status(400).json({status: 400, error: 'Invalid Nigerian mobile number'});
    }

    if (FieldValidator.isEmpty(req.body.passportUrl)) {
      return res.status(400).json({status: 400, error: 'passportUrl is required'});
    }
    if (!FieldValidator.isvalidURL(req.body.passportUrl)) {
      return res.status(400).json({status: 400, error: 'passportUrl is not a valid URL'});
    }

    if (FieldValidator.isEmpty(req.body.password)) {
      return res.status(400).json({status: 400, error: 'password is required'});
    }
    if (!FieldValidator.minLength(req.body.password, 8)) {
      return res.status(400).json({status: 400, error: 'Password cannot be less than 8 character length'});
    }
    if (FieldValidator.isAlpha(req.body.password) || FieldValidator.isNumeric(req.body.password)) {
      return res.status(400).json({status: 400, error: 'Weak password, a combination of letters, digits or special characters required'});
    }

    //Sanitize phone number
    req.body.phoneNumber = '234' + req.body.phoneNumber.slice(-10);

    next();
  },

  signIn(req, res, next) {

    if (FieldValidator.isEmpty(req.body.username)) {
      return res.status(400).json({status: 400, error: 'username is required'});
    }
    if (FieldValidator.isEmpty(req.body.password)) {
      return res.status(400).json({status: 400, error: 'Password is required'});
    }

    next();
  },

  checkID(req, res, next) {
    
    if (!FieldValidator.isNumeric(req.params.id)) {
      return res.status(400).json({status: 400, error: 'User Id is not a number'});
    }

    next();
  },

}
