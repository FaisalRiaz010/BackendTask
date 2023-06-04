const express = require('express');
const mongoose = require('mongoose');
const { storeWeatherData } = require('./weatherservice');

// Import the route controllers
const indegoDataController = require('./controllers/indegoDataController');
const stationController = require('./controllers/stationController');

// Create an instance of the Express application
const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://FaisalRiaz:12345678foggy@indeagoapi.hx1cros.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');

    // Set your Open Weather Map API key
    const apiKey = '588b51ce289a35323054cad5892a43f1';

    // Fetch and store weather data
    storeWeatherData(apiKey);

    // Define routes
    // app.get('/', (req, res) => {
    //   res.send('Welcome to the API'); // Send a response for the root URL
    // });

     app.get('/api/v1/indego-data-fetch-and-store-it-db', indegoDataController.fetchAndStoreIndegoData);
    app.get('/api/v1/stations', stationController.getAllStations);
    app.get('/api/v1/stations/:kioskId', stationController.getStationByIdAndTime);
    app.get('/api/v1/stations/:kioskId/time', stationController.getStationTimeById);

  
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

module.exports = app;
