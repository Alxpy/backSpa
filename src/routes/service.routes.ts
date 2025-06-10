// src/routes/service.routes.ts
import { Router } from 'express';
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} from '../controllers/service.controller';
import { isAuth } from '../middleware/auth';

const router = Router();

router.post('/', isAuth, createService);
router.get('/', getServices);
router.get('/:id', getServiceById);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;