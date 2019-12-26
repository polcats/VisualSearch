(function generateCells() {
    for (let i = 0; i < ROW; ++i) {
        let row = document.createElement("tr");
        for (let j = 0; j < COL; ++j) {
            let col = document.createElement("td");
            col.setAttribute("id", i + "-" + j);
            col.innerHTML = i + ":" + j;
            row.appendChild(col);
        }
        document.getElementById("cell-table").appendChild(row);
    }
})();

function setCellColor(location, color) {
    let cell = document.getElementById(location.row + "-" + location.col);
    cell.setAttribute("class", color);
}

let aGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

let aSrc = new Location(2, 3);
let aDest = new Location(9, 9);

let cells = aStarSearch(aGrid, aSrc, aDest);

if (cells) {
    Utility.tracePath(cells, aDest);
}

setCellColor(aSrc, "src");
setCellColor(aDest, "dest");
