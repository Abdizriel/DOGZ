'use strict';

var app = require('../..');
import request from 'supertest';

var newDog;

describe('Dog API:', function() {

  describe('GET /api/dogs', function() {
    var dogs;

    beforeEach(function(done) {
      request(app)
        .get('/api/dogs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dogs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(dogs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/dogs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dogs')
        .send({
          name: 'New Dog',
          info: 'This is the brand new dog!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDog = res.body;
          done();
        });
    });

    it('should respond with the newly created dog', function() {
      expect(newDog.name).to.equal('New Dog');
      expect(newDog.info).to.equal('This is the brand new dog!!!');
    });

  });

  describe('GET /api/dogs/:id', function() {
    var dog;

    beforeEach(function(done) {
      request(app)
        .get('/api/dogs/' + newDog._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dog = res.body;
          done();
        });
    });

    afterEach(function() {
      dog = {};
    });

    it('should respond with the requested dog', function() {
      expect(dog.name).to.equal('New Dog');
      expect(dog.info).to.equal('This is the brand new dog!!!');
    });

  });

  describe('PUT /api/dogs/:id', function() {
    var updatedDog;

    beforeEach(function(done) {
      request(app)
        .put('/api/dogs/' + newDog._id)
        .send({
          name: 'Updated Dog',
          info: 'This is the updated dog!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDog = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDog = {};
    });

    it('should respond with the updated dog', function() {
      expect(updatedDog.name).to.equal('Updated Dog');
      expect(updatedDog.info).to.equal('This is the updated dog!!!');
    });

  });

  describe('DELETE /api/dogs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/dogs/' + newDog._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when dog does not exist', function(done) {
      request(app)
        .delete('/api/dogs/' + newDog._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
