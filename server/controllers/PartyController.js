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
      
      const lookUp = Party.search(data.name, data.logoUrl);
      lookUp.then((result) => {
        if (result.rowCount > 0) {
          if (String(result.rows[0]['name']) === String(data.name).trim().toLowerCase()){
            return res.status(400).json({status: 400, error: 'Party name already exist'});
          }
          return res.status(400).json({status: 400, error: 'Party logoUrl already in use'});
        } else {
          const createParty = Party.create(data);
          createParty.then((result) => {
            if (result.rowCount <= 0) {
              return res.status(400).json({ status: 400, error: 'logoUrl or record already exist'});
            } else {
              const output = result.rows.map(info => ({id: info.id, name: info.name,}));
              return res.status(201).json({ status: 201, data: output[0]});
            }
          }, (error) => {
            return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
          });
        }
      }, (error) => {
        return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
      });

  }

  static getParty(req, res) {
     
      const getParty = Party.read();
      getParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(200).json({ status: 200, data: []});
        } else {
          const output = result.rows.map(info => (
            {id: info.id, name: info.name, hqAddress: info.hqaddress, logoUrl: info.logourl, createdOn: info.createdon}));
          return res.status(200).json({ status: 200, data: output});
        }
      }, (error) => {
        return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
      });
    
  }

  static getPartyById(req, res) {
     
      const { id } = req.params;
      const getParty = Party.readById(id.trim());
      getParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 404, error: 'No data found for id: '+id});
        } else {
          const output = result.rows.map(info => (
            {id: info.id, name: info.name, hqAddress: info.hqaddress, logoUrl: info.logourl, createdOn: info.createdon}));
          return res.status(200).json({ status: 200, data: output[0]});
        }
      }, (error) => {
        return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
      });

  }

  static update(req, res) {
      
      const data = req.body;
      const updateParty = Party.update(data);
      updateParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 404, error: 'Party not found'});
        } else {
          const output = result.rows.map(info => ({id: info.id, name: info.name,}));
          return res.status(200).json({ status: 200, data: output[0]});
        }
      }, (error) => {
        return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
      });

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
        return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
      });

  }

}

export default PartyController;
