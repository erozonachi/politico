/**
* @author Eneh, James Erozonachi
*
* @description Office resource module
*
* */
import Office from '../models/office.model';

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
            return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
          });
        }
      }, (error) => {
        return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
      });

  }

  static read(req, res) {
      
      const readOffice = Office.read();
      readOffice.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(200).json({ status: 200, data: []});
        } else {
          return res.status(200).json({ status: 200, data: result.rows});
        }
      }, (error) => {
        return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
      });
    
  }

  static readById(req, res) {
     
      const { id } = req.params;
      const readOffice = Office.readById(id);
      readOffice.then((result) => {
        if (result.rowCount <= 0) {
          return res.status(404).json({ status: 404, error: 'No data found for id: '+id});
        } else {
          return res.status(200).json({ status: 200, data: result.rows[0]});
        }
      }, (error) => {
        return res.status(503).json({ status: 503, error: 'Oops! Database error, try again'});
      });

  }

}

export default OfficeController;
