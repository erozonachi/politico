/**
* @author Eneh, James Erozonachi
*
* @description tests
*
* */
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../index';

const expect = chai.expect;

chai.use(chaiHTTP);
let token = '';
let userToken = '';
let otp = 0;
let userId = 0;
let userId2 = 0;
let partyId = 0;
let partyId2 = 0;
let officeId = 0;
let candidateId = 0;

describe('Auth', () => {
  describe('POST /auth/signup', () => {
    it('it should return status 400 and error: firstName is required', (done) => {
      const user = {
        firstName: '',
        lastName: 'Eneh',
        otherName: 'Eneh',
        email: 'eneh@mail.com',
        phoneNumber: 'eneh@mail.com',
        passportUrl: 'eneh@mail.com',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('firstName is required');
          done();
        });
    });
    it('it should return status 400 and error: firstName can only be letters', (done) => {
      const user = {
        firstName: 'James738839#@',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('firstName can only be letters');
          done();
        });
    });
    it('it should return status 400 and error: lastName is required', (done) => {
      const user = {
        firstName: 'James',
        lastName: '',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('lastName is required');
          done();
        });
    });
    it('it should return status 400 and error: lastName can only be letters', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'eneh6474388#',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('lastName can only be letters');
          done();
        });
    });
    it('it should return status 400 and error: otherName can only be letters', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'eneh6474388#',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('otherName can only be letters');
          done();
        });
    });
    it('it should return status 400 and error: email is required', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: '',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('email is required');
          done();
        });
    });
    it('it should return status 400 and error: Invalid email', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh34444@',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Invalid email');
          done();
        });
    });
    it('it should return status 400 and error: phoneNumber is required', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh@abc.com',
        phoneNumber: '',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('phoneNumber is required');
          done();
        });
    });
    it('it should return status 400 and error: Invalid Nigerian mobile number', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh@abc.com',
        phoneNumber: '667677348743788778',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Invalid Nigerian mobile number');
          done();
        });
    });
    it('it should return status 400 and error: passportUrl is required', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh@abc.com',
        phoneNumber: '07038144776',
        passportUrl: '',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('passportUrl is required');
          done();
        });
    });
    it('it should return status 400 and error: passportUrl is not a valid URL', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh@abc.com',
        phoneNumber: '07038144776',
        passportUrl: '#####@#_',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('passportUrl is not a valid URL');
          done();
        });
    });
    it('it should return status 400 and error: password is required', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh@abc.com',
        phoneNumber: '07038144776',
        passportUrl: 'hgdhjsjkkskjkjsddk',
        password: '',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('password is required');
          done();
        });
    });
    it('it should return status 400 and error: Password cannot be less than 8 character length', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh@abc.com',
        phoneNumber: '07038144776',
        passportUrl: 'hgdhjsjkkskjkjsddk',
        password: 'gre23',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Password cannot be less than 8 character length');
          done();
        });
    });
    it('it should return status 400 and error: Weak password, a combination of letters, digits or special characters required', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh@abc.com',
        phoneNumber: '07038144776',
        passportUrl: 'hgdhjsjkkskjkjsddk',
        password: 'gregfgghghghhghf',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Weak password, a combination of letters, digits or special characters required');
          done();
        });
    });
    it('it should sign up a new user and return status 201', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh@mail.com',
        phoneNumber: '07038144776',
        passportUrl: 'https://www.eneh.im/dp.jpg',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          const info = res.body.data[0];
          userId2 = info.user.id;
          userToken = info.token;
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql(201);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0].token).to.be.a('string');
          expect(res.body.data[0].user).to.be.a('object');
          done();
        });
    });
    it('it should return status 400 and error: email already in use', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh@mail.com',
        phoneNumber: '07038144775',
        passportUrl: 'https://www.eneh.im/xdp.jpg',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('email already in use');
          done();
        });
    });
    it('it should return status 400 and error: phoneNumber already in use', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh7@mail.com',
        phoneNumber: '07038144776',
        passportUrl: 'https://www.eneh.im/xdp.jpg',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('phoneNumber already in use');
          done();
        });
    });
    it('it should return status 400 and error: passportUrl already exists', (done) => {
      const user = {
        firstName: 'James',
        lastName: 'Eneh',
        otherName: 'Erozona',
        email: 'eneh7@mail.com',
        phoneNumber: '07038144775',
        passportUrl: 'https://www.eneh.im/dp.jpg',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('passportUrl already exists');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('it should return status 400 and error: username is required', (done) => {
      const user = {
        username: '',
        password: 'y7hbsudsunjj#hski',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('username is required');
          done();
        });
    });
    it('it should return status 400 and error: Password is required', (done) => {
      const user = {
        username: 'eneh@mail.com',
        password: '',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Password is required');
          done();
        });
    });
    it('it should return status 400 and error: Incorrect username or password', (done) => {
      const user = {
        username: 'eneh.uk@mail.com',
        password: 'fg67767gfjhkdikld',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Incorrect username or password');
          done();
        });
    });
    it('it should return status 400 and error: Incorrect username or password', (done) => {
      const user = {
        username: 'admin@gmail.com',
        password: 'fg67767gfjhkdikld',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Incorrect username or password');
          done();
        });
    });
    it('it should return status 200 and data: {}', (done) => {
      const user = {
        username: 'admin@gmail.com',
        password: 'admin2019',
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          const info = res.body.data[0];
          userId = info.user.id;
          token = info.token;
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0].token).to.be.a('string');
          expect(res.body.data[0].user).to.be.a('object');
          done();
        });
    });
  });
  
  describe('POST /auth/reset', () => {
    it('it should return status 400 and error: email is required', (done) => {
      const user = {
        email: '',
      };
      chai.request(server)
        .post('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('email is required');
          done();
        });
    });
    it('it should return status 400 and error: Invalid email', (done) => {
      const user = {
        email: 'eneh@mail',
      };
      chai.request(server)
        .post('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Invalid email');
          done();
        });
    });
    it('it should return status 201 and data: [{}]', (done) => {
      const user = {
        email: 'admin@gmail.com',
      };
      chai.request(server)
        .post('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          otp = res.body.data[0].otp;
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql(201);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0].message).to.be.a('string');
          expect(res.body.data[0].email).to.be.a('string');
          done();
        });
    });
    it('it should return status 200 and data: {}', (done) => {
      const user = {
        email: 'admin@gmail.com',
      };
      chai.request(server)
        .post('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0].message).to.be.a('string');
          expect(res.body.data[0].email).to.be.a('string');
          done();
        });
    });
    it('it should return status 404 and error: email not found', (done) => {
      const user = {
        email: 'enehjay@mail.com',
      };
      chai.request(server)
        .post('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('email not found');
          done();
        });
    });
  });

  describe('PATCH /auth/reset', () => {
    it('it should return status 400 and error: email is required', (done) => {
      const user = {
        email: '',
      };
      chai.request(server)
        .patch('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('email is required');
          done();
        });
    });
    it('it should return status 400 and error: Invalid email', (done) => {
      const user = {
        email: 'eneh@mail',
      };
      chai.request(server)
        .patch('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Invalid email');
          done();
        });
    });
    it('it should return status 400 and error: otp is required', (done) => {
      const user = {
        email: 'admin@gmail.com',
        otp: '',
      };
      chai.request(server)
        .patch('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('otp is required');
          done();
        });
    });
    it('it should return status 400 and error: Invalid otp', (done) => {
      const user = {
        email: 'eneh@mail.com',
        otp: 'ghdrhghggf',
      };
      chai.request(server)
        .patch('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Invalid otp');
          done();
        });
    });
    it('it should return status 400 and error: password is required', (done) => {
      const user = {
        email: 'admin@gmail.com',
        otp: '74488488',
        password: '',
      };
      chai.request(server)
        .patch('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('password is required');
          done();
        });
    });
    it('it should return status 400 and error: Password cannot be less than 8 character length', (done) => {
      const user = {
        email: 'eneh@mail.com',
        otp: '94328567',
        password: 'et285',
      };
      chai.request(server)
        .patch('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Password cannot be less than 8 character length');
          done();
        });
    });
    it('it should return status 400 and error: Weak password, a combination of letters, digits or special characters required', (done) => {
      const user = {
        email: 'eneh@mail.com',
        otp: '94328567',
        password: 'etgdhensjnsjsns',
      };
      chai.request(server)
        .patch('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Weak password, a combination of letters, digits or special characters required');
          done();
        });
    });
    it('it should return status 404 and error: otp does not exist', (done) => {
      const user = {
        email: 'admin@gmail.com',
        otp: '943285670987',
        password: 'etgdhens7473883',
      };
      chai.request(server)
        .patch('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('otp does not exist');
          done();
        });
    });
    it('it should return status 200 and data: [{}]', (done) => {
      const user = {
        email: 'admin@gmail.com',
        otp: otp,
        password: 'admin2019',
      };
      chai.request(server)
        .patch('/api/v1/auth/reset')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0].message).to.eql('success');
          done();
        });
    });
  });

  describe('PATCH /auth/previlage/:id', () => {
    it('it should return status 400 and error: User Id is not a number', (done) => {
     
      chai.request(server)
        .patch(`/api/v1/auth/previlage/2ab`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('User Id is not a number');
          done();
        });
    });
    
    it('it should return status 404 and error: User not found', (done) => {
     
      chai.request(server)
        .patch(`/api/v1/auth/previlage/2000`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('User not found');
          done();
        });
    });

    it('it should return status 200 and data: [{message: success}]', (done) => {
     
      chai.request(server)
        .patch(`/api/v1/auth/previlage/${userId2}`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0]).to.be.a('object');
          expect(res.body.data[0].message).to.be.a('string');
          expect(res.body.data[0].message).to.eql('success');
          done();
        });
    });

  });

});

