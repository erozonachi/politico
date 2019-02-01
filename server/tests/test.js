/**
* @author Eneh, James Erozonachi
*
* @description entry operations specification
*
* */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../index';

const expect = chai.expect;

chai.use(chaiHTTP);

describe('Parties', () => {
  describe('POST /parties', () => {

    it('it should return status 400 and message: name is required', (done) => {
      const party = {
        name: '',
        hqAddress: 'Maitama, Abuja',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return status 400 and message: name cannot be numbers', (done) => {
      const party = {
        name: '64747848388393',
        hqAddress: 'Maitama, Abuja',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return status 400 and message: hqAddress is required', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: '',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return status 400 and message: hqAddress cannot be numbers', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: '66737637738783',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return status 400 and message: logoUrl is required', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: 'Lagos',
        logoUrl: '',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return status 400 and message: logoUrl is not a valid URL', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: 'Lagos',
        logoUrl: '5665676778',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

  });

  describe('PATCH /parties', () => {

    it('it should return status 400 and message: id is required', (done) => {
      const party = {
        id: '',
        name: 'Action Party',
      };
      chai.request(server)
        .patch('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return status 400 and message: id is not a number', (done) => {
      const party = {
        id: '2as',
        name: 'Action Party',
      };
      chai.request(server)
        .patch('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return status 400 and message: name is required', (done) => {
      const party = {
        id: 2,
        name: '',
      };
      chai.request(server)
        .patch('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should return status 400 and message: name cannot be a number', (done) => {
      const party = {
        id: 2,
        name: '56787898989',
      };
      chai.request(server)
        .patch('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

  });

  describe('GET /parties', () => {

    it('it should return status 400 and message: id is not a number', (done) => {
      
      chai.request(server)
        .get('/api/v1/parties/1sd')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

  });

  describe('DELETE /parties', () => {

    it('it should return status 400 and message: id is not a number', (done) => {
      
      chai.request(server)
        .delete('/api/v1/parties/1sd')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

  });

});
