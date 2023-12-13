/**
    * Project: flatties-backend
    * File: index.js
    * Desc: This is the main entry point for the backend server
    * Author: PuddleDev
    * Created: 12/12/2023
    * Framework: Express
    * Language: Node.js
    * Database: MongoDB
    * 
**/

// Load environment variables
require('dotenv').config();

//get the environment variables from the .env file
const PORT = process.env.PORT; 
const mongodbURL = process.env.MONGODB_URL;


// console.log(`Puddle-PORT: ${PORT}`);
// console.log(`Puddle-mongodbURL: ${mongodbURL}`);

//ininialize express app
const express = require('express'); 
const mongoose = require('mongoose');
const app = express();

//import the models
const Users = require('./models/users');

// Connect to MongoDB
mongoose.connect(mongodbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check if MongoDB is connected
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Puddle - connection error:'));
db.once('open', function() {
    console.info('Puddle-Connected to MongoDB');
    console.info(`----------------------------`);
});


// Start the server
app.get('/', (req, res) => {
    res.send('Hello World! - from flatties-backend');
    });

app.listen(PORT, () => {
    console.log(`Puddle-Server listening on port ${PORT}`);
    });