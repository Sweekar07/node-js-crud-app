// to let users use functions delcared in controller/gadgets to be used by here.

import { controller } from "../controllers/gadget.js";
import { authenticateToken } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

// CRUD routes
router.get('/gadgets', authenticateToken, controller.getAllGadgets);
router.post('/gadgets', authenticateToken, controller.createGadget);
router.patch('/gadgets/:id', authenticateToken, controller.updateGadget);
router.delete('/gadgets/:id', authenticateToken, controller.deleteGadget);
router.post('/gadgets/:id/self-destruct', authenticateToken, controller.selfDestructGadget);

export { router }
