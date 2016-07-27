'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var kennelCtrlStub = {
  index: 'kennelCtrl.index',
  show: 'kennelCtrl.show',
  create: 'kennelCtrl.create',
  update: 'kennelCtrl.update',
  destroy: 'kennelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var kennelIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './kennel.controller': kennelCtrlStub
});

describe('Kennel API Router:', function() {

  it('should return an express router instance', function() {
    expect(kennelIndex).to.equal(routerStub);
  });

  describe('GET /api/kennels', function() {

    it('should route to kennel.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'kennelCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/kennels/:id', function() {

    it('should route to kennel.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'kennelCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/kennels', function() {

    it('should route to kennel.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'kennelCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/kennels/:id', function() {

    it('should route to kennel.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'kennelCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/kennels/:id', function() {

    it('should route to kennel.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'kennelCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/kennels/:id', function() {

    it('should route to kennel.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'kennelCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
