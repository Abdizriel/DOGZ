'use strict';

angular
  .module('dogzApp')
  .factory('DogService', DogService);

DogService.$inject = ['$http', 'APIUtilService'];

/**
 * Create a Dog API Service.
 * @function DogService
 * @param {Object} $http - Angular service that facilitates communication with the remote HTTP
 * @param {Object} APIUtilService - API Utility services
 * @returns {Object} service - All API Dog services
 */
function DogService($http, APIUtilService) {

  // Service base url
  const urlBase = '/api/dogs';
  const { handleSuccess, handleError } = APIUtilService;

  // Service list
  let service = {};

  service.getDogs = getDogs;
  service.getDog = getDog;
  service.getPedigree = getPedigree;
  service.createDog = createDog;
  service.updateDog = updateDog;
  service.deleteDog = deleteDog;

  return service;

  /**
   * Gets all dogs from BE.
   * @function getDogs
   * @returns {Promise}
   */
  function getDogs () {
    return $http.get(urlBase)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Get single dog by id from BE.
   * @function getDog
   * @param {String} id - Dog ID
   * @returns {Promise}
   */
  function getDog (id) {
    return $http.get(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Get dog pedigree by id from BE.
   * @function getPedigree
   * @param {String} id - Dog ID
   * @returns {Promise}
   */
  function getPedigree (id) {
    return $http.get(urlBase + '/pedigree/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send new dog data to BE.
   * @function getDog
   * @param {Object} dog - New dog data
   * @returns {Promise}
   */
  function createDog (dog) {
    return $http.post(urlBase, dog)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send updated dog data to BE.
   * @function getDog
   * @param {Object} dog - Updated dog data
   * @returns {Promise}
   */
  function updateDog (dog) {
    return $http.put(urlBase + '/' + dog._id, dog)
      .then(handleSuccess)
      .catch(handleError);
  }

  /**
   * Send delete dog request by id to BE.
   * @function DeleteDog
   * @param {String} id - Dog ID
   * @returns {Promise}
   */
  function deleteDog (id) {
    return $http.delete(urlBase + '/' + id)
      .then(handleSuccess)
      .catch(handleError);
  }

}
