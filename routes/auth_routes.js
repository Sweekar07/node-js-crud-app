import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.js';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

export { router };
