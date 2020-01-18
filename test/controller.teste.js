const chai = require('chai');
const chaiHttp = require('chai-http');

const { HTTP_STATUS } = require('../configuration');
const server = require('../index');

chai.use(chaiHttp);
const { expect } = chai;
describe('OAUTH TEST', () => {
  it('TESTE SINGUP EMPTY CONSTROLLER', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      });
    return done();
  });
  it('TESTE SINGUP MISSING NOME', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .send({
        email: 'email@teste.com',
        senha: 'teste123',
        telefones: [
          {
            numero: '981910691',
            ddd: '12',
          },
          {
            numero: '123456789',
            ddd: '11',
          },
        ],
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      });
    return done();
  });
  it('TESTE SINGUP MISSING EMAIL', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .send({
        nome: 'matheus',
        senha: 'matheus123',
        telefones: [
          {
            numero: '981910691',
            ddd: '12',
          },
          {
            numero: '123456789',
            ddd: '11',
          },
        ],
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      });
    return done();
  });
  it('TESTE SINGUP MISSING SENHA', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .send({
        nome: 'matheus',
        senha: 'matheus123',
        telefones: [
          {
            numero: '981910691',
            ddd: '12',
          },
          {
            numero: '123456789',
            ddd: '11',
          },
        ],
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      });
    return done();
  });
  it('TESTE SINGUP MISSING OBJECT FROM TELEPHONE', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .send({
        nome: 'matheus',
        senha: 'matheus123',
        telefones: [],
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      });
    return done();
  });
  it('TESTE SINGUP MISSING TELEPHONE', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .send({
        nome: 'teste',
        email: 'email@teste.com',
        senha: 'teste123',
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      });
    return done();
  });
  it('TESTE SINGUP', (done) => {
    chai.request(server)
      .post('/api/v1/users/signup')
      .send({
        nome: 'teste',
        email: 'email@teste.com',
        senha: 'teste123',
        telefones: [
          {
            numero: '981910691',
            ddd: '12',
          },
          {
            numero: '123456789',
            ddd: '11',
          },
        ],
      })
      .end((err, response) => {
        if (err) done(err);
        expect(err).to.be(null);
        expect(response).to.have.status(HTTP_STATUS.CREATED);
      });
    return done();
  });
  it('TESTE SIGNIN MISSING EMAIL', (done) => {
    chai.request(server)
      .post('/api/v1/users/signin')
      .send({
        senha: 'teste123',
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      });
    return done();
  });
  it('TESTE SIGNIN MISSING SENHA', (done) => {
    chai.request(server)
      .post('/api/v1/users/signin')
      .send({
        email: 'email@teste.com',
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.BAD_REQUEST);
      });
    return done();
  });
  it('TESTE SIGNIN TRUE', (done) => {
    chai.request(server)
      .post('/api/v1/users/signin')
      .send({
        email: 'email@teste.com',
        senha: 'teste123',
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.OK);
      });
    return done();
  });
  it('TESTE SIGNIN', (done) => {
    chai.request(server)
      .post('/api/v1/users/signin')
      .send({
        email: 'email@teste.com',
        senha: 'teste123',
      })
      .end((err, response) => {
        if (err) done(err);
        expect(response).to.have.status(HTTP_STATUS.OK);
      });
    return done();
  });
  it('TESTE SIGNIN GET USER', (done) => {
    chai.request(server)
      .post('/api/v1/users/signin')
      .send({
        email: 'email@teste.com',
        senha: 'teste123',
      })
      .end((err, response) => {
        if (err) done(err);
        chai.request(`/api/v1/users/${response.body.id}`)
          .set('Authorization', `Bearer ${response.body.token}`)
          .end((error, resp) => {
            if (error) done(error);
            expect(resp).to.have.status(HTTP_STATUS.OK);
            expect(err).to.be(null);
          });
      });
    return done();
  });
});
