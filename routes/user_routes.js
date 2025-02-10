import express from 'express';
import { getAllUsers } from '../controllers/user.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router()

router.get('/getUsers', authenticateToken, getAllUsers)

export { router }
