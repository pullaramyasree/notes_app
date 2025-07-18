const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect('mongodb+srv://pullaramyasree2005:w4AdqZhasEAKBHQP@cluster0.0xzix8d.mongodb.net/notes_db?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Note Model
const Note = mongoose.model('Note', {
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
}, 'notes'); // Store all notes in 'notes' collection

// Routes

// Create a note
app.post('/api/notes', async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(500).send({ error: 'Error saving note' });
  }
});

// Get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Newest first
    res.send(notes);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching notes' });
  }
});

// Update a note
app.put('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(note);
  } catch (error) {
    res.status(500).send({ error: 'Error updating note' });
  }
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.send({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting note' });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));