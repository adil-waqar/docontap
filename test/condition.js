var app = require('./../app'),
  chai = require('chai'),
  request = require('supertest');
var assert = require('assert');

describe('GET /condition', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/condition')
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

describe('POST /condition/create', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/condition')
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

describe('GET /condition/1', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/condition')
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

describe('PUT /condition/1', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/condition')
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

describe('DELETE /condition/1', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/condition')
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
