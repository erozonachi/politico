/**
* @author Eneh, James Erozonachi
*
* @description Vote resource module
*
* */
import Vote from '../models/vote.model';

class VoteController {
  
  static voteCandidate(req, res) {

    const data = req.body;
      
    const checkCandidate = Vote.checkCandidate(data);
    checkCandidate.then((result) => {
      if (result.rowCount <= 0) {
        return res.status(400).json({ status: 400, error: `Candidate is not running for the specified office`});
      } else {
        const voteCandidate = Vote.create(data);
        voteCandidate.then((result) => {
          if (result.rowCount <= 0) {
            return res.status(400).json({ status: 400, error: `You have already voted for this office`});
          } else {
            return res.status(201).json({ status: 201, data: data});
          }
        }, (error) => {
          if (error.code === '23503') {

            if (error.detail.includes('office_id')) {
              return res.status(404).json({status: 404, error: `office not found`,});
            }
            if (error.detail.includes('can_id')) {
              return res.status(404).json({status: 404, error: `candidate not found`,});
            }
            if (error.detail.includes('acct_id')) {
              return res.status(404).json({status: 404, error: `voter not found`,});
            }

          }

          if (error.code === '23505') {
            return res.status(400).json({status: 400, error: `You cannot vote more than once for the same office`});
          }

          return res.status(508).json({ status: 508, error: `Oops! Database error, try again`});

        }).catch(err => console.error('Error', err.stack));
      }
    }, (error) => {
      return res.status(508).json({ status: 508, error: `Oops! Database error, try again`});

    }).catch(err => console.error('Error', err.stack));
  }

}

export default VoteController;
