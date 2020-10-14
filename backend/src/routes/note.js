const { Router } = require('express');
const router = Router();

const { 
    renderNoteForm, 
    addNote, 
    getNotes, 
    editForm, 
    updateNote, 
    deleteNote 
} = require('../controller/noteController')

const { isAuthenticated } = require('../helpers/auth')

// New note
router.get('/add', isAuthenticated, renderNoteForm);
router.post('/add', isAuthenticated, function(req, res){ addNote });

// Getting all notes
router.get('/notes', isAuthenticated, function(req, res){ getNotes });

// Editing notes
router.get('/notes/edit/:id', isAuthenticated, editForm)
router.put('/notes/edit/:id', isAuthenticated, updateNote)

// Delete notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNote)

module.exports = router;