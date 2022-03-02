//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { generateID } = require('../utils/generateID');

const DB_PATH = path.join(__dirname, '../db/db.json');
const notes = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

//initialise the router
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).json(notes);
});

router.post('/', (req, res, next) => {
   //prepare the note object to store
   const note = {
      _id: generateID(),
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

module.exports = router;
