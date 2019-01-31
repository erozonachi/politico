/**
* @author Eneh, James Erozonachi
*
* @description Party resource module
*
* */
import Party from '../models/party.model';
import * as Constants from '../helpers/Constants';

export default {
  
  create(req, res) {
    try {
      const data = req.body;
      data.logoUrl = req.file.path;
      
      const createParty = Party.create(data);
      createParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(500).json({ status: 500, error: Constants.systemError});
        } else {
          return res.status(201).json({ status: 201, data: result.rows});
        }
      }, (error) => {
        return res.status(500).json({ status: 500, error: Constants.systemError});
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: Constants.systemError});
    }
  },

  read(req, res) {
    try {
      
      const readParty = Party.read();
      readParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(500).json({ status: 500, error: Constants.systemError});
        } else {
          return res.status(200).json({ status: 200, data: result.rows});
        }
      }, (error) => {
        return res.status(500).json({ status: 500, error: Constants.systemError});
      });
      
    } catch (error) {
      return res.status(500).json({ status: 500, error: Constants.systemError});
    }
  },

  readById(req, res) {
    try {
      
      const { id } = req.params;
      const readParty = Party.readById(id);
      readParty.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(500).json({ status: 500, error: Constants.systemError});
        } else {
          return res.status(200).json({ status: 200, data: result.rows});
        }
      }, (error) => {
        return res.status(500).json({ status: 500, error: Constants.systemError});
      });

    } catch (error) {
      return res.status(500).json({ status: 500, error: Constants.systemError});
    }
  },

}