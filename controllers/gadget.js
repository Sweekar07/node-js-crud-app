// We will define the functions here

import dotenv from 'dotenv';
import { Gadgets } from '../models/gadget.js';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '../enums/status.js'
import { generateCodename, generateSuccessProbability } from '../helpers/gadgetHelpers.js'

dotenv.config();

// Custom error class for better error handling
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

// Crud Operations
class GadgetController  {       // class-based structure for better organization

    // Validate gadget existence
    static async getGadgetOrFail(id) {
        const gadget = await Gadgets.findByPk(id);
        console.log("Gadget foun/not found: ", gadget);
        if (!gadget) {
            throw new ApiError(404, `Gadget not found with id: ${id}`);
        }
        return gadget;  
    }

    // Get all gadgets with optional status filter
    static async getAllGadgets(req, res, next) {
        try {
            const { status } = req.query;
            const where = status ? { status } : {};
            
            const gadgets = await Gadgets.findAll({ where });
            res.status(200).json({ gadgets });
        } catch (error) {
            console.error('Error in getAllGadgets:', error);
            // Convert generic errors to ApiError
            if (!(error instanceof ApiError)) {
                error = new ApiError(500, 'Error retrieving gadgets');
            }
            // Send error response directly
            res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
                ...(process.env.NODE_ENV === 'DEV' && { stack: error.stack })
            });
        }
    }

    // Get single gadget by ID
    static async getGadgetById (req, res) {
        try {
            const gadget = await GadgetController.getGadgetOrFail(req.params.id);
            res.status(200).json({ gadget });
        } catch (error) {
            console.log('Error in getAllGadgets:', error);
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({
                status: error.status || 'error',
                message: error.message || 'Error retrieving gadgets'
            });
        }
    }

    // Create new gadget
    static async createGadget (req, res) {
        try {
            const { name } = req.body;
            
            if (!name || typeof name !== 'string' || name.trim().length === 0) {
                throw new ApiError(400, 'Valid gadget name is required');
            }

            const gadget = await Gadgets.create({
                id: uuidv4(),
                name: name.trim(),
                codename: generateCodename(),
                status: Status.AVAILABLE,
                successProbability: generateSuccessProbability(),
                decommissionedTimestamp: null
            });

            res.status(201).json({
                message: 'Gadget created successfully!',
                gadget
            });
        } catch (error) {
            console.error('Error in createGadget:', error);
            if (!(error instanceof ApiError)) {
                error = new ApiError(500, 'Error creating gadget');
            }
            res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
                ...(process.env.NODE_ENV === 'DEV' && { stack: error.stack })
            });
        }
    }

    // Update gadget
    static async updateGadget (req, res) {
        try {
            const { name, status } = req.body;
            
            // Validate inputs
            if (!name || typeof name !== 'string' || name.trim().length === 0) {
                const error = new ApiError(400, 'Valid gadget name is required');
                throw error; 
            }

            if (!Object.values(Status).includes(status)) {
                const error = new ApiError(400, 'Invalid status value');
                throw error;
            }

            const gadget = await GadgetController.getGadgetOrFail(req.params.id);
            
            // Update and save
            Object.assign(gadget, {
                name: name.trim(),
                status
            });
            
            await gadget.save();
            
            res.status(200).json({
                message: 'Gadget updated successfully!',
                gadget
            });
        } catch (error) {
            console.error('Error in updateGadget:', error);
            if (!(error instanceof ApiError)) {
                error = new ApiError(500, 'Error updating gadget');
            }
            res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
                ...(process.env.NODE_ENV === 'DEV' && { stack: error.stack })
            });
        }
    }

    // Delete (decommission) gadget
    static async deleteGadget (req, res){
        try {
            const gadget = await GadgetController.getGadgetOrFail(req.params.id);
            
            Object.assign(gadget, {
                status: Status.DECOMMISSIONED,
                decommissionedTimestamp: new Date().toISOString()
            });
            
            await gadget.save();
            
            res.status(200).json({
                message: 'Gadget decommissioned successfully!',
                gadget
            });
        } catch (error) {
            console.error('Error in delete Gadget:', error);
            if (!(error instanceof ApiError)) {
                error = new ApiError(500, 'Error deleting gadget');
            }
            res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
                ...(process.env.NODE_ENV === 'DEV' && { stack: error.stack })
            });
        }
    } 

    // Self-destruct gadget
    static async selfDestructGadget(req, res) {
        try {
            const { confirmationCode } = req.body;
            
            if (confirmationCode !== process.env.RANDOM_PIN) {
                const error = new ApiError(400, 'Invalid confirmation code');
                throw error;
            }

            const gadget = await GadgetController.getGadgetOrFail(req.params.id);
            
            Object.assign(gadget, {
                status: Status.DESTROYED,
                decommissionedTimestamp: new Date().toISOString()
            });
            
            await gadget.save();
            
            res.status(200).json({
                message: 'Gadget self-destruct sequence completed!',
                gadget
            });
        } catch (error) {
            console.error('Error in self destruct route:', error);
            if (!(error instanceof ApiError)) {
                error = new ApiError(500, 'Error self destruct:');
            }
            res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
                ...(process.env.NODE_ENV === 'DEV' && { stack: error.stack })
            });
        }
    }
}

export const controller = {
    getAllGadgets: GadgetController.getAllGadgets,
    getGadgetById: GadgetController.getGadgetById,
    createGadget: GadgetController.createGadget,
    updateGadget: GadgetController.updateGadget,
    deleteGadget: GadgetController.deleteGadget,
    selfDestructGadget: GadgetController.selfDestructGadget
};
