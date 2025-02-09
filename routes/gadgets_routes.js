// to let users use functions delcared in controller/gadgets to be used by here.

import { getAllGadgets, createGadget, updateGadget, deleteGadget } from "../controllers/gadget.js";
import express from 'express';

const router = express.Router();

// CRUD routes
router.get('/gadgets', getAllGadgets);
router.post('/gadgets', createGadget);
router.patch('/gadgets/:id', updateGadget);
router.delete('/gadgets/:id', deleteGadget);

export { router }
