// src/routes/pet.routes.ts
import { Router } from 'express';
import { 
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet
} from '../controllers/pet.controller';

const router = Router();

router.post('/', createPet);
router.get('/', getPets);
router.get('/:id', getPetById);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;