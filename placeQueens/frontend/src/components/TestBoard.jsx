import React from 'react'
import { useState } from 'react';
function TestBoard() {
    const colors = [
        "#e6194b", // Red
        "#3cb44b", // Green
        "#ffe119", // Yellow
        "#4363d8", // Blue
        "#f58231", // Orange
        "#911eb4", // Purple
        "#46f0f0", // Cyan / Light Blue
        "#f032e6", // Magenta
        "#bcf60c", // Lime
        "#fabebe", // Pink
        "#008080", // Teal
        "#e6beff", // Lavender
        "#9a6324", // Brown
        "#fffac8", // Light Yellow
        "#800000", // Maroon
    ];

    const [board, setBoard] = useState(
        Array(10)
            .fill(0)
            .map(() => Array(10).fill(0))
    );


    function rollOperation() {
        const choices = ["COLOR", "STOP"]
        const num = Math.floor(Math.random() * 2);
        return choices[num];
    }

    function chooseColor() {
        const idx = Math.floor(Math.random() * colors.length);
        return idx;
    }

    //  1: will find new origin 
    //  2 : will chanege color 
    function fillGrid(grid) {
        DFS(0, 0, grid, chooseColor());
        return grid;
    }

    function DFS(row, col, grid, color) {
        if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length) {
            return;
        }
        if (grid[row][col] !== 0) {
            return;
        }
        grid[row][col] = color;
        const choice = rollOperation();
        if (choice === "COLOR") {
            color = chooseColor();
        } else if (choice === "STOP") {
            const origin = findNewOrigin(grid);
            if (origin != null) {
                const [r, c] = origin;
                return DFS(r, c, grid, color);
            }
        }
        // go up 
        DFS(row - 1, col, grid, color);
        // go dowm
        DFS(row + 1, col, grid, color);
        // go left 
        DFS(row, col - 1, grid, color);
        // go right
        DFS(row, col + 1, grid, color);
    }




    function findNewOrigin(grid) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == 0) {
                    return [i, j];
                }
            }
        }
        return null;
    }
    const buildHandler=()=>{
        const new_grid=Array(10).fill(0).map(() => Array(10).fill(0));
        console.log(new_grid)
        fillGrid(new_grid);
        setBoard(new_grid);
    }
    return (
        <div>
            <button onClick={buildHandler}>BUILD</button>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${board[0].length}, 40px)`,
                    gap: "2px",
                    margin: "20px",
                }}
            >
                {board.flatMap((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{
                                width: "40px",
                                height: "40px",
                                border: "1px solid #ccc",
                                backgroundColor: colors[cell], // initially white
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default TestBoard
