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
    if (!FieldValidator.isSapcedAlpha(req.body.name)) {
      return res.status(400).json({status: 400, error: 'name can only be  combination of words and spaces'});
    }

    if (FieldValidator.isEmpty(req.body.hqAddress)) {
      return res.status(400).json({status: 400, error: 'hqAddress is required'});
    }
    if (FieldValidator.isNumeric(req.body.hqAddress)) {
      return res.status(400).json({status: 400, error: 'hqAddress cannot be numbers'});
    }
    if (!FieldValidator.isSapcedDigitAlpha(req.body.hqAddress)) {
      return res.status(400).json({status: 400, error: 'Special characters not allowed in Address'});
    }

    if (FieldValidator.isEmpty(req.body.logoUrl)) {
      return res.status(400).json({status: 400, error: 'logoUrl is required'});
    }
    if (!FieldValidator.isvalidURL(req.body.logoUrl)) {
      return res.status(400).json({status: 400, error: 'logoUrl is not a valid URL'});
    }

    req.body.name = req.body.name.replace(/ +(?= )/g,'');
    req.body.hqAddress = req.body.hqAddress.replace(/ +(?= )/g,'');

    next();
  },

  update(req, res, next) {
    
    if (FieldValidator.isEmpty(req.params.name)) {
      return res.status(400).json({status: 400, error: 'name is required'});
    }
    if (FieldValidator.isNumeric(req.params.name)) {
      return res.status(400).json({status: 400, error: 'name is cannot be numbers'});
    }
    if (!FieldValidator.isSapcedAlpha(req.params.name)) {
      return res.status(400).json({status: 400, error: 'name can only be  combination of words and spaces'});
    }

    if (FieldValidator.isEmpty(req.params.id)) {
      return res.status(400).json({status: 400, error: 'id is required'});
    }
    if (!FieldValidator.isNumeric(req.params.id)) {
      return res.status(400).json({status: 400, error: 'id is not a number'});
    }

    req.params.name = req.params.name.replace(/ +(?= )/g,'');

    next();

  },

  checkID(req, res, next) {
    
    if (!FieldValidator.isNumeric(req.params.id)) {
      return res.status(400).json({status: 400, error: 'Party Id is not a number'});
    }

    next();
  },
}
