/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for entry resource
*
* */
import FieldValidator from './FieldValidator';

export default {
  create(req, res, next) {
    try {

      if (FieldValidator.isEmpty(req.body.name)) {
        return res.status(400).json({status: 400, error: 'name is required'});
      }
      if (FieldValidator.isEmpty(req.body.hqAddress)) {
        return res.status(400).json({status: 400, error: 'hqAddress is required'});
      }

      next();

    } catch (error) {
      return res.status(400).json({status: 400, error: 'Bad request payload'});
    }
  },
}
