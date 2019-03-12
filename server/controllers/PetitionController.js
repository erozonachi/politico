/**
* @author Eneh, James Erozonachi
*
* @description Petition resource module
*
* */
import Vote from '../models/vote.model';
import Petition from '../models/petition.model';

class PetitionController {
  
  static createPetition(req, res) {

    const data = req.body;
    data.createdBy = req.params.userId
      
    const checkCandidate = Vote.checkVotedCandidate(data);
    checkCandidate.then((result) => {
      if (result.rowCount <= 0) {
        return res.status(400).json({ status: 400, error: `Candidate did not run for the specified office`});
      } else {
        const createPetition = Petition.create(data);
        createPetition.then((result) => {
          if (result.rowCount > 0) {
            data.id = result.rows[0].petitionId;
            data.createdOn = result.rows[0].createdOn;
            return res.status(201).json({ status: 201, data: data});
          }
        }, (error) => {
          if (error.code === '23505') {
            return res.status(400).json({status: 400, error: `You cannot write petition more than once for the same office`});
          }

          return res.status(508).json({ status: 508, error: `Database connection error, try again`});

        }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`,}));
      }
    }, (error) => {
      return res.status(508).json({ status: 508, error: `Database connection error, try again`,});

    }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`,}));
  }

  static getPetitions(req, res) {
    
    const getResult = Petition.getPetitions();
    getResult.then((result) => {
      const output = result.rows.map(info => {
        info.evidence = JSON.parse(info.evidence);
        return info;
      });
      return res.status(200).json({ status: 200, data: output});
    }, (error) => {

      return res.status(508).json({ status: 508, error: `Database connection error, try again`,});

    }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }

}
export default PetitionController;
