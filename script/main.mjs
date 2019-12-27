import { ROW, COL, CellPosition } from "./utilities.mjs";
import { Interactions } from "./interactions.mjs";

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

(function generateCells() {
    for (let i = 0; i < ROW; ++i) {
        let row = $("<tr></tr>");
        for (let j = 0; j < COL; ++j) {
            let col = $("<td></td>", {
                id: i + "-" + j,
                class: "table-cell"
            });
            row.append(col);
        }

        $("#cell-table").append(row);
    }
})();

(function placeStartAndGoalIcons() {
    let aSrcIcon = $("<img />", {
        src: "images/icons/home.png",
        draggable: "true",
        id: "start-icon"
    });
    $("td#0-0").append(aSrcIcon);

    let aDestIcon = $("<img />", {
        src: "images/icons/flags.png",
        draggable: "true",
        id: "goal-icon"
    });
    $("td#9-9").append(aDestIcon);
})();

(function setElementEvents() {
    let $blocked = $(".table-cell").mousedown(function() {
        if (!$("input#add-block").hasClass("active-button")) {
            return;
        }

        $(this).toggleClass("blocked");
        let flag = $(this).hasClass("blocked");
        let cellIndices = this.id.split("-");
        aGrid[cellIndices[0]][cellIndices[1]] = flag ? 1 : 0;

        $blocked.on("mouseenter.blocked", function() {
            $(this).toggleClass("blocked", flag);

            let cellIndices = this.id.split("-");
            aGrid[cellIndices[0]][cellIndices[1]] = flag ? 1 : 0;
        });
    });

    $(document).mouseup(function() {
        $blocked.off("mouseenter.blocked");
    });

    $(".table-cell")
        .on("drop", function() {
            let result = Interactions.drop(event);

            if (result.length) {
                if ("start-icon" == result[0]) {
                    aSrc = result[1];
                } else if ("goal-icon" == result[0]) {
                    aDest = result[1];
                }
            }
        })
        .on("dragover", function() {
            Interactions.allowDrop(event);
        })
        .on("mousedown", function() {
            return Interactions.isDraggable(this);
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

    $("#find-path").on("click", function() {
        Interactions.findPath(aGrid, aSrc, aDest, "manhattan");
    });

    $("#add-block").on("click", function() {
        Interactions.toggleAddBlocks();
    });

    $("#reset-all").on("click", function() {
        Interactions.resetAll(aGrid);
    });
})();
