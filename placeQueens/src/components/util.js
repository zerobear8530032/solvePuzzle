import fs from "fs";
export const COLOR_MAP = [
    '#FFFFFF', // 0: White (Empty/Unvisited)
    '#FF0000', // 1: Red (Origin/Seed Point)
    '#1F77B4', // 2: Blue
    '#FF7F0E', // 3: Orange
    '#2CA02C', // 4: Green
    '#D62728', // 5: Red
    '#9467BD', // 6: Purple
    '#8C564B', // 7: Brown
    '#E377C2', // 8: Pink
    '#7F7F7F', // 9: Gray
    '#4E8C3C', // 10: Dark Green
    '#8BC34A', // 11: Light Green
    '#CDDC39', // 12: Lime Green
    '#FFC107', // 13: Amber
    '#FF9800', // 14: Orange
    '#F44336', // 15: Red-Orange
    '#2196F3', // 16: Deep Blue
    '#00BCD4', // 17: Cyan
    '#673AB7', // 18: Deep Purple
    '#9C27B0', // 19: Purple
    '#009688', // 20: Teal
    '#FFEB3B', // 21: Yellow
    '#795548', // 22: Brown
    '#607D8B', // 23: Blue Gray
    '#E91E63', // 24: Pink
    '#7F6000', // 25: Dark Yellow
    '#4A148C', // 26: Very Dark Purple
    '#004D40', // 27: Dark Teal
    '#BF360C', // 28: Dark Red
    '#FF8A80', // 29: Light Pink
    '#4CAF50', // 30: Medium Green
    '#9E9D24', // 31: Olive
    '#4DD0E1', // 32: Light Cyan
    '#BA68C8', // 33: Light Purple
    '#B0BEC5', // 34: Light Blue Gray
    // Add more colors if your regions go higher than 34
];

function placeQueens(queens, solutions = 50) {
    const grid = [];
    for (let i = 0; i < queens; i++) {
        grid.push(Array(queens).fill(0));
    }
    const res = []
    placeQueenHelper(grid, 0, queens, res, solutions);
    return res;
}

function placeQueenHelper(grid, row, queens, res, solutions) {
    if (queens == 0) {
        res.push(JSON.parse(JSON.stringify(grid)));
        return res.length === solutions;
    }
    if (res.length === solutions) {
        return true;
    }
    for (let c = 0; c < grid[row].length; c++) {
        if (canPlace(grid, row, c)) {
            if (res.length === solutions) {
                return true;
            }
            grid[row][c] = "Q";
            if (placeQueenHelper(grid, row + 1, queens - 1, res, solutions)) { return true; }
            grid[row][c] = 0;
        }
    }
    return false;
}


function canPlace(grid, row, col) {
    // column check
    for (let r = 0; r <= row; r++) {
        if (grid[r][col] === "Q") { return false; }
    }

    for (let r = row, c = col; r >= 0 && c >= 0; r--, c--) {
        if (grid[r][c] === "Q") { return false; }
    }
    for (let r = row, c = col; r >= 0 && c < grid[0].length; r--, c++) {
        if (grid[r][c] === "Q") { return false; }
    }
    return true;
}

function choose(list) {
    const idx = Math.floor(Math.random() * list.length);
    return list[idx];
}
function paint(r, c, painted, queens, depth, color) {
    if (r < 0 || c < 0 || r === painted.length || c === painted[0].length || depth <= 0) {
        return;
    }
    if (painted[r][c] === 0 && queens[r][c] === "Q") {
        return;
    }
    if (painted[r][c] === 0) {
        painted[r][c] = color;
    }
    const directions = []
    if (r + 1 < painted.length && painted[r + 1][c] === 0) { directions.push("DOWN"); }
    if (r - 1 >= 0 && painted[r - 1][c] == 0) { directions.push("UP"); }
    if (c + 1 < painted[0].length && painted[r][c + 1] === 0) { directions.push("RIGHT"); }
    if (c - 1 >= 0 && painted[r][c - 1] === 0) { directions.push("LEFT"); }
    const choice = choose(directions);
    if (choice === "UP") {
        paint(r - 1, c, painted, queens, depth - 1, color);
    }
    if (choice === "DOWN") {
        paint(r + 1, c, painted, queens, depth - 1, color);
    }
    if (choice === "LEFT") {
        paint(r, c - 1, painted, queens, depth - 1, color);
    }
    if (choice === "RIGHT") {
        paint(r, c + 1, painted, queens, depth - 1, color);
    }
}

// const solutions = placeQueens(25, 20);

// const solution = choose(solutions);


