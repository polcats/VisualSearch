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

        let i = src.row;
        let j = src.col;
        cells[i][j].goalDistToSuccessor = 0;
        cells[i][j].srcDistToSuccessor = 0;
        cells[i][j].heuristicValue = 0;
        cells[i][j].pRow = i;
        cells[i][j].pCol = j;

        let openList = new Set();
        openList.add(new MoveCost(0.0, new CellPosition(i, j)));

        let isGoalFound = false;
        while (openList.size != 0 && !isGoalFound) {
            const currentNode = openList.values().next().value;
            openList.delete(currentNode);

            i = currentNode.pos.row;
            j = currentNode.pos.col;
            closedList[i][j] = true;

            // Direction Successors
            if ((isGoalFound = Utility.getDirectionSuccessor(i, j, "N", dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor(i, j, "S", dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor(i, j, "E", dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ((isGoalFound = Utility.getDirectionSuccessor(i, j, "W", dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ("all" === allowedDirections) {
                if ((isGoalFound = Utility.getDirectionSuccessor(i, j, "NE", dest, cells, openList, closedList, grid, heuristic))) {
                    break;
                }

                if ((isGoalFound = Utility.getDirectionSuccessor(i, j, "NW", dest, cells, openList, closedList, grid, heuristic))) {
                    break;
                }

                if ((isGoalFound = Utility.getDirectionSuccessor(i, j, "SE", dest, cells, openList, closedList, grid, heuristic))) {
                    break;
                }

                if ((isGoalFound = Utility.getDirectionSuccessor(i, j, "SW", dest, cells, openList, closedList, grid, heuristic))) {
                    break;
                }
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
