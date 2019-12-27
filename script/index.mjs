import { ROW, COL, CellPosition } from "./utilities.mjs";
import { Interactions } from "./interface.mjs";

let aSrc = new CellPosition(0, 0);
let aDest = new CellPosition(9, 9);
let aGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

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
    $("#start-icon").on("dragstart", function() {
        Interactions.drag(event, "start");
    });

    let aDestIcon = $("<img />", {
        src: "images/icons/flags.png",
        draggable: "true",
        id: "goal-icon"
    });
    $("td#9-9").append(aDestIcon);
    $("#goal-icon").on("dragstart", function() {
        Interactions.drag(event, "goal");
    });
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
