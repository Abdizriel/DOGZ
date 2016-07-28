'use strict';

var app = require('../..');
import request from 'supertest';

var newExhibition;

describe('Exhibition API:', function() {

  describe('GET /api/exhibitions', function() {
    var exhibitions;

    beforeEach(function(done) {
      request(app)
        .get('/api/exhibitions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          exhibitions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(exhibitions).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/exhibitions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/exhibitions')
        .send({
          name: 'New Exhibition',
          info: 'This is the brand new exhibition!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newExhibition = res.body;
          done();
        });
    });

    it('should respond with the newly created exhibition', function() {
      expect(newExhibition.name).to.equal('New Exhibition');
      expect(newExhibition.info).to.equal('This is the brand new exhibition!!!');
    });

  });

  describe('GET /api/exhibitions/:id', function() {
    var exhibition;

    beforeEach(function(done) {
      request(app)
        .get('/api/exhibitions/' + newExhibition._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          exhibition = res.body;
          done();
        });
    });

    afterEach(function() {
      exhibition = {};
    });

    it('should respond with the requested exhibition', function() {
      expect(exhibition.name).to.equal('New Exhibition');
      expect(exhibition.info).to.equal('This is the brand new exhibition!!!');
    });

  });

  describe('PUT /api/exhibitions/:id', function() {
    var updatedExhibition;

    beforeEach(function(done) {
      request(app)
        .put('/api/exhibitions/' + newExhibition._id)
        .send({
          name: 'Updated Exhibition',
          info: 'This is the updated exhibition!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedExhibition = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedExhibition = {};
    });

    it('should respond with the updated exhibition', function() {
      expect(updatedExhibition.name).to.equal('Updated Exhibition');
      expect(updatedExhibition.info).to.equal('This is the updated exhibition!!!');
    });

  });

  describe('DELETE /api/exhibitions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/exhibitions/' + newExhibition._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when exhibition does not exist', function(done) {
      request(app)
        .delete('/api/exhibitions/' + newExhibition._id)
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
