//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
//internal imports
const { generateID } = require('../utils/generateID');

//Database file path
const DB_PATH = path.join(__dirname, '../db/db.json');

//Read all the notes from database
const notes = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

//initialise the router
const router = express.Router();

//route to get all the notes
router.get('/', (req, res) => {
   res.status(200).json(notes);
});

//route to create a new note
router.post('/', (req, res) => {
   //prepare the note object to store
   const note = {
      id: generateID(),
      title: req.body.title,
      text: req.body.text,
   };

   //push the new note
   notes.push(note);

   //store in db
   fs.writeFile(DB_PATH, JSON.stringify(notes), (error) => {
      if (!error) res.status(200).json(note);
      console.log(error);
   });
});

//route to delete a note from database
router.delete('/:id', (req, res) => {
   notes.splice(req.params.id, 1);
   //store in db
   fs.writeFile(DB_PATH, JSON.stringify(notes), (error) => {
      if (!error) res.status(200).json({ status: 'success', message: `Note deleted with the id: ${req.params.id}` });
      console.log(error);
   });
});

//export the router
module.exports = router;
