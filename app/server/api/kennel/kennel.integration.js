'use strict';

var app = require('../..');
import request from 'supertest';

var newKennel;

describe('Kennel API:', function() {

  describe('GET /api/kennels', function() {
    var kennels;

    beforeEach(function(done) {
      request(app)
        .get('/api/kennels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          kennels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(kennels).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/kennels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/kennels')
        .send({
          name: 'New Kennel',
          info: 'This is the brand new kennel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newKennel = res.body;
          done();
        });
    });

    it('should respond with the newly created kennel', function() {
      expect(newKennel.name).to.equal('New Kennel');
      expect(newKennel.info).to.equal('This is the brand new kennel!!!');
    });

  });

  describe('GET /api/kennels/:id', function() {
    var kennel;

    beforeEach(function(done) {
      request(app)
        .get('/api/kennels/' + newKennel._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          kennel = res.body;
          done();
        });
    });

    afterEach(function() {
      kennel = {};
    });

    it('should respond with the requested kennel', function() {
      expect(kennel.name).to.equal('New Kennel');
      expect(kennel.info).to.equal('This is the brand new kennel!!!');
    });

  });

  describe('PUT /api/kennels/:id', function() {
    var updatedKennel;

    beforeEach(function(done) {
      request(app)
        .put('/api/kennels/' + newKennel._id)
        .send({
          name: 'Updated Kennel',
          info: 'This is the updated kennel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedKennel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedKennel = {};
    });

    it('should respond with the updated kennel', function() {
      expect(updatedKennel.name).to.equal('Updated Kennel');
      expect(updatedKennel.info).to.equal('This is the updated kennel!!!');
    });

  });

  describe('DELETE /api/kennels/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/kennels/' + newKennel._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when kennel does not exist', function(done) {
      request(app)
        .delete('/api/kennels/' + newKennel._id)
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
