const ROW = 10;
const COL = 10;
const INIT_VALUE = 1000;

class Location {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

class MoveCost {
    constructor(cost, location) {
        this.cost = cost;
        this.location = location;
    }
}

class Cell {
    constructor(pRow, pCol, srcDistToSuccessor, goalDistToSuccessor, heuristicValue) {
        this.pRow = pRow;
        this.pCol = pCol;
        this.srcDistToSuccessor = srcDistToSuccessor;
        this.goalDistToSuccessor = goalDistToSuccessor;
        this.heuristicValue = heuristicValue;
    }
}

class Utility {
    static isValidLocation(location) {
        return location.row >= 0 && location.row < ROW && location.col >= 0 && location.col < COL;
    }

    static isNotBlocked(grid, location) {
        return grid[location.row][location.col] === 0 ? true : false;
    }

    static isGoal(src, dest) {
        return src.row === dest.row && src.col === dest.col;
    }

    static getHeuristicValue(heuristic, src, dest) {
        switch (heuristic) {
            case "manhattan": {
                return Math.abs(src.row - dest.row) + Math.abs(src.col - dest.col);
            }
        }
    }
}

function aStarSearch(grid, src, dest) {
    if (!Utility.isValidLocation(src) || !Utility.isValidLocation(dest)) {
        console.log("Invalid source or destination.");
        return false;
    }

    if (!Utility.isNotBlocked(grid, src) || !Utility.isNotBlocked(grid, dest)) {
        console.log("Blocked source or destination.");
        return false;
    }

    if (Utility.isGoal(src, dest)) {
        console.log("Already at goal location.");
        return false;
    }

    let closedList = new Array(ROW);
    for (let i = 0; i < ROW; ++i) {
        closedList[i] = new Array(COL);
        for (let j = 0; j < COL; ++j) {
            closedList[i][j] = 0;
        }
    }

    let cells = new Array(ROW);
    for (let i = 0; i < ROW; ++i) {
        cells[i] = new Array(COL);
        for (let j = 0; j < COL; ++j) {
            cells[i][j] = new Cell(-1, -1, INIT_VALUE, INIT_VALUE, INIT_VALUE);
        }
    }
    let i = src.row;
    let j = src.col;
    cells[i][j].goalDistToSuccessor = 0;
    cells[i][j].srcDistToSuccessor = 0;
    cells[i][j].heuristicValue = 0;
    cells[i][j].pRow = i;
    cells[i][j].pCol = j;
    let openList = new Set();
}
