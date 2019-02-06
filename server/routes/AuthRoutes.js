
/**
* @author Eneh, James Erozonachi
*
* @description Politico Application: Auth API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import AuthValidator from '../helpers/validationlib/AuthValidator';
import AuthController from '../controllers/AuthController.js';

export default function authRoutes(app) {
  
  // POST /api/v1/auth/signup
  app.post(`${Constants.API_BASE_URL}/auth/signup`, AuthValidator.signUp, AuthController.signUp);

  // POST /api/v1/auth/login
  app.post(`${Constants.API_BASE_URL}/auth/login`, AuthValidator.signIn, AuthController.signIn);

}