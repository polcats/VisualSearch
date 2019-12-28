class Frame {
    constructor() {
        this.reset();
    }

    reset() {
        this.currentNode = undefined;
        this.directions = [];
    }

    addDirection(position) {
        if (Array == position.constructor) {
            for (const e in position) {
                this.directions.push(e);
            }

            return;
        }

        this.directions.push(position);
    }
}

class Animation {
    constructor() {
        this.frames = new Array();
    }

    addFrame(frame) {
        this.frames.push(frame);
    }
}

class Animator {
    static setNodeColor(location, nodeType) {
        switch (nodeType) {
            case "origin": {
                console.log("origin");
                $("#" + location.row + "-" + location.col).addClass("origin-node");
                break;
            }
            case "direction": {
                console.log("direction");
                $("#" + location.row + "-" + location.col).addClass("direction-node");
                break;
            }
        }
    }

    static removeNodeColors() {
        $(".table-cell").removeClass("origin-node direction-node");
    }

    static playAnimation(animation) {
        let frames = animation.frames;
        console.log(frames.length);
        for (let i = 0; i < frames.length; ++i) {
            // reset previous node colors
            if (i > 0) {
                // this.removeNodeColors();
            }

            // highlight current node
            this.setNodeColor(frames[i].currentNode, "origin");

            // highlight available directions
            let directions = frames[i].directions;
            if (0 != directions.length) {
                for (let j = 0; j < directions.length; ++j) {
                    this.setNodeColor(directions[j], "direction");
                }
            }
        }
    }
}

export { Frame, Animation, Animator };
