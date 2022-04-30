const express = require('express');
const path = require('path');
const { notes } = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3001;


// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());


// API ROUTES
// Get notes
app.get('/api/notes', (req, res) => {   
    res.json(notes);   
});

// Post notes
app.post('/api/notes', (req,res) => {
    const note = req.body;
    res.json(note);
});

// HTML ROUTES
// for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
//  for non-specified, return index.html
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,"public/index.html"));
});


// LISTEN PORT
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
});

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).