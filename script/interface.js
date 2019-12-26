(function generateCells() {
    for (let i = 0; i < ROW; ++i) {
        let row = $("<tr></tr>");

        for (let j = 0; j < COL; ++j) {
            let col = $("<td></td>", {
                id: i + "-" + j,
                class: "table-cell"
            }).text(i + ":" + j);

            row.append(col);
        }

        $("#cell-table").append(row);
    }
})();

let isAddingBlocks = false;
function toggleAddBlocks() {
    isAddingBlocks = false == isAddingBlocks ? true : false;
    console.log(isAddingBlocks);
}

function setCellColor(location, color) {
    $("#" + location.row + "-" + location.col).addClass(color);
}

let aGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
];

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

let aSrc = new Location(6, 0);
let aDest = new Location(9, 9);

let cells = aStarSearch(aGrid, aSrc, aDest, "manhattan"); // euclidean

if (cells) {
    Utility.tracePath(cells, aDest);
}

setCellColor(aSrc, "src");
setCellColor(aDest, "dest");
