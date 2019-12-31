const ROW = 9;
const COL = 9;
const INIT_VALUE = 1000;

class CellPosition {
    constructor(row, col) {
        this.row = parseInt(row);
        this.col = parseInt(col);
    }
}

class MoveCost {
    constructor(cost, pos) {
        this.cost = cost;
        this.pos = pos;
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
    static isValidPosition(pos) {
        return pos.row >= 0 && pos.row < ROW && pos.col >= 0 && pos.col < COL;
    }

    static isNotBlocked(grid, pos) {
        return grid[pos.row][pos.col] === 0 ? true : false;
    }

    static isGoal(src, dest) {
        return src.row === dest.row && src.col === dest.col;
    }

    static getDirectionCell(direction, row, col) {
        switch (direction) {
            case "N": {
                return new CellPosition(row - 1, col);
            }
            case "S": {
                return new CellPosition(row + 1, col);
            }
            case "E": {
                return new CellPosition(row, col + 1);
            }
            case "W": {
                return new CellPosition(row, col - 1);
            }
            case "NE": {
                return new CellPosition(row - 1, col + 1);
            }
            case "NW": {
                return new CellPosition(row - 1, col - 1);
            }
            case "SE": {
                return new CellPosition(row + 1, col + 1);
            }
            case "SW": {
                return new CellPosition(row + 1, col - 1);
            }
        }
    }

    static getHeuristicValue(heuristic, src, dest) {
        switch (heuristic) {
            case "manhattan": {
                return Math.abs(src.row - dest.row) + Math.abs(src.col - dest.col);
            }
            case "euclidean": {
                return Math.sqrt(Math.pow(src.row - dest.row, 2) + Math.pow(src.col - dest.col, 2));
            }
            case "diagonal": {
                return Math.max(Math.abs(src.row - dest.row), Math.abs(src.col - dest.col));
            }
        }
    }

    static setCellColor(pos, color) {
        $("#" + pos.row + "-" + pos.col).addClass(color);
    }

    static traceRoute = [];
    static tracePath(cells, dest) {
        this.traceRoute = [];

        let row = dest.row;
        let col = dest.col;

        let path = [];
        while (!(cells[row][col].pRow == row && cells[row][col].pCol == col)) {
            path.push(new CellPosition(row, col));
            let row_tmp = cells[row][col].pRow;
            let col_tmp = cells[row][col].pCol;
            row = row_tmp;
            col = col_tmp;
        }
        path.push(new CellPosition(row, col));

        trace(path);

        function trace(path) {
            if (!path.length) {
                $(".route")
                    .addClass("path")
                    .removeClass("route");
                return;
            }

            Utility.setCellColor(path.pop(), "route");

            Utility.traceRoute.push(
                setTimeout(function() {
                    trace(path);
                }, 100)
            );
        }
    }

    static stopTrace() {
        for (let i = 0; i < this.traceRoute.length; ++i) {
            clearTimeout(this.traceRoute[i]);
        }

        $(".table-cell").removeClass("route");
    }

    static getDirectionSuccessor(direction, row, col, dest, cells, openList, closedList, grid, heuristic) {
        direction = this.getDirectionCell(direction, row, col);
        if (Utility.isValidPosition(direction)) {
            let currentCell = cells[direction.row][direction.col];
            if (Utility.isGoal(direction, dest)) {
                console.log("The destination is found!");
                currentCell.pRow = row;
                currentCell.pCol = col;
                return true;
            } else if (false == closedList[direction.row][direction.col] && Utility.isNotBlocked(grid, direction)) {
                let newSrcDistToSuccessor = cells[row][col].srcDistToSuccessor + 1.0;
                let newGoalDistToSuccessor = Utility.getHeuristicValue(heuristic, direction, dest);
                let newHeuristicValue = newSrcDistToSuccessor + newGoalDistToSuccessor;

                if (INIT_VALUE == currentCell.heuristicValue || currentCell.heuristicValue > newHeuristicValue) {
                    openList.add(new MoveCost(newHeuristicValue, direction));

                    currentCell.srcDistToSuccessor = newSrcDistToSuccessor;
                    currentCell.goalDistToSuccessor = newGoalDistToSuccessor;
                    currentCell.heuristicValue = newHeuristicValue;
                    currentCell.pRow = row;
                    currentCell.pCol = col;
                }
                return false;
            }
        }
        return false;
    }
}

export { ROW, COL, INIT_VALUE, CellPosition, MoveCost, Cell, Utility };
