// src/routes/auth.routes.ts
import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { isAuth } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', isAuth, getProfile);

export default router;