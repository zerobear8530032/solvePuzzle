import React, { useEffect, useRef, useState } from 'react'

function Cell({ color, buildMode, row, col, cellData, setGrid, grid }) {
    const createNewGrid = (change) => {
        if (change === "color") {
            const new_grid = grid.map((grid_row, r) => {
                if (r == row) {
                    return (
                        grid_row.map((grid_col, c) => {
                            if (col == c) {
                                const new_cellData = { value: grid_col.value, color: color };
                                return new_cellData;
                            }
                            return grid_col
                        })
                    )
                }
                return grid_row;
            })
            return new_grid;
        } else {
            const new_grid = grid.map((grid_row, r) => {
                if (r == row) {
                    return (
                        grid_row.map((grid_col, c) => {
                            if (col == c) {
                                if (grid_col.value === "X") {
                                    const new_cellData = { value: "♛", color: grid_col.color };
                                    return new_cellData;
                                } else if (grid_col.value === "") {
                                    const new_cellData = { value: "X", color: grid_col.color };
                                    return new_cellData;
                                } else {
                                    const new_cellData = { value: "", color: grid_col.color };
                                    return new_cellData;
                                }

                            }
                            return grid_col
                        })
                    )
                }
                return grid_row;
            })
            return new_grid;

        }
    }
    const handleClick = () => {
        if (buildMode) {
            setGrid(createNewGrid("color"));
        } else {
            setGrid(createNewGrid("value"));
        }
    }

    return (
        <>
            <div className='cell' style={{ backgroundColor: cellData.color }} onClick={handleClick}>{cellData.value}</div>
        </>
    )
}

export default Cell