describe('Parties', () => {
  describe('POST /parties', () => {

    it('it should return status 401 and error: User not authenticated', (done) => {
      const party = {
      };
      chai.request(server)
        .post('/api/v1/parties')
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.eql(401);
          expect(res.body.error).to.eql('User not authenticated');
          done();
        });
    });

    it('it should return status 401 and error: Authentication failed', (done) => {
      const party = {
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `jksdksdiukjasplkslkjdskjndskjskjmnjkj`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.status).to.eql(401);
          expect(res.body.error).to.eql('Authentication failed');
          done();
        });
    });

    it('it should return status 403 and error: Not authorized', (done) => {
      const party = { 
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${userToken}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.status).to.eql(403);
          expect(res.body.error).to.eql('Not authorized');
          done();
        });
    });

    it('it should return status 400 and error: name is required', (done) => {
      const party = {
        name: '',
        hqAddress: 'Maitama, Abuja',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('name is required');
          done();
        });
    });

    it('it should return status 400 and error: name cannot be numbers', (done) => {
      const party = {
        name: '64747848388393',
        hqAddress: 'Maitama, Abuja',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('name cannot be numbers');
          done();
        });
    });

    it('it should return status 400 and error: name can only be  combination of words and spaces', (done) => {
      const party = {
        name: 'Action Party6474 922',
        hqAddress: 'amazo drive',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('name can only be  combination of words and spaces');
          done();
        });
    });

    it('it should return status 400 and error: hqAddress is required', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: '',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('hqAddress is required');
          done();
        });
    });

    it('it should return status 400 and error: hqAddress cannot be numbers', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: '66737637738783',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('hqAddress cannot be numbers');
          done();
        });
    });

    it('it should return status 400 and error: Special characters not allowed in Address', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: '66 Mbakwe #@',
        logoUrl: 'https://me.io/logo.png',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Special characters not allowed in Address');
          done();
        });
    });

    it('it should return status 400 and error: logoUrl is required', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: 'Lagos',
        logoUrl: '',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('logoUrl is required');
          done();
        });
    });

    it('it should return status 400 and error: logoUrl is not a valid URL', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: 'Lagos',
        logoUrl: '5665676778',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('logoUrl is not a valid URL');
          done();
        });
    });

    it('it should return status 200 and data: []', (done) => {
      
      chai.request(server)
        .get('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data).to.have.lengthOf(0);
          done();
        });
    });

    it('it should return status 201 and data: {id, name}', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: 'Lagos',
        logoUrl: 'https://res.cloudinary.com/action_hsbunj.jpg',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          partyId = res.body.data.id;
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.name).to.be.a('string');
          expect(res.body.data.name).to.eql('action party');
          done();
        });
    });
    
    it('it should return status 201 and data: {id, name}', (done) => {
      const party = {
        name: 'Peoples Party',
        hqAddress: 'Abuja',
        logoUrl: 'https://res.cloudinary.com/ppl_hsbunj.jpg',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          partyId2 = res.body.data.id;
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.name).to.be.a('string');
          expect(res.body.data.name).to.eql('peoples party');
          done();
        });
    });

    it('it should return status 400 and error: party already exists', (done) => {
      const party = {
        name: 'Action Party',
        hqAddress: 'Lagos',
        logoUrl: 'https://res.cloudinary.com/actio_hsbunj.jpg',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('party already exists');
          done();
        });
    });

    it('it should return status 400 and error: logoUrl already in use', (done) => {
      const party = {
        name: 'Actio Party',
        hqAddress: 'Lagos',
        logoUrl: 'https://res.cloudinary.com/action_hsbunj.jpg',
      };
      chai.request(server)
        .post('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .send(party)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('logoUrl already in use');
          done();
        });
    });

  });

  describe('GET /parties', () => {

    it('it should return status 400 and error: Party Id is not a number', (done) => {
      
      chai.request(server)
        .get('/api/v1/parties/1sd')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Party Id is not a number');
          done();
        });
    });

    it('it should return status 404 and error: No data found for id: 2000', (done) => {
      
      chai.request(server)
        .get('/api/v1/parties/2000')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('No data found for id: 2000');
          done();
        });
    });

    it('it should return status 200 and data: [{id, name}...]', (done) => {
      
      chai.request(server)
        .get('/api/v1/parties')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          partyId = res.body.data[0].id || partyId;
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          done();
        });
    });

    it('it should return status 200 and data: {id, name,...}', (done) => {
      
      chai.request(server)
        .get(`/api/v1/parties/${partyId}`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.id).to.eql(partyId);
          done();
        });
    });

  });

  describe('PATCH /parties', () => {

    it('it should return status 400 and error: id is required', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/ /Action Party')
        .set('x-access-token', `${token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('id is required');
          done();
        });
    });

    it('it should return status 400 and error: id is not a number', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/2as/Action Party')
        .set('x-access-token', `${token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('id is not a number');
          done();
        });
    });

    it('it should return status 400 and error: name is required', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/2/  /')
        .set('x-access-token', `${token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('name is required');
          done();
        });
    });

    it('it should return status 400 and error: name can only be  combination of words and spaces', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/2/hjs34   @#sjhsh')
        .set('x-access-token', `${token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('name can only be  combination of words and spaces');
          done();
        });
    });

    it('it should return status 400 and error: name cannot be numbers', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/2/56787898989')
        .set('x-access-token', `${token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('name cannot be numbers');
          done();
        });
    });

    it('it should return status 404 and error: Party not found', (done) => {
      
      chai.request(server)
        .patch('/api/v1/parties/2000/Morden Party')
        .set('x-access-token', `${token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('Party not found');
          done();
        });
    });

    it('it should return status 200 and data: {id, name}', (done) => {
      
      chai.request(server)
        .patch(`/api/v1/parties/${partyId}/Morden Party`)
        .set('x-access-token', `${token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data.id).to.eql(partyId);
          expect(res.body.data.name).to.eql('morden party');
          done();
        });
    });

  });

  describe('DELETE /parties', () => {

    it('it should return status 400 and error: Party Id is not a number', (done) => {
      
      chai.request(server)
        .delete('/api/v1/parties/1sd')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Party Id is not a number');
          done();
        });
    });

    it('it should return status 404 and error: Party not found', (done) => {
      
      chai.request(server)
        .delete('/api/v1/parties/2000')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('Party not found');
          done();
        });
    });

    it('it should return status 200 and data: {message: Delete successful}', (done) => {
      
      chai.request(server)
        .delete(`/api/v1/parties/${partyId2}`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.message).to.eql('Delete successful');
          done();
        });
    });

  });

});

describe('Offices', () => {
  describe('POST /offices', () => {

    it('it should return status 400 and error: type is required', (done) => {
      const office = {
        type: '',
        name: 'Chairman',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('type is required');
          done();
        });
    });

    it('it should return status 400 and error: type cannot be numbers', (done) => {
      const office = {
        type: '63673676',
        name: 'Chairman',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('type cannot be numbers');
          done();
        });
    });

    it('it should return status 400 and error: Unknown office type', (done) => {
      const office = {
        type: 'National',
        name: 'Chairman',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Unknown office type');
          done();
        });
    });

    it('it should return status 400 and error: name is required', (done) => {
      const office = {
        type: 'Local',
        name: '',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('name is required');
          done();
        });
    });

    it('it should return status 400 and error: name cannot be numbers', (done) => {
      const office = {
        type: 'Local',
        name: '7587484',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('name cannot be numbers');
          done();
        });
    });

    it('it should return status 400 and error: name can only be  combination of words and spaces', (done) => {
      const office = {
        type: 'Local',
        name: 'Mayor of 042',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('name can only be  combination of words and spaces');
          done();
        });
    });

    it('it should return status 200 and data: [{id, type, name}...]', (done) => {
      
      chai.request(server)
        .get('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data).to.have.lengthOf(0);
          done();
        });
    });

    it('it should return status 201 and data: {}', (done) => {
      const office = {
        type: 'Local',
        name: 'Chairman',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .send(office)
        .end((err, res) => {
          officeId = res.body.data.id;

          expect(res).to.have.status(201);
          expect(res.body.status).to.eql(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.type).to.eql('local');
          expect(res.body.data.name).to.eql('chairman');
          done();
        });
    });

    it('it should return status 400 and error: Office already exist', (done) => {
      const office = {
        type: 'Local',
        name: 'Chairman',
      };
      chai.request(server)
        .post('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .send(office)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Office already exist');
          done();
        });
    });

  });

  describe('GET /offices', () => {

    it('it should return status 400 and error: Office Id is not a number', (done) => {
      
      chai.request(server)
        .get('/api/v1/offices/1sd')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Office Id is not a number');
          done();
        });
    });

    it('it should return status 404 and error: No data found for id: 2000', (done) => {
      
      chai.request(server)
        .get('/api/v1/offices/2000')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('No data found for id: 2000');
          done();
        });
    });

    it('it should return status 200 and data: [{id, type, name}...]', (done) => {
      
      chai.request(server)
        .get('/api/v1/offices')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          officeId = res.body.data[0].id || officeId;
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          done();
        });
    });

    it('it should return status 200 and data: {id, name,...}', (done) => {
      
      chai.request(server)
        .get(`/api/v1/offices/${officeId}`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.id).to.eql(officeId);
          done();
        });
    });

  });

  describe('POST /offices/interests', () => {

    it('it should return status 400 and error: office is required', (done) => {
      const payload = {
        office: '',
        party: 3,
      };
      chai.request(server)
        .post('/api/v1/offices/interests')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('office is required');
          done();
        });
    });

    it('it should return status 400 and error: office is not a number', (done) => {
      const payload = {
        office: '1ads',
        party: 3,
      };
      chai.request(server)
        .post('/api/v1/offices/interests')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('office is not a number');
          done();
        });
    });

    it('it should return status 400 and error: party is required', (done) => {
      const payload = {
        office: 3,
        party: '',
      };
      chai.request(server)
        .post('/api/v1/offices/interests')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('party is required');
          done();
        });
    });

    it('it should return status 400 and error: party is not a number', (done) => {
      const payload = {
        office: 3,
        party: '2we',
      };
      chai.request(server)
        .post('/api/v1/offices/interests')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('party is not a number');
          done();
        });
    });

    it('it should return status 201 and data: {office, party, candidate}', (done) => {
      const payload = {
        office: officeId,
        party: partyId,
      };
      chai.request(server)
        .post('/api/v1/offices/interests')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.office).to.eql(officeId);
          expect(res.body.data.party).to.eql(partyId);
          done();
        });
    });

    it('it should return status 400 and error: User has already expressed interest', (done) => {
      const payload = {
        office: officeId,
        party: partyId,
      };
      chai.request(server)
        .post('/api/v1/offices/interests')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('User has already expressed interest');
          done();
        });
    });

    it('it should return status 404 and error: office not found', (done) => {
      const payload = {
        office: 3000,
        party: partyId,
      };
      chai.request(server)
        .post('/api/v1/offices/interests')
        .set('x-access-token', `${userToken}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('office not found');
          done();
        });
    });

    it('it should return status 404 and error: party not found', (done) => {
      const payload = {
        office: officeId,
        party: 3000,
      };
      chai.request(server)
        .post('/api/v1/offices/interests')
        .set('x-access-token', `${userToken}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('party not found');
          done();
        });
    });

  });

  describe('GET /offices/:id/interests', () => {

    it('it should return status 400 and error: Office Id is not a number', (done) => {
      
      chai.request(server)
        .get('/api/v1/offices/1sd/interests')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Office Id is not a number');
          done();
        });
    });

    it('it should return status 200 and data: []', (done) => {
      
      chai.request(server)
        .get(`/api/v1/offices/3000/interests`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data).to.have.lengthOf(0);
          done();
        });
    });

    it('it should return status 200 and data: []', (done) => {
      
      chai.request(server)
        .get(`/api/v1/offices/${officeId}/interests`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0]).to.be.a(`object`);
          done();
        });
    });

  });

  describe('POST /offices/:id/register', () => {

    it('it should return status 400 and error: office is required', (done) => {
      const payload = {
        office: '',
        party: 3,
      };
      chai.request(server)
        .post('/api/v1/offices/2/register')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('office is required');
          done();
        });
    });

    it('it should return status 400 and error: office is not a number', (done) => {
      const payload = {
        office: '1ads',
        party: 3,
      };
      chai.request(server)
        .post('/api/v1/offices/2/register')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('office is not a number');
          done();
        });
    });

    it('it should return status 400 and error: party is required', (done) => {
      const payload = {
        office: 3,
        party: '',
      };
      chai.request(server)
        .post('/api/v1/offices/2/register')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('party is required');
          done();
        });
    });

    it('it should return status 400 and error: party is not a number', (done) => {
      const payload = {
        office: 3,
        party: '2we',
      };
      chai.request(server)
        .post('/api/v1/offices/2/register')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('party is not a number');
          done();
        });
    });

    it('it should return status 400 and error: user Id is not a number', (done) => {
      const payload = {
        office: 3,
        party: 2,
      };
      chai.request(server)
        .post('/api/v1/offices/2ab/register')
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('user Id is not a number');
          done();
        });
    });

    it('it should return status 404 and error: office not found', (done) => {
      const payload = {
        office: 3000,
        party: partyId,
      };
      chai.request(server)
        .post(`/api/v1/offices/${userId}/register`)
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('office not found');
          done();
        });
    });

    it('it should return status 404 and error: party not found', (done) => {
      const payload = {
        office: officeId,
        party: 3000,
      };
      chai.request(server)
        .post(`/api/v1/offices/${userId}/register`)
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('party not found');
          done();
        });
    });

    it('it should return status 404 and error: user not found', (done) => {
      const payload = {
        office: officeId,
        party: partyId,
      };
      chai.request(server)
        .post(`/api/v1/offices/3000/register`)
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('user not found');
          done();
        });
    });

    it('it should return status 201 and data: {office, party, candidate}', (done) => {
      const payload = {
        office: officeId,
        party: partyId,
      };
      chai.request(server)
        .post(`/api/v1/offices/${userId}/register`)
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.eql(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.office).to.eql(officeId);
          expect(res.body.data.party).to.eql(partyId);
          done();
        });
    });

    it('it should return status 400 and error: User is already a candidate', (done) => {
      const payload = {
        office: officeId,
        party: partyId,
      };
      chai.request(server)
        .post(`/api/v1/offices/${userId}/register`)
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('User is already a candidate');
          done();
        });
    });

    it('it should return status 400 and error: office already has a candidate under the same party', (done) => {
      const payload = {
        office: officeId,
        party: partyId,
      };
      chai.request(server)
        .post(`/api/v1/offices/${userId2}/register`)
        .set('x-access-token', `${token}`)
        .send(payload)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('office already has a candidate under the same party');
          done();
        });
    });

  });

  describe('GET /offices/:id/candidates', () => {

    it('it should return status 400 and error: Office Id is not a number', (done) => {
      
      chai.request(server)
        .get('/api/v1/offices/1sd/candidates')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Office Id is not a number');
          done();
        });
    });
    
    it('it should return status 404 and error: No candidate found for office id: 4000', (done) => {
      
      chai.request(server)
        .get(`/api/v1/offices/4000/candidates`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('No candidate found for office id: 4000');
          done();
        });
    });

    it('it should return status 200 and data: [{}, ...]', (done) => {
      
      chai.request(server)
        .get(`/api/v1/offices/${officeId}/candidates`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          candidateId = res.body.data[0].id;

          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0]).to.be.a('object');
          done();
        });
    });

  });

  describe('Votes', () => {
    describe('POST /votes', () => {
  
      it('it should return status 400 and error: office is required', (done) => {
        const payload = {
          office: '',
          candidate: 3,
        };
        chai.request(server)
          .post('/api/v1/votes')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('office is required');
            done();
          });
      });
  
      it('it should return status 400 and error: office is not a number', (done) => {
        const payload = {
          office: '1ads',
          candidate: 3,
        };
        chai.request(server)
          .post('/api/v1/votes')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('office is not a number');
            done();
          });
      });
  
      it('it should return status 400 and error: candidate is required', (done) => {
        const payload = {
          office: 3,
          candidate: '',
        };
        chai.request(server)
          .post('/api/v1/votes')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('candidate is required');
            done();
          });
      });
  
      it('it should return status 400 and error: candidate is not a number', (done) => {
        const payload = {
          office: 3,
          candidate: '2we',
        };
        chai.request(server)
          .post('/api/v1/votes')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('candidate is not a number');
            done();
          });
      });

      it('it should return status 400 and error: Candidate is not running for the specified office', (done) => {
        const payload = {
          office: 3,
          candidate: 6,
        };
        chai.request(server)
          .post('/api/v1/votes')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('Candidate is not running for the specified office');
            done();
          });
      });

      it('it should return status 201 and data: {}', (done) => {
        const payload = {
          office: officeId,
          candidate: candidateId,
        };
        chai.request(server)
          .post('/api/v1/votes')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.status).to.eql(201);
            expect(res.body.data).to.be.a('object');
            done();
          });
      });

      it('it should return status 400 and error: You cannot vote more than once for the same office', (done) => {
        const payload = {
          office: officeId,
          candidate: candidateId,
        };
        chai.request(server)
          .post('/api/v1/votes')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('You cannot vote more than once for the same office');
            done();
          });
      });
  
    });

    describe('GET /votes/candidates', () => {

      it('it should return status 200 and data: [{}, ...]', (done) => {
        
        chai.request(server)
          .get(`/api/v1/votes/candidates`)
          .set('x-access-token', `${token}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.status).to.eql(200);
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a(`object`);
            done();
          });
      });

      it('it should return status 404 and error: No voted candidate found for the user', (done) => {
        
        chai.request(server)
          .get(`/api/v1/votes/candidates`)
          .set('x-access-token', `${userToken}`)
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.status).to.eql(404);
            expect(res.body.error).to.eql('No voted candidate found for the user');
            done();
          });
      });

    });
  
  });

  describe('GET /offices/:id/result', () => {

    it('it should return status 400 and error: Office Id is not a number', (done) => {
      
      chai.request(server)
        .get('/api/v1/offices/1sd/result')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.status).to.eql(400);
          expect(res.body.error).to.eql('Office Id is not a number');
          done();
        });
    });

    it('it should return status 404 and error: No result found for office id: 4000', (done) => {
      
      chai.request(server)
        .get('/api/v1/offices/4000/result')
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.status).to.eql(404);
          expect(res.body.error).to.eql('No result found for office id: 4000');
          done();
        });
    });

    it('it should return status 200 and data: [{}]', (done) => {
      
      chai.request(server)
        .get(`/api/v1/offices/${officeId}/result`)
        .set('x-access-token', `${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0]).to.be.a('object');
          done();
        });
    });

  });

  describe('Petitions', () => {
    describe('POST /petitions', () => {
  
      it('it should return status 400 and error: office is required', (done) => {
        const payload = {
          office: '',
        };
        chai.request(server)
          .post('/api/v1/petitions')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('office is required');
            done();
          });
      });
  
      it('it should return status 400 and error: office is not a number', (done) => {
        const payload = {
          office: 'jjd',
        };
        chai.request(server)
          .post('/api/v1/petitions')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('office is not a number');
            done();
          });
      });
  
      it('it should return status 400 and error: text is required', (done) => {
        const payload = {
          office: 19,
          text: '',
        };
        chai.request(server)
          .post('/api/v1/petitions')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('text is required');
            done();
          });
      });
  
      it('it should return status 400 and error: evidence is required', (done) => {
        const payload = {
          office: 19,
          text: 'Rigging everywhere',
          evidence: '',
        };
        chai.request(server)
          .post('/api/v1/petitions')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('evidence is required');
            done();
          });
      });
  
      it('it should return status 400 and error: Invalid evidence url', (done) => {
        const payload = {
          office: 19,
          text: 'Rigging everywhere',
          evidence: ['pet.com/pt.jpg','64783399393993'],
        };
        chai.request(server)
          .post('/api/v1/petitions')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('Invalid evidence url');
            done();
          });
      });
  
      it('it should return status 201 and data: {id, name}', (done) => {
        const payload = {
          office: officeId,
          text: 'Rigging everywhere',
          evidence: ['pet.com/pt.jpg',],
        };
        chai.request(server)
          .post('/api/v1/petitions')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            partyId = res.body.data.id;
            expect(res).to.have.status(201);
            expect(res.body.status).to.eql(201);
            expect(res.body.data).to.be.a('object');
            expect(res.body.data.text).to.be.a('string');
            expect(res.body.data.text).to.eql('Rigging everywhere');
            done();
          });
      });
  
      it('it should return status 400 and error: Candidate did not run for the specified office', (done) => {
        const payload = {
          office: officeId,
          text: 'Rigging everywhere',
          evidence: ['pet.com/pt.jpg',],
        };
        chai.request(server)
          .post('/api/v1/petitions')
          .set('x-access-token', `${userToken}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('Candidate did not run for the specified office');
            done();
          });
      });
  
      it('it should return status 400 and error: You cannot write petition more than once for the same office', (done) => {
        const payload = {
          office: officeId,
          text: 'Rigging everywhere',
          evidence: ['pet.com/pt.jpg',],
        };
        chai.request(server)
          .post('/api/v1/petitions')
          .set('x-access-token', `${token}`)
          .send(payload)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.status).to.eql(400);
            expect(res.body.error).to.eql('You cannot write petition more than once for the same office');
            done();
          });
      });
  
    });
  
    describe('GET /petitions', () => {
  
      it('it should return status 200 and data: [{id, text...}...]', (done) => {
        
        chai.request(server)
          .get('/api/v1/petitions')
          .set('x-access-token', `${token}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.status).to.eql(200);
            expect(res.body.data).to.be.a('array');
            done();
          });
      });
  
    });
  });
      
    describe('Doc', () => {
      describe('GET /doc', () => {
    
        it('it should return status 200', (done) => {
          
          chai.request(server)
            .get('/api/v1/doc')
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    
      });
      
      describe('GET /', () => {
    
        it('it should return status 200', (done) => {
          
          chai.request(server)
            .get('/')
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    
      });
    });

});
