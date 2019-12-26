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

let isAddingBlocks = false;
function toggleAddBlocks() {
    isAddingBlocks = false == isAddingBlocks ? true : false;
    if (isAddingBlocks) {
        $("input#add-block").addClass("active-button");
        return;
    }

    $("input#add-block").removeClass("active-button");
}

function setCellColor(location, color) {
    $("#" + location.row + "-" + location.col).addClass(color);
}

let aSrc = new Location(6, 0);
let aDest = new Location(9, 9);
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

setCellColor(aSrc, "src");
setCellColor(aDest, "dest");

(function setBlockedCellsColor() {
    for (let i = 0; i < ROW; ++i) {
        for (let j = 0; j < COL; ++j) {
            let currentLocation = new Location(i, j);
            if (!Utility.isNotBlocked(aGrid, currentLocation)) {
                setCellColor(currentLocation, "blocked");
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
    toggleAddBlocks();

    for (let i = 0; i < ROW; ++i) {
        for (let j = 0; j < COL; ++j) {
            aGrid[i][j] = 0;
        }
    }
}
