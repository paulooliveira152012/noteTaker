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
//parse incoming JSON data
app.use(express.json());
//creating a route to request data form
const { notes } = require("./db/db.json");
const { type } = require('os');
//getting access to public folder
app.use(express.static('public'));


//function to ACCEPT POST data from req.body and add it to db.json
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

//function to validate note data
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});