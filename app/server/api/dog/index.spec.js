'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dogCtrlStub = {
  index: 'dogCtrl.index',
  show: 'dogCtrl.show',
  create: 'dogCtrl.create',
  update: 'dogCtrl.update',
  destroy: 'dogCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dogIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './dog.controller': dogCtrlStub
});

describe('Dog API Router:', function() {

  it('should return an express router instance', function() {
    expect(dogIndex).to.equal(routerStub);
  });

  describe('GET /api/dogs', function() {

    it('should route to dog.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'dogCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/dogs/:id', function() {

    it('should route to dog.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'dogCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/dogs', function() {

    it('should route to dog.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'dogCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/dogs/:id', function() {

    it('should route to dog.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'dogCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/dogs/:id', function() {

    it('should route to dog.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'dogCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/dogs/:id', function() {

    it('should route to dog.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'dogCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
