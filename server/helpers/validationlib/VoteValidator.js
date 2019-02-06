/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for Vote resource
*
* */
import FieldValidator from './FieldValidator';

export default {

  voteCandidate(req, res, next) {
    
    if (FieldValidator.isEmpty(req.body.office)) {
      return res.status(400).json({status: 400, error: 'office is required'});
    }
    if (!FieldValidator.isNumeric(req.body.office)) {
      return res.status(400).json({status: 400, error: 'office is not a number'});
    }

    if (FieldValidator.isEmpty(req.body.candidate)) {
      return res.status(400).json({status: 400, error: 'candidate is required'});
    }
    if (!FieldValidator.isNumeric(req.body.candidate)) {
      return res.status(400).json({status: 400, error: 'candidate is not a number'});
    }

    if (FieldValidator.isEmpty(req.body.voter)) {
      return res.status(400).json({status: 400, error: 'voter is required'});
    }
    if (!FieldValidator.isNumeric(req.body.candidate)) {
      return res.status(400).json({status: 400, error: 'voter is not a number'});
    }

    next();
  },

}
