import express from 'express';
import UserController  from '../controllers/user.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router()

router.get('/getUsers', authenticateToken, UserController.getAllUsers)

export { router }
