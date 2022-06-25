const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const fs = require('fs');
const path = require('path');
//request express file access from node_modules
const express = require('express');
//specifying which port to use
const PORT = process.env.PORT || 3001;
//assign express function to a variable to later chain on methods to Express.js server
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
//getting access to public folder
app.use(express.static('public'));
//parse incoming JSON data
app.use(express.json());
//telling to use router
app.use('api', apiRoutes);
app.use('/', htmlRoutes);
//creating a route to request data form
const { notes } = require("./db/db.json")
//make server listen to requests using the listen method
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});