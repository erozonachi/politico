
/**
* @author Eneh, James Erozonachi
*
* @description Politico Application: Party API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import * as Uploader from '../helpers/Uploader';
import PartyValidator from '../helpers/validationlib/PartyValidator';
import PartyController from '../controllers/PartyController';

export default function entryRoutes(app) {
  
  // POST /api/v1/parties
  app.post(`${Constants.apiBaseURL}/parties`, Uploader.upload.single('logo'), PartyValidator.create, PartyController.create);

  // GET /api/v1/parties
  app.get(`${Constants.apiBaseURL}/parties`, PartyController.read);

  // GET api/v1/parties/:id
  app.get(`${Constants.apiBaseURL}/parties/:id`, PartyValidator.read, PartyController.readById);
}
