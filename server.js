// server.js File 
// It does not have any db connection it works with in memory storage as array for simplified reference.
// It can be tested using postman with data being refreshed every time server is started.

import express from 'express'; // Importing express module 
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs
const app = express(); // Creating an express object 

const port = 8000; // Setting an port for this application 

app.use(express.json()); // Middleware to parse JSON bodies

// In-memory storage for gadgets
let gadgets = [];

// Helper function to generate a random codename
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

app.get('/', function (req, res) {
    res.send('we are at the root route of our server');
  })

// GET /gadgets: Retrieve a list of all gadgets
app.get('/gadgets', (req, res) => {
    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget,
      successProbability: generateSuccessProbability()
    }));
    res.json(gadgetsWithProbability);
  });

// POST /gadgets: Add a new gadget to the inventory
app.post('/gadgets', (req, res) => {
    const { name } = req.body;
    const newGadget = {
      id: uuidv4(),
      name,
      codename: generateCodename(),
      status: 'Available',
      decommissionedTimestamp: null
    };
    gadgets.push(newGadget);
    res.status(201).json(newGadget);
  });

// PATCH /gadgets/:id: Update an existing gadget's information
app.patch('/gadgets/:id', (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    const gadget = gadgets.find(g => g.id === id);
  
    if (!gadget) {
      return res.status(404).send('Gadget not found');
    }
  
    if (name) gadget.name = name;
    if (status) gadget.status = status;
  
    res.json(gadget);
  });

// DELETE /gadgets/:id: Mark a gadget as decommissioned
app.delete('/gadgets/:id', (req, res) => {
    const { id } = req.params;
    const gadget = gadgets.find(g => g.id === id);
  
    if (!gadget) {
      return res.status(404).send('Gadget not found');
    }
  
    gadget.status = 'Decommissioned';
    gadget.decommissionedTimestamp = new Date().toISOString();
  
    res.json(gadget);
  });

// Starting server using listen function 
app.listen(port, function (err) { 
if(err){ 
	console.log("Error while starting server"); 
} 
else{ 
	console.log("Server has been started at "+port); 
} 
}) 

