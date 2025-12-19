import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Board from './components/Board'
import PuzzleGameMenu from "./components/PuzzleGameMenu"
import { Routes,Route } from "react-router"
function App() {
  return (
    <div className='board-container'>
      <Routes>
        <Route path="/" element={<PuzzleGameMenu />} />
        <Route path="/grid/:size" element={<Board  />} />
      </Routes>
    </div >)
}

export default App
