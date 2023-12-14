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

//ininialize express app
const express = require('express'); 
const mongoose = require('mongoose');
const config = require('./config/database');

const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect(config.connectionString,{
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

app.listen(config.port, () => {
    console.log(`Puddle-Server listening on port ${PORT}`);
    });


app.use('api/users', userRoutes);