// to let users use functions delcared in controller/gadgets to be used by here.

import { controller } from "../controllers/gadget.js";
import { authenticateToken } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

// CRUD routes

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Get all gadgets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter gadgets by status
 *     responses:
 *       200:
 *         description: A list of gadgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gadget'
 *       500:
 *         description: Error retrieving gadgets
 */
router.get('/gadgets', authenticateToken, controller.getAllGadgets);

/**
 * @swagger
 * /gadgets:
 *   post:
 *     summary: Create a new gadget
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gadget created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating gadget
 */
router.post('/gadgets', authenticateToken, controller.createGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update a gadget
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error updating gadget
 */
router.patch('/gadgets/:id', authenticateToken, controller.updateGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   delete:
 *     summary: Decommission a gadget
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: Gadget ID
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 *       500:
 *         description: Error decommissioning gadget
 */
router.delete('/gadgets/:id', authenticateToken, controller.deleteGadget);

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Self-destruct a gadget
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confirmationCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gadget self-destruct sequence completed
 *       400:
 *         description: Invalid confirmation code
 *       500:
 *         description: Error self-destructing gadget
 */
router.post('/gadgets/:id/self-destruct', authenticateToken, controller.selfDestructGadget);

export { router }
