import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Board from './components/Board'
import PuzzleGameMenu from "./components/PuzzleGameMenu"
import { Routes,Route } from "react-router"
import HelpModal from './components/HelpModal'
import SizeScreen from './components/SizeScreen'
import RouteNotFound from './components/RouteNotFound'
function App() {
  return (
    <div className='board-container'>
      <Routes>
        <Route path="/" element={<PuzzleGameMenu />} />
        <Route path="/:difficulty" element={<SizeScreen  />} />
        <Route path="/:difficulty/:size" element={<Board  />} />
        <Route path="/notfound" element={<RouteNotFound  />} />
      </Routes>
    </div >)
}

export default App
