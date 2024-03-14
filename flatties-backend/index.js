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

///////////////////////////////////////////////////
/*************************************************/

//use this area in local environment only

// Load local environment variables
const dotenv = require('dotenv').config();
if(dotenv.error){   //check if the .env file is present
    throw dotenv.error;
}

//comment this area out before pushing to cloud

/*************************************************/
///////////////////////////////////////////////////

//get environment variables
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

//ininialize express app
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//start the app
const app = express();

// Use cors to allow cross-origin requests
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', (req, res) => {
    res.send('Hello World! - from flatties-backend');
    });

app.listen(PORT, () => {
    console.log(`Puddle-Server listening on port ${PORT}`);
    });


//import modules
const property = require('./models/PropertyModel');
const user = require('./models/UserModel');

//import routers
const userRouter = require('./routers/UserRouter');
const propertyRouter = require('./routers/PropertyRouter');

// Connect to MongoDB
mongoose.connect(MONGODB_URL);

// Check if MongoDB is connected
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Puddle - connection error:'));
db.once('open', function() {
    console.info('Puddle-Connected to MongoDB');
    console.info(`----------------------------`);
});

// Start the server

app.use('/api/user', userRouter);
app.use('/api/property', propertyRouter);
