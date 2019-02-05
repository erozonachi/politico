/**
* @author Eneh, James Erozonachi
*
* @description Central point for all routes
*
* */
import PartyRoutes from './PartyRoutes';
import OfficeRoutes from './OfficeRoutes';
import AuthRoutes from './AuthRoutes';

export default function routes(app) {

  // routes to Parties resources
  PartyRoutes(app);

  // routes to Offices resources
  OfficeRoutes(app);

  // routes to auth resources
  AuthRoutes(app);

}