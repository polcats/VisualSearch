(function generateCells() {
    for (let i = 0; i < ROW; ++i) {
        let row = $("<tr></tr>");
        for (let j = 0; j < COL; ++j) {
            let col = $("<td></td>", {
                id: i + "-" + j,
                class: "table-cell",
                ondrop: "drop(event)",
                ondragover: "allowDrop(event)",
                draggable: "false"
            });
            row.append(col);
        }

        $("#cell-table").append(row);
    }
})();

let isAddingBlocks = false;
function toggleAddBlocks() {
    isAddingBlocks = false == isAddingBlocks ? true : false;
    if (isAddingBlocks) {
        $("input#add-block").addClass("active-button");
        return;
    }

    $("input#add-block").removeClass("active-button");
}

function setCellColor(pos, color) {
    $("#" + pos.row + "-" + pos.col).addClass(color);
}

let aSrc = new Position(0, 0);
let aDest = new Position(9, 9);

let aSrcIcon = $("<img />", {
    src: "images/icons/home.png",
    draggable: "true",
    ondragstart: "drag(event, 'start')",
    id: "start-icon"
});
$("td#0-0").append(aSrcIcon);

let aDestIcon = $("<img />", {
    src: "images/icons/flags.png",
    draggable: "true",
    ondragstart: "drag(event, 'goal')",
    id: "goal-icon"
});
$("td#9-9").append(aDestIcon);

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

(function setBlockedCellsColor() {
    for (let i = 0; i < ROW; ++i) {
        for (let j = 0; j < COL; ++j) {
            let currentPosition = new Position(i, j);
            if (!Utility.isNotBlocked(aGrid, currentPosition)) {
                setCellColor(currentPosition, "blocked");
            }
        }
    }
})();

function findPath() {
    clearPaths();

    let cells = aStarSearch(aGrid, aSrc, aDest, "manhattan");
    if (cells != false) {
        Utility.tracePath(cells, aDest);
    }
}

function clearPaths() {
    $("td.path").removeClass("path");
}

function clearBlocks() {
    $("td.blocked").removeClass("blocked");
}

function resetAll() {
    clearPaths();
    clearBlocks();
    isAddingBlocks = false;
    $("input#add-block").removeClass("active-button");

    for (let i = 0; i < ROW; ++i) {
        for (let j = 0; j < COL; ++j) {
            aGrid[i][j] = 0;
        }
    }
}

let $blocked = $(".table-cell").mousedown(function() {
    if (!isAddingBlocks) {
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

function allowDrop(ev) {
    ev.preventDefault();
}

let currentDragged = "";
function updateDragged(id) {
    currentDragged = id;
}

function drag(ev, id) {
    currentDragged = id;
    ev.dataTransfer.setData(id, ev.target.id);
}

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
        aSrc = new Position(cellIndices[0], cellIndices[1]);
    } else if (currentIcon.id == "goal-icon") {
        aDest = new Position(cellIndices[0], cellIndices[1]);
    }
}
