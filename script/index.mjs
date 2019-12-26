import { ROW, COL, CellPosition, Utility } from "./utilities.mjs";
import { Algorithms } from "./algorithms.mjs";
import { toggleAddBlocks, clearPaths, clearBlocks, allowDrop, currentDragged, drag } from "./interface.mjs";

(function generateCells() {
    for (let i = 0; i < ROW; ++i) {
        let row = $("<tr></tr>");
        for (let j = 0; j < COL; ++j) {
            let col = $("<td></td>", {
                id: i + "-" + j,
                class: "table-cell",
                draggable: "false"
            });
            row.append(col);
        }

        $("#cell-table").append(row);
    }
})();

$(".table-cell").on("drop", function() {
    drop(event);
});

$(".table-cell").on("dragover", function() {
    allowDrop(event);
});

let aSrc = new CellPosition(0, 0);
let aDest = new CellPosition(9, 9);

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
$("#start-icon").on("dragstart", function() {
    drag(event, "start");
});
$("#goal-icon").on("dragstart", function() {
    drag(event, "goal");
});

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

let $blocked = $(".table-cell").mousedown(function() {
    if (!$("input#add-block").hasClass("active-button")) {
        return;
    }

    $(this).toggleClass("blocked");
    let flag = $(this).hasClass("blocked");
    let cellIndices = this.id.split("-");
    aGrid[cellIndices[0]][cellIndices[1]] = flag ? 1 : 0;
    console.log(cellIndices);

    $blocked.on("mouseenter.blocked", function() {
        $(this).toggleClass("blocked", flag);

        let cellIndices = this.id.split("-");
        aGrid[cellIndices[0]][cellIndices[1]] = flag ? 1 : 0;
        console.log(cellIndices);
    });
});

$(document).mouseup(function() {
    $blocked.off("mouseenter.blocked");
});

$("#find-path").on("click", function() {
    findPath();
});

$("#add-block").on("click", function() {
    toggleAddBlocks();
});

$("#reset-all").on("click", function() {
    resetAll();
});

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData(currentDragged);
    let currentIcon = document.getElementById(data);

    if (null === currentIcon) {
        return;
    }

    ev.target.appendChild(currentIcon);

    let parentId = currentIcon.parentNode.id;
    let cellIndices = parentId.split("-");

    if (currentIcon.id == "start-icon") {
        aSrc = new CellPosition(cellIndices[0], cellIndices[1]);
    } else if (currentIcon.id == "goal-icon") {
        aDest = new CellPosition(cellIndices[0], cellIndices[1]);
    }
}

function findPath() {
    clearPaths();

    let cells = Algorithms.aStarSearch(aGrid, aSrc, aDest, "manhattan");
    if (cells != false) {
        Utility.tracePath(cells, aDest);
    }
}

function resetAll() {
    clearPaths();
    clearBlocks();
    $("input#add-block").removeClass("active-button");

    for (let i = 0; i < ROW; ++i) {
        for (let j = 0; j < COL; ++j) {
            aGrid[i][j] = 0;
        }
    }
}
