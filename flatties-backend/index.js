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
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//start the app
const app = express();

//use middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import modules
const property = require('./models/PropertyModel');
const listing = require('./models/ListingModel');
const user = require('./models/UserModel');
const watchingList = require('./models/WatchingListModel');

//import routers
const userRouter = require('./routers/UserRouter');
const propertyRouter = require('./routers/PropertyRouter');
// const listingRouter = require('./routers/ListingRouter');


// Connect to MongoDB
mongoose.connect(MONGODB_URL,{
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

app.use('/api/user', userRouter);
app.use('/api/property', propertyRouter);

app.get('/', (req, res) => {
    res.send('Hello World! - from flatties-backend');
    });

app.listen(PORT, () => {
    console.log(`Puddle-Server listening on port ${PORT}`);
    });
