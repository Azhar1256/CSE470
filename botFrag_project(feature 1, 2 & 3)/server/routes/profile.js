import express from 'express';

import { getProfile, createProfile, updateProfile } from '../controllers/profile.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getProfile);
router.post('/',auth,  createProfile);
router.patch('/:id', auth, updateProfile);


export default router;