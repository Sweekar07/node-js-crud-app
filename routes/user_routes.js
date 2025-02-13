import express from 'express';
import UserController  from '../controllers/user.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router()

/**
 * @swagger
 * /getUsers:
 *   get:
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error retrieving users
 */
router.get('/getUsers', authenticateToken, UserController.getAllUsers)

export { router }
