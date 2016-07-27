import jsonpatch from 'fast-json-patch';

/**
 * @function respondWithResult
 * @description Function that returns response with data
 * @param {Object} res - Express Framework Response Object
 * @param {Number=} statusCode - Response status code
 */
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return entity => {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

/**
 * @function patchUpdates
 * @description Function that updates entity with new data
 * @param {Object} patches - Updated data
 */

function patchUpdates(patches) {
  return entity => {
    try {
      jsonpatch.apply(entity, patches, true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

/**
 * @function removeEntity
 * @description Function that remove entity from Schema
 * @param {Object} res - Express Framework Response Object
 */
function removeEntity(res) {
  return entity => {
    if (entity) {
      return entity.remove()
          .then(() => {
          res.status(204).end();
    });
    }
  };
}

/**
 * @function handleEntityNotFound
 * @description Function that handle entity not found respond
 * @param {Object} res - Express Framework Response Object
 */
function handleEntityNotFound(res) {
  return entity => {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

/**
 * @function handleError
 * @description Function that returns response with error details
 * @param {Object} res - Express Framework Response Object
 * @param {Number=} statusCode - Response status code
 */
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return err => res.status(statusCode).send(err);
}

/**
 * @function validationError
 * @description Function that returns response with model validation error details
 * @param {Object} res - Express Framework Response Object
 * @param {Number=} statusCode - Response status code
 */
function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return err => res.status(statusCode).json(err);
}

export {
  validationError,
  handleError,
  handleEntityNotFound,
  removeEntity,
  patchUpdates,
  respondWithResult
}
