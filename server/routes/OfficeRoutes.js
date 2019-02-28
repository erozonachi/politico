
/**
* @author Eneh, James Erozonachi
*
* @description Politico Application: Office API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import OfficeValidator from '../helpers/validationlib/OfficeValidator';
import OfficeController from '../controllers/OfficeController';
import AuthController from '../controllers/AuthController';

export default function officeRoutes(app) {
  
  // POST /api/v1/offices
  app.post(`${Constants.API_BASE_URL}/offices`, AuthController.isAdmin, OfficeValidator.create, OfficeController.create);

  // POST /api/v1/office/:id/register
  app.post(`${Constants.API_BASE_URL}/offices/:id/register`, AuthController.isAdmin, OfficeValidator.registerCandidate, OfficeController.registerCandidate);

  // POST /api/v1/office/express-interest
  app.post(`${Constants.API_BASE_URL}/offices/express-interest`, AuthController.isAuthenticated, OfficeValidator.expressInterest, OfficeController.expressInterest);

  // GET /api/v1/offices
  app.get(`${Constants.API_BASE_URL}/offices`, AuthController.isAuthenticated, OfficeController.getOffice);

  // GET api/v1/offices/:id
  app.get(`${Constants.API_BASE_URL}/offices/:id`, AuthController.isAuthenticated, OfficeValidator.checkID, OfficeController.getOfficeById);

  // GET api/v1/offices/:id/candidates
  app.get(`${Constants.API_BASE_URL}/offices/:id/candidates`, AuthController.isAuthenticated, OfficeValidator.checkID, OfficeController.getCandidates);

  // GET api/v1/offices/:id/result
  app.get(`${Constants.API_BASE_URL}/offices/:id/result`, AuthController.isAuthenticated, OfficeValidator.checkID, OfficeController.getOfficeVoteResult);

}
