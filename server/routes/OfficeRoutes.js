
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

  // GET /api/v1/offices
  app.get(`${Constants.API_BASE_URL}/offices`, OfficeController.getOffice);

  // GET api/v1/offices/:id
  app.get(`${Constants.API_BASE_URL}/offices/:id`, OfficeValidator.checkID, OfficeController.getOfficeById);

}
