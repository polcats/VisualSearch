import { ROW, COL, INIT_VALUE, CellPosition, MoveCost, Cell, Utility } from "./utilities.mjs";

class Algorithms {
    static aStarSearch(grid, src, dest, heuristic, allowedDirections) {
        if (!Utility.isValidPosition(src) || !Utility.isValidPosition(dest)) {
            console.log("Invalid source or destination.");
            return false;
        }

        if (!Utility.isNotBlocked(grid, src) || !Utility.isNotBlocked(grid, dest)) {
            console.log("Blocked source or destination.");
            return false;
        }

        if (Utility.isGoal(src, dest)) {
            console.log("Already at goal pos.");
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

        let row = src.row;
        let col = src.col;
        cells[row][col].goalDistToSuccessor = 0;
        cells[row][col].srcDistToSuccessor = 0;
        cells[row][col].heuristicValue = 0;
        cells[row][col].pRow = row;
        cells[row][col].pCol = col;

        let openList = new Set();
        openList.add(new MoveCost(0.0, new CellPosition(row, col)));

        let isGoalFound = false;
        while (openList.size != 0 && !isGoalFound) {
            const currentNode = openList.values().next().value;
            openList.delete(currentNode);

            row = currentNode.pos.row;
            col = currentNode.pos.col;
            closedList[row][col] = true;

            // Direction Successors
            if ((isGoalFound = Utility.getDirectionSuccessor("N", row, col, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor("S", row, col, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor("E", row, col, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor("W", row, col, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ("all" != allowedDirections) {
                continue;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor("NE", row, col, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor("NW", row, col, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor("SE", row, col, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor("SW", row, col, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }
        }

        if (false == isGoalFound) {
            console.log("Path to goal is impossible.");
            return false;
        }

        return cells;
    }
}

export { Algorithms };
