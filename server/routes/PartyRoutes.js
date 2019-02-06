
/**
* @author Eneh, James Erozonachi
*
* @description Politico Application: Party API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import PartyValidator from '../helpers/validationlib/PartyValidator';
import PartyController from '../controllers/PartyController.js';

export default function partyRoutes(app) {

  // POST /api/v1/parties
  app.post(`${Constants.API_BASE_URL}/parties`, PartyValidator.create, PartyController.create);

  // PATCH /api/v1/parties
  app.patch(`${Constants.API_BASE_URL}/parties`,  PartyValidator.update, PartyController.update);

  // GET /api/v1/parties
  app.get(`${Constants.API_BASE_URL}/parties`, PartyController.getParty);

  // GET api/v1/parties/:id
  app.get(`${Constants.API_BASE_URL}/parties/:id`, PartyValidator.checkID, PartyController.getPartyById);

  // DELETE api/v1/parties/:id
  app.delete(`${Constants.API_BASE_URL}/parties/:id`, PartyValidator.checkID, PartyController.delete);
}