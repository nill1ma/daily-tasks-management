import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import BoardsProvider from './contexts/boards';
import CardsProvider from './contexts/cards';
import ColumnsProvider from './contexts/columns';
import BoardPage from './pages/BoardPage';
import Boards from './pages/Boards';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <BoardsProvider>
          <ColumnsProvider>
            <CardsProvider>
              <Routes>
                <Route path={'/'} element={<Boards />} />
                <Route path={'/project/:id'} element={<BoardPage />} />
              </Routes>
            </CardsProvider>
          </ColumnsProvider>
        </BoardsProvider>
      </Router>
    </div >
  )
}

export default App;
