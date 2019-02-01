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

    const type = String(req.body.type).trim().toLowerCase();
    if (type != 'federal' && type != 'legislative' && type != 'state' && type != 'local') {
      return res.status(400).json({status: 400, error: 'Unknown office type'});
    }

    next();
  },

  checkID(req, res, next) {
    
    if (!FieldValidator.isNumeric(req.params.id)) {
      return res.status(400).json({status: 400, error: 'Office Id is not a number'});
    }

    next();
  },
}
