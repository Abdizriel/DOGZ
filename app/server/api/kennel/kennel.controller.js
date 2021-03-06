/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/kennels              ->  index
 * POST    /api/kennels              ->  create
 * GET     /api/kennels/:id          ->  show
 * PUT     /api/kennels/:id          ->  upsert
 * PATCH   /api/kennels/:id          ->  patch
 * DELETE  /api/kennels/:id          ->  destroy
 */

'use strict';

/**
 * @description MongoDB Kennel Model
 * @param Kennel
 */
import Kennel from './kennel.model';

/**
 * @description API Response Utils
 */
import {
  validationError,
  handleError,
  handleEntityNotFound,
  removeEntity,
  patchUpdates,
  respondWithResult
} from '../utils';

/**
 * @function index
 * @description Function that returns all kennels
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function index(req, res) {
  return Kennel.find()
    .populate('owner')
    .populate('dogs')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


/**
 * @function show
 * @description Function that returns single kennel by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function show(req, res) {
  return Kennel.findById(req.params.id)
    .populate('owner')
    .populate('dogs')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function create
 * @description Function that create kennel by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function create(req, res) {
  return Kennel.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * @function upsert
 * @description Function that upserts the given kennel in the DB at the specified ID
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Kennel.findOneAndUpdate(req.params.id, req.body, {
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function patch
 * @description Function that update kennel by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Kennel.findById(req.params.id)
    .exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function destroy
 * @description Function that delete kennel by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function destroy(req, res) {
  return Kennel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
