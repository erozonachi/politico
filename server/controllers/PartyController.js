/**
* @author Eneh, James Erozonachi
*
* @description Party resource module
*
* */
import Party from '../models/party.model';

class PartyController {
  
  static create(req, res) {
    
      const data = req.body;
      
      const createParty = Party.create(data);
      createParty.then((result) => {
          const output = result.rows.map(info => ({id: info.partyId, name: info.name,}));
          return res.status(201).json({ status: 201, data: output[0]});
      }, (error) => {

        if (error.code === '23505') {

          if (error.detail.includes('name')) {
            return res.status(400).json({status: 400, error: `party already exists`,});
          }
          if (error.detail.includes('logoUrl')) {
            return res.status(400).json({status: 400, error: `logoUrl already in use`,});
          }

        }
        return res.status(508).json({ status: 508, error: 'Oops! Database connection failed, try again'});

      }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }

  static getParty(req, res) {
     
      const getParty = Party.read();
      getParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(200).json({ status: 200, data: []});
        } else {
          const output = result.rows.map(info => (
            {id: info.partyId, name: info.name, hqAddress: info.hqAddress, logoUrl: info.logoUrl, createdOn: info.createdOn}));
          return res.status(200).json({ status: 200, data: output});
        }
      }, (error) => {

        return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});

      }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));
    
  }

  static getPartyById(req, res) {
     
      const { id } = req.params;
      const getParty = Party.readById(id.trim());
      getParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 404, error: 'No data found for id: '+id});
        } else {
          const output = result.rows.map(info => (
            {id: info.partyId, name: info.name, hqAddress: info.hqAddress, logoUrl: info.logoUrl, createdOn: info.createdOn}));
          return res.status(200).json({ status: 200, data: output[0]});
        }
      }, (error) => {
        return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});
      }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }

  static update(req, res) {
      
      const data = {
        id: req.params.id,
        name: req.params.name
      };
      const updateParty = Party.update(data);
      updateParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 404, error: 'Party not found'});
        } else {
          const output = result.rows.map(info => ({id: info.partyId, name: info.name,}));
          return res.status(200).json({ status: 200, data: output[0]});
        }
      }, (error) => {

        return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});

      }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }

  static delete(req, res) {
    
      const { id } = req.params;
      const deleteParty = Party.delete(id);
      deleteParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 404, error: 'Party not found'});
        } else {
          return res.status(200).json({ status: 200, data: {message: 'Delete successful'}});
        }
      }, (error) => {

        return res.status(508).json({ status: 508, error: 'Oops! Database error, try again'});

      }).catch(err => res.status(500).json({ status: 500, error: `Server error, try again`}));

  }

}

export default PartyController;
