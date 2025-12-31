import React, { useEffect, useRef, useState } from 'react'
function Cell({ color, row, col, isError, cellData, setLeftDiagonal, setRowMap, setRightDiagonal, setColumnMap, setQueenColorMap, setGrid, grid }) {
    // console.log(isError)
     const getCellSize = () => {
        if (grid.length <= 7) return 'w-20 h-20 text-2xl'; // Easy: large cells
        if (grid.length <= 12) return 'w-14 h-14 text-xl'; // Medium: medium cells
        if (grid.length <= 20) return 'w-10 h-10 text-sm'; // Hard: small cells
        return 'w-7 h-7 text-xs'; // Extreme: tiny cells
    };
    function handleClick() {
        let delta = 0;
        const new_grid = grid.map((rows, r) => {
            return rows.map((cell, c) => {
                if (r == row && col == c) {
                    if (cell.value === "") {
                        return { color: cell.color, value: "X" };
                    } else if (cell.value === "X") {
                        delta = 1;
                        return { color: cell.color, value: "Q" };
                    } else {
                        delta = -1;
                        return { color: cell.color, value: "" };
                    }
                }
                return cell;
            })
        });
        const cell = new_grid[row][col];
        if (delta !== 0) {
            setQueenColorMap(prev => updateMap(prev, delta, cell.color));
            setRowMap(prev => updateMap(prev, delta, row));
            setColumnMap(prev => updateMap(prev, delta, col));
            setLeftDiagonal(prev => updateMap(prev, delta, row - col));
            setRightDiagonal(prev => updateMap(prev, delta, row + col));
        }
        setGrid(new_grid);
    }

    function updateMap(prev, delta, property) {
        const next = new Map(prev);
        const prevCount = next.get(property) ?? 0;
        const newCount = prevCount + delta;
        if (newCount <= 0) {
            next.delete(property);
        } else {
            next.set(property, newCount);
        }
        return next;
    }
    const cellSizeClass = getCellSize();
    return (
    <div
      className={`
        cell
        relative ${cellSizeClass}
        flex items-center justify-center
        cursor-pointer
        font-bold text-white
        transition-colors duration-200
        border
        ${isError 
          ? 'border-red-500 border-2' 
          : 'border-white/20 hover:border-white/40'
        }
        ${grid.length <= 12 ? 'hover:scale-105' : ''}
        backdrop-blur-sm
        select-none
      `}
      style={{ 
        backgroundColor: cellData.color,
        boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.1)'
      }}
      onClick={handleClick}
    >
      {/* Queen text */}
      {cellData.value && (
        <span className="relative z-10">
          {cellData.value}
        </span>
      )}
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent pointer-events-none"></div>
      
      {/* Error indicator - simple dot, no animation */}
      {isError && grid.length <= 12 && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
      )}
    </div>
  );

}

export default Cell
