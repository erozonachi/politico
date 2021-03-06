/**
* @author Eneh, James Erozonachi
*
* @description Central point for all routes
*
* */
import PartyRoutes from './PartyRoutes';
import OfficeRoutes from './OfficeRoutes';
import VoteRoutes from './VoteRoutes';
import AuthRoutes from './AuthRoutes';
import PetitionRoutes from './PetitionRoutes';

export default function routes(app) {

  // routes to Parties resources
  PartyRoutes(app);

  // routes to Offices resources
  OfficeRoutes(app);

  // routes to Votes resources
  VoteRoutes(app);

  // routes to auth resources
  AuthRoutes(app);
  
  // routes to petitions resources
  PetitionRoutes(app);

}