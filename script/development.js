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
            case "euclidean": {
                return Math.sqrt(Math.pow(src.row - dest.row, 2) + Math.pow(src.col - dest.col, 2));
            }
        }
    }
    static tracePath(cells, dest) {
        let row = dest.row;
        let col = dest.col;

        let path = [];
        while (!(cells[row][col].pRow == row && cells[row][col].pCol == col)) {
            path.push(new Location(row, col));
            let row_tmp = cells[row][col].pRow;
            let col_tmp = cells[row][col].pCol;
            row = row_tmp;
            col = col_tmp;
        }
        path.push(new Location(row, col));

        while (path.length) {
            let loc = path.pop();
            setCellColor(loc, "path");
        }
    }
}

function getDirectionSuccessor(i, j, direction, dest, cells, openList, closedList, grid, heuristic) {
    if (Utility.isValidLocation(direction)) {
        let currentCell = cells[direction.row][direction.col];
        if (Utility.isGoal(direction, dest)) {
            console.log("The destination is found!");
            currentCell.pRow = i;
            currentCell.pCol = j;
            return true;
        } else if (false == closedList[direction.row][direction.col] && Utility.isNotBlocked(grid, direction)) {
            let newSrcDistToSuccessor = cells[i][j].srcDistToSuccessor + 1.0;
            let newGoalDistToSuccessor = Utility.getHeuristicValue(heuristic, direction, dest);
            let newHeuristicValue = newSrcDistToSuccessor + newGoalDistToSuccessor;

            if (INIT_VALUE == currentCell.heuristicValue || currentCell.heuristicValue > newHeuristicValue) {
                openList.add(new MoveCost(newHeuristicValue, direction));

                currentCell.srcDistToSuccessor = newSrcDistToSuccessor;
                currentCell.goalDistToSuccessor = newGoalDistToSuccessor;
                currentCell.heuristicValue = newHeuristicValue;
                currentCell.pRow = i;
                currentCell.pCol = j;
            }
        }
    }
}

function aStarSearch(grid, src, dest, heuristic) {
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
            closedList[i][j] = false;
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
    openList.add(new MoveCost(0.0, new Location(i, j)));

    let isGoalFound = false;
    while (openList.size != 0 && !isGoalFound) {
        const currentNode = openList.values().next().value;
        openList.delete(currentNode);

        i = currentNode.location.row;
        j = currentNode.location.col;
        closedList[i][j] = true;

        // Direction Successors
        let northDirection = new Location(i - 1, j);
        if ((isGoalFound = getDirectionSuccessor(i, j, northDirection, dest, cells, openList, closedList, grid, heuristic))) {
            break;
        }

        let southDirection = new Location(i + 1, j);
        if ((isGoalFound = getDirectionSuccessor(i, j, southDirection, dest, cells, openList, closedList, grid, heuristic))) {
            break;
        }

        let eastDirection = new Location(i, j + 1);
        if ((isGoalFound = getDirectionSuccessor(i, j, eastDirection, dest, cells, openList, closedList, grid, heuristic))) {
            break;
        }

        let westDirection = new Location(i, j - 1);
        if ((isGoalFound = getDirectionSuccessor(i, j, westDirection, dest, cells, openList, closedList, grid, heuristic))) {
            break;
        }

        if ("euclidean" == heuristic) {
            let northEastDirection = new Location(i - 1, j + 1);
            if ((isGoalFound = getDirectionSuccessor(i, j, northEastDirection, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            let northWestDirection = new Location(i - 1, j - 1);
            if ((isGoalFound = getDirectionSuccessor(i, j, northWestDirection, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            let southEastDirection = new Location(i + 1, j + 1);
            if ((isGoalFound = getDirectionSuccessor(i, j, southEastDirection, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            let southWestDirection = new Location(i + 1, j - 1);
            if ((isGoalFound = getDirectionSuccessor(i, j, southWestDirection, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }
        }
    }
    console.log(isGoalFound);

    if (false == isGoalFound) {
        console.log("Path to goal is impossible.");
        return false;
    }

    return cells;
}
