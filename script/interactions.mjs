import { Algorithms } from "./algorithms.mjs";
import { ROW, COL, CellPosition, Utility } from "./utilities.mjs";

class Interactions {
    static toggleAddBlocks() {
        this.clearPaths();

        let addBlockActive = $("input#add-block")
            .toggleClass("active-button")
            .hasClass("active-button");

        if (addBlockActive) {
            this.clearPaths();
            $("#find-path").attr("disabled", "disabled");

            return;
        }

        $("#find-path").removeAttr("disabled");
    }

    static clearPaths() {
        $(".table-cell").removeClass("path route");
        Utility.stopTrace();
    }

    static clearBlocks() {
        $("td.blocked").removeClass("blocked");
    }

    static allowDrop(ev) {
        ev.preventDefault();
    }

    static isDraggable(item) {
        if (undefined === item.childNodes[0]) {
            return false;
        }

        return true;
    }

    currentDragged = "";
    static drag(ev, id) {
        this.currentDragged = id;
        ev.dataTransfer.setData(id, ev.target.id);
    }

    static drop(ev, aSrc, aDest) {
        ev.preventDefault();

        let target = ev.target;

        // disable dropping the icons in the same cell or in bloced cells
        if ("IMG" === target.tagName || target.childNodes.length || $(target).hasClass("blocked")) {
            return;
        }

        this.clearPaths();

        let data = ev.dataTransfer.getData(this.currentDragged);
        let currentIcon = document.getElementById(data);

        if (null === currentIcon) {
            return;
        }

        target.appendChild(currentIcon);

        let parentId = currentIcon.parentNode.id;
        let cellIndices = parentId.split("-");
        let newPosition = new CellPosition(cellIndices[0], cellIndices[1]);
        if (currentIcon.id == "start-icon") {
            aSrc.row = newPosition.row;
            aSrc.col = newPosition.col;
        } else if (currentIcon.id == "goal-icon") {
            aDest.row = newPosition.row;
            aDest.col = newPosition.col;
        }
    }

    static findPath(aGrid, aSrc, aDest, heuristic, allowedDirections) {
        this.clearPaths();

        let result = Algorithms.aStarSearch(aGrid, aSrc, aDest, heuristic, allowedDirections);

        if (result != false) {
            Utility.tracePath(result, aDest);
        }
    }

    static clearGrid(aGrid) {
        for (let i = 0; i < ROW; ++i) {
            for (let j = 0; j < COL; ++j) {
                aGrid[i][j] = 0;
            }
        }
    }

    static resetAll(aGrid) {
        Utility.stopTrace();
        this.clearGrid(aGrid);
        this.clearPaths();
        this.clearBlocks();
        $("input#add-block").removeClass("active-button");
        $("#find-path").removeAttr("disabled");
    }
}

export { Interactions };
