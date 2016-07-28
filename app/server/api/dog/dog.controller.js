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
import Exhibition from '../exhibition/exhibition.model';

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
 * @description Function that returns all dogs
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function index(req, res) {
  return Dog.find()
    .populate('kennel')
    .populate('owner')
    .exec()
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
    .populate('kennel')
    .populate('owner')
    .populate('siblings')
    .populate('offspring')
    .populate('exhibitions')
    .exec()
    .then(handleEntityNotFound(res))
    .then(getExhibitions)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function getExhibitions(entity) {
  if(entity) {
    return Exhibition.populate(entity.exhibitions, {
      path: 'judge dogs.dog'
    })
      .then(exhibitions => {
        entity.exhibitions = exhibitions;
        return entity;
      });
  }
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
 * @function upsert
 * @description Function that upserts the given dog in the DB at the specified ID
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Dog.findOneAndUpdate(req.params.id, req.body, {
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
 * @description Function that update dog by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Dog.findById(req.params.id)
    .exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
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

/**
 * @function pedigree
 * @description Function that get dog pedigree tree
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function pedigree(req, res) {
  Dog.findById(req.params.id)
    .populate('sire')
    .populate('dam')
    .exec()
    .then(handleEntityNotFound(res))
    .then(({sire, dam}) => {
      const leftTree = sire ? getPedigreeDogDetails(sire) : {};
      const rightTree = dam ? getPedigreeDogDetails(dam) : {};
      return { leftTree, rightTree};
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function getPedigreeDogDetails
 * @description Function that get needed dog details for pedigree tree
 * @param {String} _id - Dog Id
 * @param {String} fullName - Dog full name
 * @param {Date} birth - Dog date of birth
 * @param {String} sex - Dog sex
 * @param {Array} images - Dog sex
 * @param {Object} sire - Dog sire
 * @param {Object} dam - Dog dam
 */
function getPedigreeDogDetails({_id, fullName, birth, sex, images, sire, dam}) {
  let newImages = images.filter(image => image.isPedigree);
  const image = newImages.length ? newImages[0].src : '';
  return {
    _id,
    fullName,
    birth,
    sex,
    image,
    sire,
    dam
  };
}
