/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for Party resource
*
* */
import FieldValidator from './FieldValidator';

export default {
  create(req, res, next) {
    
    if (FieldValidator.isEmpty(req.body.name)) {
      return res.status(400).json({status: 400, error: 'name is required'});
    }
    if (FieldValidator.isNumeric(req.body.name)) {
      return res.status(400).json({status: 400, error: 'name cannot be numbers'});
    }
    if (FieldValidator.isEmpty(req.body.hqAddress)) {
      return res.status(400).json({status: 400, error: 'hqAddress is required'});
    }
    if (FieldValidator.isNumeric(req.body.hqAddress)) {
      return res.status(400).json({status: 400, error: 'hqAddress cannot be numbers'});
    }
    if (FieldValidator.isEmpty(req.body.logoUrl)) {
      return res.status(400).json({status: 400, error: 'logoUrl is required'});
    }
    if (!FieldValidator.isvalidURL(req.body.logoUrl)) {
      return res.status(400).json({status: 400, error: 'logoUrl is not a valid URL'});
    }

    next();
  },

  update(req, res, next) {
    
    if (FieldValidator.isEmpty(req.body.name)) {
      return res.status(400).json({status: 400, error: 'name is required'});
    }
    if (FieldValidator.isNumeric(req.body.name)) {
      return res.status(400).json({status: 400, error: 'name is cannot be numbers'});
    }
    if (FieldValidator.isEmpty(req.body.id)) {
      return res.status(400).json({status: 400, error: 'id is required'});
    }
    if (!FieldValidator.isNumeric(req.body.id)) {
      return res.status(400).json({status: 400, error: 'id is not a number'});
    }

    next();

  },

  checkID(req, res, next) {
    
    if (!FieldValidator.isNumeric(req.params.id)) {
      return res.status(400).json({status: 400, error: 'Party Id is not a number'});
    }

    next();
  },
}
