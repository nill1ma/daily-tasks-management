import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CardsProvider from './contexts/cards';
import Board from './pages/Board';
import Boards from './pages/Boards';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <CardsProvider>
          <Routes>
            <Route path={'/boards'} element={<Boards />} />
            <Route path={'/project/1'} element={<Board />} />
          </Routes>
        </CardsProvider>
      </Router>
    </div >
  )
}

export default App;
