function toggleAddBlocks() {
    $("input#add-block").toggleClass("active-button");
}

function clearPaths() {
    $("td.path").removeClass("path");
}

function clearBlocks() {
    $("td.blocked").removeClass("blocked");
}

function allowDrop(ev) {
    ev.preventDefault();
}

function isDraggable(item) {
    if (undefined === item.childNodes[0]) {
        return false;
    }

    return true;
}

let currentDragged = "";
function drag(ev, id) {
    currentDragged = id;
    ev.dataTransfer.setData(id, ev.target.id);
}

export { currentDragged, isDraggable, toggleAddBlocks, clearPaths, clearBlocks, allowDrop, drag };