function paintGrid(grid) {
    const painted = [];
    for (let i = 0; i < grid.length; i++) {
        painted.push(Array(grid[0].length).fill(0));
    }
    let curr = 1;
    for (let i = 0; i < painted.length; i++) {
        for (let j = 0; j < painted[0].length; j++) {
            if (grid[i][j] === "Q") {
                painted[i][j] = curr;
                paint(i, j, painted, grid, 25, curr);
                curr++;
            }
        }
    }
    return painted;
}


// const paintedGrid = paintGrid(solution);


function expandPaint(grid, queenMap) {
    const positionMap = new Map();
    const queue = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 0 || queenMap[r][c] === "Q") {
                continue;
            }
            queue.push([r, c, grid[r][c]]);
        }
    }
    const visitedMap = new Map();
    while (queue.length != 0) {
        const poped = queue.shift();
        const row = poped[0];
        const col = poped[1];
        const color = poped[2];

        if (grid[row][col] === 0) {
            grid[row][col] = color;
        }
        if (row + 1 < grid.length && col < grid[0].length && col >= 0 && grid[row + 1][col] === 0) {
            const key = `${row + 1},${col}`;
            if (positionMap.has(key)) {
                positionMap.get(key).add(color);
            } else {
                const set = new Set();
                set.add(color);
                positionMap.set(key, set);
            }
            queue.push([row + 1, col, color]);
        }
        if (row - 1 >= 0 && col < grid[0].length && col >= 0 && grid[row - 1][col] === 0) {
            const key = `${row - 1},${col}`;
            if (positionMap.has(key)) {
                positionMap.get(key).add(color);
            } else {
                const set = new Set();
                set.add(color);
                positionMap.set(key, set);
            }
            queue.push([row - 1, col, color]);
        }
        if (col + 1 < grid[0].length && row < grid.length && row >= 0 && grid[row][col + 1] === 0) {
            const key = `${row},${col + 1}`;
            if (positionMap.has(key)) {
                positionMap.get(key).add(color);
            } else {
                const set = new Set();
                set.add(color);
                positionMap.set(key, set);
            }
            queue.push([row, col + 1, color]);
        }
        if (col - 1 >= 0 && row < grid[0].length && row >= 0 && grid[row][col - 1] === 0) {
            const key = `${row},${col - 1}`;
            if (positionMap.has(key)) {
                positionMap.get(key).add(color);
            } else {
                const set = new Set();
                set.add(color);
                positionMap.set(key, set);
            }
            queue.push([row, col - 1, color]);
        }
    }
    return positionMap;
}
// expandPaint(paintedGrid,solution);

// ---------------------THIS IS EXTRA FEATURES-------------------------------------------
function countColor() {
    const colorMap = new Map();
    const queue = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 0 || grid[r][c] === "Q") {
                continue;
            }
            queue.push([r, c, grid[r][c]])
            if (colorMap.has(grid[r][c])) {
                colorMap.set(grid[r][c], colorMap.get(grid[r][c]) + 1);
            } else {
                colorMap.set(grid[r][c], 1);
            }
        }
    }
    return colorMap;
}

function setMinFreqColor(grid, colorMap, positionMap) {
    for (const [key, value] of positionMap.entries()) {
        let smallest = 0;
        for (let color of value) {
            if (smallest === 0) {
                smallest = color;
            } else if (colorMap.get(smallest) > colorMap.get(color)) {
                smallest = color;
            }
        }
        const [row, col] = key.split(",");
        grid[Number(row)][Number(col)] = smallest;
    }
}
// ---------------------THIS IS EXTRA FEATURES-------------------------------------------

function combineGrid(solution, paint, COLOR_MAP) {
    const finalGrid = [];
    for (let row = 0; row < solution.length; row++) {
        finalGrid.push([]);
        for (let col = 0; col < solution[0].length; col++) {
            const color = paint[row][col];
            const cell_data = { value: solution[row][col] === "Q" ? "Q" : "", color: COLOR_MAP[color] };
            finalGrid[row].push(cell_data);
        }
    }
    return finalGrid;
}

// const final_grid=combineGrid(solution,paintedGrid,COLOR_MAP);
// console.log(final_grid);
// fs.writeFileSync("test.txt",JSON.stringify(final_grid));




