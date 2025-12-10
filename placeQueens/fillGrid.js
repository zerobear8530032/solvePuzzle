// const grid = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]

const placeQueens =  (n) => {
    const grid = [];
    for (let i = 0; i < n; i++) {
        grid.push(Array(n).fill(0));
    }
    // console.log(grid);
    const res=[]
    placeQueenHelper(grid, 0, 0, n,res);
    return res
}

const placeQueenHelper = async (grid, row, col, queens,res=[], solutions=50) => {
    if(res.length===solutions){
        return ;
    }
    if (queens == 0) {
        res.push(JSON.parse(JSON.stringify(grid)));
        return;
    }
    for (let c = col; c < grid[row].length; c++) {
        if (canPlace(grid, row, c)) {
            grid[row][c] = 1;
            placeQueenHelper(grid, row + 1, col, queens - 1,res);
            grid[row][c] = 0;
        }
        if(res.length===solutions){
            break;
        }
    }
}

const canPlace = (grid, row, col) => {
    let r = row;
    let c = col;
    while (r >= 0 && c >= 0) {// check left diagonal
        if (grid[r][c] != 0) { return false; }
        r--;
        c--;
    }

    r = row;
    c = col;
    while (r >= 0 && c < grid[0].length) {// check left diagonal
        if (grid[r][c] != 0) { return false; }
        r--;
        c++;
    }
    r = row;
    c = col;
    while (r >= 0) {// check left diagonal
        if (grid[r][c] != 0) { return false; }
        r--;
    }

    return true;
}

console.log(placeQueens(20).length)