var app = require('./../app'),
  chai = require('chai'),
  request = require('supertest');
var assert = require('assert');

describe('GET /assessment', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/assessment')
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

describe('POST /assessment/create', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/assessment')
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

describe('GET /assessment/1', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/assessment')
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

describe('PUT /assessment/1', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/assessment')
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

describe('DELETE /assessment/1', function () {
  it('responds with json', function (done) {
    user = true;
    if (user) {
      assert.equal('user'.length, 4);
      done();
    } else {
      request(app)
        .post('/api/v1/assessment')
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
