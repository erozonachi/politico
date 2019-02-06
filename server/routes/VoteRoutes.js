
/**
* @author Eneh, James Erozonachi
*
* @description Politico Application: Vote API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import VoteValidator from '../helpers/validationlib/VoteValidator';
import VoteController from '../controllers/VoteController.js';

export default function voteRoutes(app) {
  
  // POST /api/v1/offices
  app.post(`${Constants.API_BASE_URL}/votes`, VoteValidator.voteCandidate, VoteController.voteCandidate);

}
