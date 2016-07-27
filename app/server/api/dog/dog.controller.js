/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dogs              ->  index
 * POST    /api/dogs              ->  create
 * GET     /api/dogs/:id          ->  show
 * PUT     /api/dogs/:id          ->  update
 * DELETE  /api/dogs/:id          ->  destroy
 */

'use strict';

/**
 * @description MongoDB Dog Model
 * @param Dog
 */
import Dog from './dog.model';

/**
 * @description API Response Utils
 */
import {
  validationError,
  handleError,
  handleEntityNotFound,
  removeEntity,
  saveUpdates,
  respondWithResult
} from '../utils';

/**
 * @function index
 * @description Function that returns all dogs
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function index(req, res) {
  return Dog.find()
    .populate('kennel')
    .populate('owner')
    .populate('siblings')
    .populate('offspring')
    .then(respondWithResult(res))
    .catch(handleError(res));
}


/**
 * @function show
 * @description Function that returns single dog by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function show(req, res) {
  return Dog.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function create
 * @description Function that create dog by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function create(req, res) {
  return Dog.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * @function update
 * @description Function that update dog by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Dog.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function destroy
 * @description Function that delete dog by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function destroy(req, res) {
  return Dog.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
