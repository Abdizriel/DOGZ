'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var exhibitionCtrlStub = {
  index: 'exhibitionCtrl.index',
  show: 'exhibitionCtrl.show',
  create: 'exhibitionCtrl.create',
  update: 'exhibitionCtrl.update',
  destroy: 'exhibitionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var exhibitionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './exhibition.controller': exhibitionCtrlStub
});

describe('Exhibition API Router:', function() {

  it('should return an express router instance', function() {
    expect(exhibitionIndex).to.equal(routerStub);
  });

  describe('GET /api/exhibitions', function() {

    it('should route to exhibition.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'exhibitionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/exhibitions/:id', function() {

    it('should route to exhibition.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'exhibitionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/exhibitions', function() {

    it('should route to exhibition.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'exhibitionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/exhibitions/:id', function() {

    it('should route to exhibition.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'exhibitionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/exhibitions/:id', function() {

    it('should route to exhibition.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'exhibitionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/exhibitions/:id', function() {

    it('should route to exhibition.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'exhibitionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
