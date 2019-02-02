
/**
* @author Eneh, James Erozonachi
*
* @description Politico Application: Party API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import PartyValidator from '../helpers/validationlib/PartyValidator';
import PartyController from '../controllers/PartyController.js';

export default function entryRoutes(app) {
  const party = new PartyController();
  // POST /api/v1/parties
  app.post(`${Constants.API_BASE_URL}/parties`, PartyValidator.create, party.create);

  // PATCH /api/v1/parties
  app.patch(`${Constants.API_BASE_URL}/parties`,  PartyValidator.update, party.update);

  // GET /api/v1/parties
  app.get(`${Constants.API_BASE_URL}/parties`, party.read);

  // GET api/v1/parties/:id
  app.get(`${Constants.API_BASE_URL}/parties/:id`, PartyValidator.checkID, party.readById);

  // DELETE api/v1/parties/:id
  app.delete(`${Constants.API_BASE_URL}/parties/:id`, PartyValidator.checkID, party.delete);
}
