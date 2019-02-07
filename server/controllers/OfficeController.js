/**
* @author Eneh, James Erozonachi
*
* @description Office resource module
*
* */
import Office from '../models/office.model';
import Candidate from '../models/candidate.model';
import Vote from '../models/vote.model';

class OfficeController {
  
  static create(req, res) {
    
      const data = req.body;
      
      const lookUp = Office.search(data);
      lookUp.then((result) => {
        if (result.rowCount > 0) {
          return res.status(400).json({status: 400, error: 'Office already exist'});
        } else {
          const createOffice = Office.create(data);
          createOffice.then((result) => {
            if (result.rowCount <= 0) {
              return res.status(400).json({ status: 400, error: 'Office already exist'});
            } else {
              return res.status(201).json({ status: 201, data: result.rows[0]});
            }
          }, (error) => {
            return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});
          }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));
        }
      }, (error) => {
        return res.status(508).json({ status: 508, error: error});
      }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }

  static getOffice(req, res) {
      
      const getOffice = Office.read();
      getOffice.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(200).json({ status: 200, data: []});
        } else {
          return res.status(200).json({ status: 200, data: result.rows});
        }
      }, (error) => {
        return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});
      }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));
    
  }

  static getOfficeById(req, res) {
     
      const { id } = req.params;
      const getOffice = Office.readById(id.trim());
      getOffice.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 404, error: 'No data found for id: '+id});
        } else {
          return res.status(200).json({ status: 200, data: result.rows[0]});
        }
      }, (error) => {

        return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});

      }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }

  static registerCandidate(req, res) {

    const { id } = req.params;
    const data = req.body;
    data.createdBy = id;
      
    const checkUser = Candidate.checkUser(id);
    checkUser.then((result) => {
      if (result.rowCount > 0) {
        return res.status(400).json({ status: 400, error: `User with ID: ${id} is already a candidate`});
      } else {
        const registerCandidate = Candidate.create(data);
        registerCandidate.then((result) => {
          if (result.rowCount <= 0) {
            return res.status(400).json({ status: 400, error: `The office has a candidate already`});
          } else {
            return res.status(201).json({ status: 201, data: data});
          }
        }, (error) => {
          if (error.code === '23503') {

            if (error.detail.includes('office_id')) {
              return res.status(404).json({status: 404, error: `office not found`,});
            }
            if (error.detail.includes('party_id')) {
              return res.status(404).json({status: 404, error: `party not found`,});
            }
            if (error.detail.includes('acct_id')) {
              return res.status(404).json({status: 404, error: `user not found`,});
            }

          }

          if (error.code === '23505') {
            return res.status(400).json({status: 400, error: `office already has a candidate under the same party`});
          }

          return res.status(508).json({ status: 508, error: `Oops! Database error, try again`});

        }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));
      }
    }, (error) => {
      return res.status(508).json({ status: 508, error: `Oops! Database error, try again`});

    }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }

  static getOfficeVoteResult(req, res) {
    
    const { id } = req.params;
      const getResult = Vote.getOfficeVoteResult(id.trim());
      getResult.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 404, error: 'No result found for office id: '+id});
        } else {
          const output = result.rows.map(info => ({office: info.office, candidate: info.candidate, result: Number.parseInt(info.result),}));
          return res.status(200).json({ status: 200, data: output});
        }
      }, (error) => {

        return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});

      }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }

}

export default OfficeController;
