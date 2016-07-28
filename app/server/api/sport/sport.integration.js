'use strict';

var app = require('../..');
import request from 'supertest';

var newSport;

describe('Sport API:', function() {

  describe('GET /api/sports', function() {
    var sports;

    beforeEach(function(done) {
      request(app)
        .get('/api/sports')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sports = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sports).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/sports', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sports')
        .send({
          name: 'New Sport',
          info: 'This is the brand new sport!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSport = res.body;
          done();
        });
    });

    it('should respond with the newly created sport', function() {
      expect(newSport.name).to.equal('New Sport');
      expect(newSport.info).to.equal('This is the brand new sport!!!');
    });

  });

  describe('GET /api/sports/:id', function() {
    var sport;

    beforeEach(function(done) {
      request(app)
        .get('/api/sports/' + newSport._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sport = res.body;
          done();
        });
    });

    afterEach(function() {
      sport = {};
    });

    it('should respond with the requested sport', function() {
      expect(sport.name).to.equal('New Sport');
      expect(sport.info).to.equal('This is the brand new sport!!!');
    });

  });

  describe('PUT /api/sports/:id', function() {
    var updatedSport;

    beforeEach(function(done) {
      request(app)
        .put('/api/sports/' + newSport._id)
        .send({
          name: 'Updated Sport',
          info: 'This is the updated sport!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSport = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSport = {};
    });

    it('should respond with the updated sport', function() {
      expect(updatedSport.name).to.equal('Updated Sport');
      expect(updatedSport.info).to.equal('This is the updated sport!!!');
    });

  });

  describe('DELETE /api/sports/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sports/' + newSport._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sport does not exist', function(done) {
      request(app)
        .delete('/api/sports/' + newSport._id)
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
