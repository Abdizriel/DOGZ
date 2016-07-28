/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sports              ->  index
 * POST    /api/sports              ->  create
 * GET     /api/sports/:id          ->  show
 * PUT     /api/sports/:id          ->  upsert
 * PATCH   /api/sports/:id          ->  patch
 * DELETE  /api/sports/:id          ->  destroy
 */

'use strict';

/**
 * @description MongoDB Sport Model
 * @param Sport
 */
import Sport from './sport.model';

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
 * @description Function that returns all sports
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function index(req, res) {
  return Sport.find()
    .populate('judges')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


/**
 * @function show
 * @description Function that returns single sport by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function show(req, res) {
  return Sport.findById(req.params.id)
    .populate('judges')
    .populate('dogs.dog')
    .populate('dogs.guide')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function create
 * @description Function that create sport by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function create(req, res) {
  return Sport.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * @function upsert
 * @description Function that upserts the given sport in the DB at the specified ID
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Sport.findOneAndUpdate(req.params.id, req.body, {
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
 * @description Function that update sport by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Sport.findById(req.params.id)
    .exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function destroy
 * @description Function that delete sport by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function destroy(req, res) {
  return Sport.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
