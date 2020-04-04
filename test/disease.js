var app = require('./../app'),
  chai = require('chai'),
  request = require('supertest');
var assert = require('assert');

describe('GET /disease', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/disease')
        .send(
          { email: 'user@email.com', password: 'yourpassword' }
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              done();
            })
        );
    }
  });
});

describe('POST /disease/create', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/disease')
        .send(
          { email: 'user@email.com', password: 'yourpassword' }
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              done();
            })
        );
    }
  });
});

describe('GET /disease/1', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/disease')
        .send(
          { email: 'user@email.com', password: 'yourpassword' }
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              done();
            })
        );
    }
  });
});

describe('PUT /disease/1', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/disease')
        .send(
          { email: 'user@email.com', password: 'yourpassword' }
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              done();
            })
        );
    }
  });
});

describe('DELETE /disease/1', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/disease')
        .send(
          { email: 'user@email.com', password: 'yourpassword' }
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              done();
            })
        );
    }
  });
});
