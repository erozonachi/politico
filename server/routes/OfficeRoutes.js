
/**
* @author Eneh, James Erozonachi
*
* @description Politico Application: Office API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import OfficeValidator from '../helpers/validationlib/OfficeValidator';
import OfficeController from '../controllers/OfficeController.js';

export default function officeRoutes(app) {
  
  // POST /api/v1/offices
  app.post(`${Constants.API_BASE_URL}/offices`, OfficeValidator.create, OfficeController.create);

  // POST /api/v1/office/:id/register
  app.post(`${Constants.API_BASE_URL}/office/:id/register`, OfficeValidator.registerCandidate, OfficeController.registerCandidate);

  // GET /api/v1/offices
  app.get(`${Constants.API_BASE_URL}/offices`, OfficeController.getOffice);

  // GET api/v1/offices/:id
  app.get(`${Constants.API_BASE_URL}/offices/:id`, OfficeValidator.checkID, OfficeController.getOfficeById);

}
