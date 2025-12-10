import React, { useEffect } from "react";
import { useState } from "react";
import ColorPallet from "./ColorPallet";
import Cell from "./Cell";

const defaultGrid = [
        [{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" },{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }],
        [{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" },{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }],
        [{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" },{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }],
        [{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" },{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }],
        [{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" },{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }],
        [{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" },{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }],
        [{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" },{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }],
        [{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" },{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }],
        [{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" },{ value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }, { value: "", color: "#FFFF" }],
    ]
function Board() {
    
    const [grid, setgrid] = useState(defaultGrid);

    const [buildMode, setbuildMode] = useState(false);
    const [color, setColor] = useState("#0000");
    const buildHandler = () => {
        setbuildMode((state) => { return !state })
    }
    const changeColor = (color) => {
        setColor(color);
    }
    const resetGrid = () => {
        setgrid(defaultGrid);
    }

    useEffect(() => {
        console.log(grid)
    }, [grid])
    return (
        <div className="board" >
            {buildMode && <ColorPallet changeColor={changeColor} />}
            {grid.map((rowscells, row) => {
                return (
                    <div key={row} className="rows">
                        {rowscells.map((data, col) => {
                            return (<Cell key={col} color={color} buildMode={buildMode} cellData={data} grid={grid} row={row} col={col} setGrid={setgrid} />)
                        })}
                    </div>
                )
            })}
            <div className="btn-container">
            <button onClick={buildHandler}>{buildMode ? "Deactivate Build Mode" : "Activate Build Mode"}</button>
            {buildMode && <button onClick={resetGrid}>Reset Grid </button>}
            </div>
        </div>
    );
}

export default Board;
