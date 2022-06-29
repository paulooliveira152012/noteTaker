const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require("./toutes/htmlRoutes");

//requesting access to fileSystem
const fs = require('fs');
//providing utility to work with different file and diretory paths
const path = require('path');
//request express file access from node_modules
const express = require('express');
//specifying which port to use
const PORT = process.env.PORT || 3001;
//assign express function to a variable to later chain on methods to Express.js server
const app = express();

const util = require("util");

//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
//getting access to public folder
app.use(express.static('public'));
//parse incoming JSON data
app.use(express.json());


//Asynchronous 
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


//API routes (GET request)
app.get("./api/notes", function(req, res) {
    readFileAsync("./db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

//API routes (POST request)
app.post("./api/notes", function(req, res) {
    const note = req.body;
    readFileAsync("./db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});

//API routes (DELETE request)
app.delete("./api/notes/:id", function(req, res) {
    const idDelete = parseInt(req.params.id);
    readFileAsync("./db.db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const notesData = []
        for(let i = 0; i<notes.length; i++) {
            if(idDelete !== notes[i].id) {
                notesData.push(notes[i])
            }
        }
        return notesData
    }).then(function(notes) {
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.send("updated!");
    })
})

//API routes to HTML
app.get("notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});