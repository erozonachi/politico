/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for Vote resource
*
* */
import FieldValidator from './FieldValidator';

export default {

  createPetition(req, res, next) {
    
    if (FieldValidator.isEmpty(req.body.office)) {
      return res.status(400).json({status: 400, error: 'office is required'});
    }
    if (!FieldValidator.isNumeric(req.body.office)) {
      return res.status(400).json({status: 400, error: 'office is not a number'});
    }

    if (FieldValidator.isEmpty(req.body.text)) {
      return res.status(400).json({status: 400, error: 'text is required'});
    }
    if (FieldValidator.isEmpty(req.body.evidence)) {
      return res.status(400).json({status: 400, error: 'evidence is required'});
    }
    let urlList = req.body.evidence;
    for(let i = 0; i < urlList.length; i++) {
      if (!FieldValidator.isvalidURL(urlList[i])) {
        return res.status(400).json({status: 400, error: 'Invalid evidence url'});
      }
    }
    req.body.text = req.body.text.replace(/ +(?= )/g,'').trim();

    next();
  },

}
