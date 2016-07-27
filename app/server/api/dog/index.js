'use strict';

import { Router } from 'express';

import * as DogController from './dog.controller';

let router = new Router();

router.get('/', DogController.index);
router.get('/:id', DogController.show);
router.post('/', DogController.create);
router.put('/:id', DogController.upsert);
router.patch('/:id', DogController.patch);
router.delete('/:id', DogController.destroy);
router.get('/pedigree/:id', DogController.pedigree);

module.exports = router;
