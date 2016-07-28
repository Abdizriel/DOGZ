/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/exhibitions              ->  index
 * POST    /api/exhibitions              ->  create
 * GET     /api/exhibitions/:id          ->  show
 * PUT     /api/exhibitions/:id          ->  upsert
 * PATCH   /api/exhibitions/:id          ->  patch
 * DELETE  /api/exhibitions/:id          ->  destroy
 */

'use strict';

/**
 * @description MongoDB Exhibition Model
 * @param Exhibition
 */
import Exhibition from './exhibition.model';

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
 * @description Function that returns all exhibitions
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function index(req, res) {
  return Exhibition.find()
    .populate('judge')
    .populate('dogs.dog')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


/**
 * @function show
 * @description Function that returns single exhibition by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function show(req, res) {
  return Exhibition.findById(req.params.id)
    .populate('judge')
    .populate('dogs.dog')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function create
 * @description Function that create exhibition by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function create(req, res) {
  return Exhibition.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * @function upsert
 * @description Function that upserts the given exhibition in the DB at the specified ID
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Exhibition.findOneAndUpdate(req.params.id, req.body, {
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
 * @description Function that update exhibition by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Exhibition.findById(req.params.id)
    .exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function destroy
 * @description Function that delete exhibition by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function destroy(req, res) {
  return Exhibition.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
