import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import BoardsProvider from './contexts/boards';
import CardsProvider from './contexts/cards';
import Columnsrovider from './contexts/columns';
import Board from './pages/Board';
import Boards from './pages/Boards';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <BoardsProvider>
          <Columnsrovider>
            <CardsProvider>
              <Routes>
                <Route path={'/'} element={<Boards />} />
                <Route path={'/project/:id'} element={<Board />} />
              </Routes>
            </CardsProvider>
          </Columnsrovider>
        </BoardsProvider>
      </Router>
    </div >
  )
}

export default App;
