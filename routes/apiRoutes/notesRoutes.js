const router = require("express").Router();
const {
    createNewNote
} = require("../../lib/notes");
const { notes } = require("../../db/db.json")

router.get("/notes", (req, res) => {
    
})