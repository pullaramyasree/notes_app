import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for notes and form
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showNotes, setShowNotes] = useState(true); // Show notes by default
  const [error, setError] = useState('');

  // Fetch notes when component loads and when showNotes changes
  useEffect(() => {
    if (showNotes) fetchNotes();
  }, [showNotes]);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      setError('Failed to load notes');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingId 
        ? `http://localhost:3001/api/notes/${editingId}`
        : 'http://localhost:3001/api/notes';
      
      const method = editingId ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      // Reset form and refresh notes
      setTitle('');
      setContent('');
      setEditingId(null);
      fetchNotes();
    } catch (error) {
      setError('Failed to save note');
    }
  };

  // Delete a note
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/notes/${id}`, { method: 'DELETE' });
      fetchNotes(); // Refresh the list
    } catch (error) {
      setError('Failed to delete note');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>📝 NoteMaker</h1>
        <p>Your personal digital notebook</p>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="container">
        {/* Note Form */}
        <div className="form-section">
          <h2>{editingId ? 'Edit Note' : 'Add New Note'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button type="submit" className="save-btn">
              {editingId ? 'Update' : 'Save'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setContent('');
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Notes List */}
        <div className="notes-section">
          <div className="notes-header">
            <h2>Your Notes</h2>
            <button 
              onClick={() => setShowNotes(!showNotes)} 
              className="toggle-btn"
            >
              {showNotes ? 'Hide Notes' : 'Show Notes'}
            </button>
          </div>

          {showNotes && (
            <div className="notes-list">
              {notes.length === 0 ? (
                <p>No notes yet. Add your first note!</p>
              ) : (
                notes.map((note) => (
                  <div key={note._id} className="note-card">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
                    <div className="note-actions">
                      <button 
                        onClick={() => {
                          setTitle(note.title);
                          setContent(note.content);
                          setEditingId(note._id);
                        }}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(note._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <footer>
        <p>© {new Date().getFullYear()} NoteMaker</p>
      </footer>
    </div>
  );
}

export default App;