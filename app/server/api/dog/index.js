'use strict';

import { Router } from 'express';

import * as DogController from './dog.controller';

let router = new Router();

router.get('/', DogController.index);
router.get('/:id', DogController.show);
router.post('/', DogController.create);
router.put('/:id', DogController.update);
router.patch('/:id', DogController.update);
router.delete('/:id', DogController.destroy);

module.exports = router;
