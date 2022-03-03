//dependencies
const express = require('express');
const path = require('path');
//internal imports
const notesRouter = require('./routes/notes');

//initialise the app
const app = express();

//json parser
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, 'public')));

//register note routes
app.use('/api/notes', notesRouter);

//define the ports
const PORT = process.env.PORT || 5000;

//start the server
app.listen(PORT, () => console.log(`App is alive on PORT:${PORT}`));
