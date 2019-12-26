import { ROW, COL, INIT_VALUE, CellPosition, MoveCost, Cell, Utility } from "./utilities.mjs";

class Algorithms {
    static aStarSearch(grid, src, dest, heuristic) {
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
            let northDirection = new CellPosition(i - 1, j);
            if ((isGoalFound = Utility.getDirectionSuccessor(i, j, northDirection, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            let southDirection = new CellPosition(i + 1, j);
            if ((isGoalFound = Utility.getDirectionSuccessor(i, j, southDirection, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            let eastDirection = new CellPosition(i, j + 1);
            if ((isGoalFound = Utility.getDirectionSuccessor(i, j, eastDirection, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            let westDirection = new CellPosition(i, j - 1);
            if ((isGoalFound = Utility.getDirectionSuccessor(i, j, westDirection, dest, cells, openList, closedList, grid, heuristic))) {
                break;
            }

            if ("manhattan" != heuristic) {
                let northEastDirection = new CellPosition(i - 1, j + 1);
                if ((isGoalFound = Utility.getDirectionSuccessor(i, j, northEastDirection, dest, cells, openList, closedList, grid, heuristic))) {
                    break;
                }

                let northWestDirection = new CellPosition(i - 1, j - 1);
                if ((isGoalFound = Utility.getDirectionSuccessor(i, j, northWestDirection, dest, cells, openList, closedList, grid, heuristic))) {
                    break;
                }

                let southEastDirection = new CellPosition(i + 1, j + 1);
                if ((isGoalFound = Utility.getDirectionSuccessor(i, j, southEastDirection, dest, cells, openList, closedList, grid, heuristic))) {
                    break;
                }

                let southWestDirection = new CellPosition(i + 1, j - 1);
                if ((isGoalFound = Utility.getDirectionSuccessor(i, j, southWestDirection, dest, cells, openList, closedList, grid, heuristic))) {
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
