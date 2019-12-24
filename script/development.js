const ROW = 10;
const COL = 10;

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
    constructor(pRow, pCol, srcDistToSuccessor, goalDistToSuccessor) {
        this.pRow = pRow;
        this.pCol = pCol;
        this.srcDistToSuccessor = srcDistToSuccessor;
        this.goalDistToSuccessor = goalDistToSuccessor;
    }
}

class Utility {
    static isValidLocation(row, col) {
        return row >= 0 && row < ROW && col >= 0 && col < COL;
    }

    static isNotBlocked(grid, row, col) {
        return grid[row][col] === 0 ? true : false;
    }

    static isGoal(src, dest) {
        return src.row === dest.row && src.col === dest.col;
    }
}
