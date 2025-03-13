//server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
const tracksControllers = require('./controllers/tracks');
const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";

// Middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));

// Routs
app.use(express.static('public'));
app.use('/tracks', tracksControllers);

// connetion to DB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected on MongoDB ${mongoose.connection.name}`);
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}!`);
  });