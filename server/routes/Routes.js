/**
* @author Eneh, James Erozonachi
*
* @description Central point for all routes
*
* */
import PartyRoutes from './PartyRoutes';

export default function routes(app) {

  // routes to Parties resources
  PartyRoutes(app);
}