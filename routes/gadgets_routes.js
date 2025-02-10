// to let users use functions delcared in controller/gadgets to be used by here.

import { getAllGadgets, createGadget, updateGadget, deleteGadget, selfDestructGadget } from "../controllers/gadget.js";
import { authenticateToken } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

// CRUD routes
router.get('/gadgets', authenticateToken, getAllGadgets);
router.post('/gadgets', authenticateToken, createGadget);
router.patch('/gadgets/:id', authenticateToken, updateGadget);
router.delete('/gadgets/:id', authenticateToken, deleteGadget);
router.post('/gadgets/:id/self-destruct', authenticateToken, selfDestructGadget);

export { router }
