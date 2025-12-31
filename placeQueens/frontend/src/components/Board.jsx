import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ColorPallet from "./ColorPallet";
import Cell from "./Cell";
import { useNavigate, useParams } from "react-router-dom";
import { COLOR_MAP, combineGridOptimize, expandPaintOptimize, paintGridOptimize, placeQueensOptimize } from "./util";
import HelpModal from "./HelpModal";
import { ArrowLeft } from "lucide-react";
import Timer from "./Timer";

function Board() {
  const boardSize = useParams("size");
  const [defaultGrid, setdefaultGrid] = useState([[]]);
  const [grid, setGrid] = useState(defaultGrid);
  const [queenColorMap, setQueenColorMap] = useState(new Map());
  const [rowMap, setRowMap] = useState(new Map());
  const [columnMap, setColumnMap] = useState(new Map());
  const [leftDiagonal, setLeftDiagonal] = useState(new Map());
  const [rightDiagonal, setRightDiagonal] = useState(new Map());

  function choose(list) {
    const idx = Math.floor(Math.random() * list.length);
    return list[idx];
  }


  useEffect(() => {
    try {
      const size = boardSize ? Number(boardSize.size) > 25 || Number(boardSize.size) < 4 ? 4 : Number(boardSize.size) : 0;
      const solutions = placeQueensOptimize(size);
      const solution = choose(solutions);
      const paintedGrid = paintGridOptimize(solution);
      const completePaintedGrid = expandPaintOptimize(paintedGrid, solution);
      const finalGrid = combineGridOptimize(solution, paintedGrid, COLOR_MAP);
      setdefaultGrid(finalGrid);
      setGrid(finalGrid);
    } catch (error) {
      alert(`Some Error Occur ! ${error.name}`)
    }
  }, []);



  function checkConnection(grid, colorMap) {
    const seenColors = new Set();
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const cell = grid[row][col];
        if (seenColors.has(cell.color)) {
          continue;
        } else {
          seenColors.add(cell.color);
        }
        const visited = new Set();
        const count = getCount(grid, row, col, cell.color, visited);
        if (count != colorMap.get(cell.color)) {
          console.log(`${row}, ${col}, ${count} , ${colorMap.get(cell.color)} `);
          return false;
        }
      }
    }
    return true;
  }

  function getCount(grid, r, c, color, visited) {
    if (r >= grid.length || c >= grid[0].length || r < 0 || c < 0) {
      return 0;
    }
    const key = `${r},${c}`;
    if (color !== grid[r][c].color || visited.has(key)) {
      return 0;
    }
    visited.add(key);
    const up = getCount(grid, r - 1, c, color, visited);
    const down = getCount(grid, r + 1, c, color, visited);
    const left = getCount(grid, r, cs - 1, color, visited);
    const right = getCount(grid, r, c + 1, color, visited);
    return up + down + right + left + 1;
  }

  function hasConflict(map) {
    for (const count of map.values()) {
      if (count > 1) return true;
    }
    return false;
  }

  useEffect(() => {
    if (isWin()) {
      alert("You WON ");
      timeRef.current.stopTimer();
      const curr_seconds = timeRef.current.getCurrentTime();
      const username = prompt("You Won Enter Your Name Here !");

      console.log(curr_seconds, username);
      navigate("/")
    }
    console.log(timeRef);
  }, [grid]);


  function isWin() {
    return !checkError() && queenColorMap.size === grid.length;
  }

  function checkError() {
    return (
      hasConflict(rowMap) ||
      hasConflict(columnMap) ||
      hasConflict(queenColorMap) ||
      hasConflict(leftDiagonal) ||
      hasConflict(rightDiagonal)
    );
  }

  const resetGrid = () => {
    setGrid(defaultGrid);
    setQueenColorMap(new Map());
    setLeftDiagonal(new Map());
    setRightDiagonal(new Map());
    setRowMap(new Map());
    setColumnMap(new Map());
    timeRef.current.resetTimer();
    timeRef.current.startTimer();
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }

  const timeRef = useRef();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-2">
              Queens Puzzle
            </h1>
            <p className="text-slate-400 text-sm">
              Place queens without conflicts
            </p>
          </div>
          <HelpModal timeRef={timeRef} />
        </div>


        {/* Board Container */}
        <div className="relative flex justify-center items-center flex-col gap-5">
          <Timer ref={timeRef} />
          {/* test */}
          {/* we add extra call back function to buffer the execution so that initally it get ahead and initalize at child   */}
          {/* test */}
          {/* Glow effect behind board */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl rounded-3xl"></div>
          {/* Board */}
          <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/10 shadow-2xl">
            <div className="board inline-block">
              {grid.map((rowscells, row) => {
                return (
                  <div key={row} className="rows flex">
                    {rowscells.map((data, col) => {
                      const isColorError = (queenColorMap.get(data.color) ?? 0) > 1;
                      const isRowError = (rowMap.get(row) ?? 0) > 1;
                      const isColError = (columnMap.get(col) ?? 0) > 1;
                      const isDiagLError = (leftDiagonal.get(row - col) ?? 0) > 1;
                      const isDiagRError = (rightDiagonal.get(row + col) ?? 0) > 1;

                      const isError =
                        isColorError ||
                        isRowError ||
                        isColError ||
                        isDiagLError ||
                        isDiagRError;
                      return (
                        <Cell
                          key={col}
                          color={data.color}
                          isError={isError}
                          setLeftDiagonal={setLeftDiagonal}
                          setRightDiagonal={setRightDiagonal}
                          setRowMap={setRowMap}
                          setQueenColorMap={setQueenColorMap}
                          setColumnMap={setColumnMap}
                          cellData={data}
                          grid={grid}
                          row={row}
                          col={col}
                          setGrid={setGrid}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={resetGrid}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            Reset Grid
          </button>
        </div>
      </div>
    </div>
  );
}

export default Board;