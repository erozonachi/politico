/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for Office resource
*
* */
import FieldValidator from './FieldValidator';

export default {
  create(req, res, next) {
    
    if (FieldValidator.isEmpty(req.body.type)) {
      return res.status(400).json({status: 400, error: 'type is required'});
    }
    if (FieldValidator.isNumeric(req.body.type)) {
      return res.status(400).json({status: 400, error: 'type cannot be numbers'});
    }
    if (FieldValidator.isEmpty(req.body.name)) {
      return res.status(400).json({status: 400, error: 'name is required'});
    }
    if (FieldValidator.isNumeric(req.body.name)) {
      return res.status(400).json({status: 400, error: 'name cannot be numbers'});
    }
    if (!FieldValidator.isSapcedAlpha(req.body.name)) {
      return res.status(400).json({status: 400, error: 'name can only be  combination of words and spaces'});
    }

    const type = String(req.body.type).trim().toLowerCase();
    if (type != 'federal' && type != 'legislative' && type != 'state' && type != 'local') {
      return res.status(400).json({status: 400, error: 'Unknown office type'});
    }

    req.body.name = req.body.name.replace(/ +(?= )/g,'');

    next();
  },

  checkID(req, res, next) {
    
    if (!FieldValidator.isNumeric(req.params.id)) {
      return res.status(400).json({status: 400, error: 'Office Id is not a number'});
    }

    next();
  },

  registerCandidate(req, res, next) {
    
    if (FieldValidator.isEmpty(req.body.office)) {
      return res.status(400).json({status: 400, error: 'office is required'});
    }
    if (!FieldValidator.isNumeric(req.body.office)) {
      return res.status(400).json({status: 400, error: 'office is not a number'});
    }

    if (FieldValidator.isEmpty(req.body.party)) {
      return res.status(400).json({status: 400, error: 'party is required'});
    }
    if (!FieldValidator.isNumeric(req.body.party)) {
      return res.status(400).json({status: 400, error: 'party is not a number'});
    }

    if (!FieldValidator.isNumeric(req.params.id)) {
      return res.status(400).json({status: 400, error: 'user Id is not a number'});
    }

    next();
  },

}
