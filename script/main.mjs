import { ROW, COL, CellPosition } from "./utilities.mjs";
import { Interactions } from "./interactions.mjs";

const cellDimension = 70;

let aSrc = new CellPosition(0, 0);
let aDest = new CellPosition(ROW - 1, COL - 1);
let aGrid = [];

(function initGrid() {
    for (let i = 0; i < ROW; ++i) {
        aGrid[i] = new Array(COL);
        for (let j = 0; j < COL; ++j) {
            aGrid[i][j] = 0;
        }
    }
})();

(function generateTableCells() {
    $("#cell-table").css({
        width: COL * cellDimension + "px",
        height: ROW * cellDimension + "px"
    });

    for (let i = 0; i < ROW; ++i) {
        let row = $("<tr></tr>");
        for (let j = 0; j < COL; ++j) {
            let col = $("<td></td>", {
                id: i + "-" + j,
                class: "table-cell"
            }).css({
                width: cellDimension + "px",
                height: cellDimension + "px"
            });
            row.append(col);
        }

        $("#cell-table").append(row);
    }
})();

(function placeStartAndGoalIcons() {
    let aSrcIcon = $("<img />", {
        class: "drag-icon",
        src: "images/icons/start.png",
        draggable: "true",
        id: "start-icon",
        title: "Drag me!"
    });
    $("td#" + aSrc.row + "-" + aSrc.col).append(aSrcIcon);

    let aDestIcon = $("<img />", {
        class: "drag-icon",
        src: "images/icons/finish.png",
        draggable: "true",
        id: "goal-icon",
        title: "Drag me!"
    });
    $("td#" + aDest.row + "-" + aDest.col).append(aDestIcon);
})();

(function setElementEvents() {
    // Adding blocks
    let $blocked = $(".table-cell").mousedown(function() {
        // add-block mode is off
        if (!$("input#add-block").hasClass("active-button")) {
            return;
        }

        // disable adding blocks in icon locations
        if (1 === this.childNodes.length) {
            return;
        }

        $(this).toggleClass("blocked");
        let flag = $(this).hasClass("blocked");
        let cellIndices = this.id.split("-");
        aGrid[cellIndices[0]][cellIndices[1]] = flag ? 1 : 0;

        $blocked.on("mouseenter.blocked", function() {
            // disable adding blocks in icon locations
            if (1 === this.childNodes.length) {
                return;
            }

            $(this).toggleClass("blocked", flag);

            let cellIndices = this.id.split("-");
            aGrid[cellIndices[0]][cellIndices[1]] = flag ? 1 : 0;
        });
    });

    $(document).mouseup(function() {
        $blocked.off("mouseenter.blocked");
    });

    // Icon drag-and-drop
    $(".table-cell")
        .on("drop", function() {
            Interactions.drop(event, aSrc, aDest);
        })
        .on("dragover", function() {
            Interactions.allowDrop(event);
        })
        .on("mousedown", function() {
            return Interactions.isDraggable(this);
        })
        .on("contextmenu", function() {
            return false;
        });

    $("#start-icon").on("dragstart", function() {
        if ($("input#add-block").hasClass("active-button")) {
            return false;
        }

        Interactions.drag(event, "start");
    });

    $("#goal-icon").on("dragstart", function() {
        if ($("input#add-block").hasClass("active-button")) {
            return false;
        }

        Interactions.drag(event, "goal");
    });

    // Buttons
    $("#find-path").on("click", function() {
        const algorithm = $("select#algorithm")
            .children("option:selected")
            .val();

        const heuristic = $("select#heuristics")
            .children("option:selected")
            .val();

        const movement = $("select#movements")
            .children("option:selected")
            .val();

        Interactions.findPath(aGrid, aSrc, aDest, heuristic, movement, algorithm);
    });

    $("#add-block").on("click", function() {
        Interactions.toggleAddBlocks();
    });

    $("#reset-all").on("click", function() {
        Interactions.resetAll(aGrid);
    });
})();
