import express from 'express';
import AuthController from '../controllers/auth.js';

const router = express.Router();

// Registration route
router.post('/register', AuthController.registerUser);

// Login route
router.post('/login', AuthController.loginUser);

export { router };
