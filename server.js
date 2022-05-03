const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require("./db/db.json");
const uuid = require('uuid'); // for generating unique id
const app = express();
const PORT = process.env.PORT || 3001;


// MIDDLEWARE
app.use(express.static(__dirname + "/public"));
app.use(express.json());


// API ROUTES
// Get all notes
app.get('/api/notes', (req, res) => {   
    res.json(notes);   
});

// Get note by id
app.get('/api/notes/:id', (req, res) => {
    const result = notes.filter(note => note.id === req.params.id);
    if (result) {
        res.json(result);
      } else {
        res.send(404);
      }
});

// Get note by id and delete
app.delete('/api/notes/:id', (req, res) => {
    const result = notes.filter(note => note.id === req.params.id);
    let index = notes.findIndex(note => note.id === req.params.id); // got this syntax from: https://stackoverflow.com/questions/26468557/return-index-value-from-filter-method-javascript
    if (result && index > -1) {
        //console.log(index);
        notes.splice(index, 1); // removes record at index from the array
        res.json(notes);
        // overwrite file with new data
        fs.writeFileSync(
            path.join(__dirname, '/db/db.json'),
            JSON.stringify(notes, null, 2) // used this formatting from module
        );
      } else {
        res.send(404);
      }
});

// Post new notes
app.post('/api/notes', (req,res) => {
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    };
    notes.push(note);
    res.json(notes);
    // overwrite file with new data
    fs.writeFileSync(
        path.join(__dirname, '/db/db.json'),
        JSON.stringify(notes, null, 2) // used this formatting from module
    );
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
