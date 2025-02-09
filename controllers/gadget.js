// We will define the functions here

import { Gadgets } from '../models/gadget.js';
import { v4 as uuidv4 } from 'uuid';


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

function generateCodename() {
    const adjectives = ['The', 'Mysterious', 'Silent', 'Fierce', 'Swift'];
    const nouns = ['Nightingale', 'Kraken', 'Phoenix', 'Shadow', 'Whisper'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun}`;
  }

// Helper function to generate a random success probability
function generateSuccessProbability() {
    return Math.floor(Math.random() * 100) + 1;
  }

// Create gadget
export function createGadget(req, res) {
    const name = req.body.name;
    Gadgets.create({
        id: uuidv4(),
        name: name,
        codename: generateCodename(),
        status: 'Available',
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
export function updateGadget (req, res) {
    const gadgetId = req.params.id;
    const name = req.body.name;
    const status = req.body.status;
    
    Gadgets.findByPk(gadgetId).then(gadget => {
        if (!gadget) {
            return res.status(404).json({ message: 'Gadget not found!' });
        }
        gadget.name = name;
        gadget.status = status;
        return gadget.save();
    }).then(result => {
        res.status(200).json({ 
            message: 'Gadget details updated successfully!',
            gadget: result
         })
    })
    .catch(err => { console.log("Error while updating the user:\n", err)});
}

// delete the gadget
export function deleteGadget (req, res) {
    const gadgetId = req.params.id;

    Gadgets.findByPk(gadgetId).then(gadget => {
        if (!gadget) {
            return res.status(404).json({ message: 'Gadget not found!' });
        }
        gadget.status = 'Decommissioned';
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
        gadget.status = 'Destroyed';
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
