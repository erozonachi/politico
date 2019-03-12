
/**
* @author Eneh, James Erozonachi
*
* @description Politico Application: Vote API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import PetitionValidator from '../helpers/validationlib/PetitionValidator';
import PetitionController from '../controllers/PetitionController';
import AuthController from '../controllers/AuthController';

export default function petitionRoutes(app) {
  
  // POST /api/v1/petitions
  app.post(`${Constants.API_BASE_URL}/petitions`, AuthController.isAuthenticated, PetitionValidator.createPetition, PetitionController.createPetition);

  // GET /api/v1/petitions
  app.get(`${Constants.API_BASE_URL}/petitions`, AuthController.isAdmin, PetitionController.getPetitions);

}
