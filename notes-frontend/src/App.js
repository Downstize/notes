import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotesList from './NotesList';
import CreateNote from './CreateNote';
import EditNote from './EditNote';
import ViewNote from './ViewNote';

function App() {
    return (
        <Router>
            <div className="container" style={{ maxWidth: '900px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
                <h1>Заметки</h1>
                <Routes>
                    <Route path="/" element={<NotesList />} />
                    <Route path="/create" element={<CreateNote />} />
                    <Route path="/edit/:id" element={<EditNote />} />
                    <Route path="/note/:id" element={<ViewNote />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