export function placeQueensOptimize(queens, solutions = 50) {
    const grid = Array(queens).fill(0);
    const row = 0;
    const res = [];
    // we can map upto 32 bit on these mask 
    const colSet = new Set();
    const rightDiagonalSet = new Set();
    const leftDiagonalSet = new Set();
    placeQueenHelperOptimize(grid, row, queens, res, solutions, colSet, leftDiagonalSet, rightDiagonalSet);
    return res;
}
export function placeQueenHelperOptimize(grid, row, queens, res, solutions, colSet, leftDiagonalSet, rightDiagonalSet) {
    if (queens === 0) {
        res.push([...grid]);
        return;
    }
    if (res.length === solutions) {
        return;
    }
    for (let col = 0; col < grid.length; col++) {
        const leftDiagonal= row-col;
        const rightDiagonal= row+col;
        if (!colSet.has(col) && !leftDiagonalSet.has(leftDiagonal) && !rightDiagonalSet.has(rightDiagonal)) {
            colSet.add(col);
            leftDiagonalSet.add(leftDiagonal);
            rightDiagonalSet.add(rightDiagonal);
            grid[row] = (1 << col | grid[row]);
            placeQueenHelperOptimize(grid, row + 1, queens - 1, res, solutions,colSet,leftDiagonalSet,rightDiagonalSet);
            //  undo changes
            grid[row] = (grid[row] ^ (1 << col));
            colSet.delete(col);
            leftDiagonalSet.delete(leftDiagonal);
            rightDiagonalSet.delete(rightDiagonal);
        }
    }
}


// const solutions=placeQueensOptimize(5);
// const solution= choose(solutions);


export function paintGridOptimize(grid) {
    const painted = [];
    for (let i = 0; i < grid.length; i++) {
        painted.push(Array(grid.length).fill(0));
    }
    let curr = 1;
    for (let i = 0; i < painted.length; i++) {
        for (let j = 0; j < painted[0].length; j++) {
            if ((grid[i] & (1<<j))!=0) {
                painted[i][j] = curr;
                paintOptimize(i, j, painted, grid,Math.floor(Math.sqrt(painted.length)), curr);
                curr++;
                break;
            }
        }
    }
    
    return painted;
}

export function paintOptimize(r, c, painted, queens, depth, color) {
    if (r < 0 || c < 0 || r === painted.length || c === painted[0].length || depth <= 0) {
        return;
    }
    if (painted[r][c] === 0 && queens[r]===(1<<c)) {
        return;
    }
    if (painted[r][c] === 0) {
        painted[r][c] = color;
    }
    const directions = []
    if (r + 1 < painted.length && painted[r + 1][c] === 0) { directions.push("DOWN"); }
    if (r - 1 >= 0 && painted[r - 1][c] == 0) { directions.push("UP"); }
    if (c + 1 < painted[0].length && painted[r][c + 1] === 0) { directions.push("RIGHT"); }
    if (c - 1 >= 0 && painted[r][c - 1] === 0) { directions.push("LEFT"); }
    const choice = choose(directions);
    if (choice === "UP") {
        paintOptimize(r - 1, c, painted, queens, depth - 1, color);
    }
    if (choice === "DOWN") {
        paintOptimize(r + 1, c, painted, queens, depth - 1, color);
    }
    if (choice === "LEFT") {
        paintOptimize(r, c - 1, painted, queens, depth - 1, color);
    }
    if (choice === "RIGHT") {
        paintOptimize(r, c + 1, painted, queens, depth - 1, color);
    }
}
export function expandPaintOptimize(grid, queenMap) {
    const queue = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 0 || (queenMap[r] & (1<<c))!=0) {
                continue;
            }
            queue.push([r, c, grid[r][c]]);
        }
    }
    const visitedMap = new Map();
    while (queue.length != 0) {
        const poped = queue.shift();
        const row = poped[0];
        const col = poped[1];
        const color = poped[2];

        if (grid[row][col] === 0) {
            grid[row][col] = color;
        }
        if (row + 1 < grid.length && col < grid[0].length && col >= 0 && grid[row + 1][col] === 0) {
            const key = `${row + 1},${col}`;
            queue.push([row + 1, col, color]);
        }
        if (row - 1 >= 0 && col < grid[0].length && col >= 0 && grid[row - 1][col] === 0) {
            const key = `${row - 1},${col}`;
            queue.push([row - 1, col, color]);
        }
        if (col + 1 < grid[0].length && row < grid.length && row >= 0 && grid[row][col + 1] === 0) {
            queue.push([row, col + 1, color]);
        }
        if (col - 1 >= 0 && row < grid[0].length && row >= 0 && grid[row][col - 1] === 0) {
            queue.push([row, col - 1, color]);
        }
    }
    return grid;
}
export function combineGridOptimize(solution, paint, COLOR_MAP) {
    const finalGrid = [];
    for (let row = 0; row < paint.length; row++) {
        finalGrid.push([]);
        for (let col = 0; col < paint[0].length; col++) {
            const color = paint[row][col];
            const cell_data = { value:"", color: COLOR_MAP[color] };
            finalGrid[row].push(cell_data);
        }
    }
    return finalGrid;
}



// const solutions=placeQueensOptimize(25);
// const solution= choose(solutions);
// const paintedGrid=paintGridOptimize(solution);
// const completePaintedGrid = expandPaintOptimize(paintedGrid,solution);
// console.log(solution);
// console.log(paintedGrid);
// const finalGrid =combineGridOptimize(solution,paintedGrid,COLOR_MAP);
// console.log(finalGrid);