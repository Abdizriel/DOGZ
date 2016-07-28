'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sportCtrlStub = {
  index: 'sportCtrl.index',
  show: 'sportCtrl.show',
  create: 'sportCtrl.create',
  update: 'sportCtrl.update',
  destroy: 'sportCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sportIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sport.controller': sportCtrlStub
});

describe('Sport API Router:', function() {

  it('should return an express router instance', function() {
    expect(sportIndex).to.equal(routerStub);
  });

  describe('GET /api/sports', function() {

    it('should route to sport.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sportCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/sports/:id', function() {

    it('should route to sport.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sportCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/sports', function() {

    it('should route to sport.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sportCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/sports/:id', function() {

    it('should route to sport.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sportCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sports/:id', function() {

    it('should route to sport.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sportCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sports/:id', function() {

    it('should route to sport.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sportCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
