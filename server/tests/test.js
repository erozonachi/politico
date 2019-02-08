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

    it('it should return status 401 and message: Authentication failed', (done) => {
      const party = {
        name: '',
        hqAddress: 'Maitama, Abuja',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      const party = {
        name: '64747848388393',
        hqAddress: 'Maitama, Abuja',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: '',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: '66737637738783',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: 'Lagos',
        logoUrl: '',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: 'Lagos',
        logoUrl: '5665676778',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

  });

  describe('PATCH /parties', () => {

    it('it should return status 401 and message: Authentication failed', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/ /Action Party')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/2as/Action Party')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/2/hjs   sjhsh')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/2/56787898989')
        .send()
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

  });

  describe('GET /parties', () => {

    it('it should return status 401 and message: Authentication failed', (done) => {
      
      chai.request(server)
        .get('/api/v1/parties/1sd')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

  });

  describe('DELETE /parties', () => {

    it('it should return status 401 and message: Authentication failed', (done) => {
      
      chai.request(server)
        .delete('/api/v1/parties/1sd')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

  });

});

describe('Offices', () => {
  describe('POST /offices', () => {

    it('it should return status 401 and message: Authentication failed', (done) => {
      const office = {
        type: '',
        name: 'Chairman',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      const office = {
        type: '63673676',
        name: 'Chairman',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Unknown type', (done) => {
      const office = {
        type: 'National',
        name: 'Chairman',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      const office = {
        type: 'Local',
        name: '',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('it should return status 401 and message: Authentication failed', (done) => {
      const office = {
        type: 'Local',
        name: '7587484',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

  });

  describe('GET /offices', () => {

    it('it should return status 401 and message: Authentication failed', (done) => {
      
      chai.request(server)
        .get('/api/v1/offices/1sd')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

  });

});
