'use strict';

import { Router } from 'express';

import * as SportController from './sport.controller';

let router = new Router();

router.get('/', SportController.index);
router.get('/:id', SportController.show);
router.post('/', SportController.create);
router.put('/:id', SportController.upsert);
router.patch('/:id', SportController.patch);
router.delete('/:id', SportController.destroy);

module.exports = router;
