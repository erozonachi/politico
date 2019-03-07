
/**
* @author Eneh, James Erozonachi
*
* @description Politico Application: Vote API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import VoteValidator from '../helpers/validationlib/VoteValidator';
import VoteController from '../controllers/VoteController.js';
import AuthController from '../controllers/AuthController';

export default function voteRoutes(app) {
  
  // POST /api/v1/votes
  app.post(`${Constants.API_BASE_URL}/votes`, AuthController.isAuthenticated, VoteValidator.voteCandidate, VoteController.voteCandidate);

  // GET /api/v1/votes/candidates
  app.get(`${Constants.API_BASE_URL}/votes/candidates`, AuthController.isAuthenticated, VoteController.getVotedCandidates);

}
