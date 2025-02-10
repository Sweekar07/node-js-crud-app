// We will define the functions here

import { Gadgets } from '../models/gadget.js';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '../enums/status.js'
import { generateCodename, generateSuccessProbability } from '../helpers/gadgetHelpers.js'

// Crud Operations

// Retrieve a list of all gadgets from db
export function getAllGadgets(req, res) {
    Gadgets.findAll().then(gadgets => {
        res.status(200).json({ gadgets: gadgets})
    })
    .catch(err => console.log("Error while retrieving all gadgets:\n", err))
}

// Retrieve by gadget id
export function getGadgetById(req, res) {
    const gadgetId = req.params.id;
    Gadgets.findByPk(gadgetId).then(gadget => {
        if (!gadget) {
            return res.status(404).json({ message: "Gadget not found with id: ", gadgetId })
        }
        res.status(200).json({ gadget: gadget })
    })
    .catch(err => console.log("Error while retrieving gadget Id:\n", err))
}

// Create gadget
export function createGadget(req, res) {
    const name = req.body.name;
    Gadgets.create({
        id: uuidv4(),
        name: name,
        codename: generateCodename(),
        status: Status.AVAILABLE,
        successProbability: generateSuccessProbability(),
        decommissionedTimestamp: null
    }).then(result => {
        console.log("Gadget Created:");
        res.status(201).json({  // 201 i.e. resource created successfully
            message: 'Gadget created successfully!',
            gadget: result
        });
    })
    .catch(err => {
        console.log("Error while creating the user:\n", err);
    });
}

// Update the gadget
export async function updateGadget (req, res) {
    const gadgetId = req.params.id;
    const { name, status } = req.body;

    // Validate the status
    const validStatuses = Object.values(Status);
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value!' });
    }

    try {
        const gadget = await Gadgets.findByPk(gadgetId);
        if (!gadget) {
            return res.status(404).json({ message: 'Gadget not found!' });
        }
        
        gadget.name = name;
        gadget.status = status;
        await gadget.save();

        res.status(200).json({ 
            message: 'Gadget details updated successfully!',
            gadget: result
        });
    } catch (err) {
        console.log("Error while updating the gadget:\n", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// delete the gadget
export function deleteGadget (req, res) {
    const gadgetId = req.params.id;

    Gadgets.findByPk(gadgetId).then(gadget => {
        if (!gadget) {
            return res.status(404).json({ message: 'Gadget not found!' });
        }
        gadget.status = Status.DECOMMISSIONED;
        gadget.decommissionedTimestamp = new Date().toISOString();
        return gadget.save();
    }).then(result => {
        res.status(200).json({ 
            message: 'Gadget details deleted successfully!',
            gadget: result
         })
    })
    .catch(err => { console.log("Error while deleting the user:\n", err)});
}

// Self-destruct sequence
export async function selfDestructGadget(req, res) {
    const gadgetId = req.params.id;
    const { confirmationCode } = req.body;

    // Simulate confirmation code check (you can customize this logic)
    const expectedConfirmationCode = '1234'; // Replace with your logic to generate or verify the code
    if (confirmationCode !== expectedConfirmationCode) {
        return res.status(400).json({ message: 'Invalid confirmation code!' });
    }

    try {
        const gadget = await Gadgets.findByPk(gadgetId);
        if (!gadget) {
            return res.status(404).json({ message: 'Gadget not found!' });
        }

        // Perform self-destruct logic
        gadget.status = Status.DESTROYED;
        gadget.decommissionedTimestamp = new Date().toISOString();
        await gadget.save();

        res.status(200).json({
            message: 'Gadget self-destruct sequence initiated successfully!',
            gadget: gadget
        });
    } catch (err) {
        console.log("Error while initiating self-destruct sequence:\n", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const controller = { getAllGadgets, getGadgetById, createGadget, updateGadget, deleteGadget, selfDestructGadget };
export { controller };
