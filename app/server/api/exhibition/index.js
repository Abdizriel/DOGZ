'use strict';

import { Router } from 'express';

import * as ExhibitionController from './exhibition.controller';

let router = new Router();

router.get('/', ExhibitionController.index);
router.get('/:id', ExhibitionController.show);
router.post('/', ExhibitionController.create);
router.put('/:id', ExhibitionController.upsert);
router.patch('/:id', ExhibitionController.patch);
router.delete('/:id', ExhibitionController.destroy);

module.exports = router;
