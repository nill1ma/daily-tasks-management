import React from 'react';
import './App.css';
import Header from './components/Header';
import Board from './pages/Board';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path={'/'} element={<Board />} />
          <Route path={'/create'} element={<Board />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
