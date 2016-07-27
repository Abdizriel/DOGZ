'use strict';

import { Router } from 'express';

import * as KennelController from './kennel.controller';

let router = new Router();

router.get('/', KennelController.index);
router.get('/:id', KennelController.show);
router.post('/', KennelController.create);
router.put('/:id', KennelController.update);
router.patch('/:id', KennelController.update);
router.delete('/:id', KennelController.destroy);

module.exports = router;
