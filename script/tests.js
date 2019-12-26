function assertEquals(value1, value2, testName) {
    let result = value1 === value2 ? "PASSED" : "FAILED";

    if ("FAILED" === result) {
        console.log();
        console.error(result + ": " + testName.name + "\n >> " + value1 + " === " + value2);
        return;
    }
}

class TestUtility {
    static run() {
        this.test_isValidPosition_invalidPositions();
        this.test_isNotBlocked_blockedPositions();
        this.test_isGoal();
        this.test_getHeuristicValue_manhattan();
    }

    static test_isValidPosition_invalidPositions() {
        const expected = false;
        const invalidPositions = [[-1, 0], [0, -1], [ROW + 1, 0], [COL + 1, 0], [("a", 0)], ["b", 0]];
        let actual = 0;

        for (let i = 0; i < invalidPositions.length; ++i) {
            actual = Utility.isValidPosition(new Position(invalidPositions[i][0], invalidPositions[i][1]));
            assertEquals(expected, actual, this.test_isValidPosition_invalidPositions);
        }
    }

    static test_isNotBlocked_blockedPositions() {
        const expected = false;
        const grid = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        const blockedPositions = [
            [0, 0],
            [1, 1],
            [2, 2]
        ];

        let actual = 0;
        for (let i = 0; i < blockedPositions.length; ++i) {
            actual = Utility.isNotBlocked(grid, new Position(blockedPositions[i][0], blockedPositions[i][1]));
            assertEquals(expected, actual, this.test_isNotBlocked_blockedPositions);
        }
    }

    static test_isGoal() {
        let expected = false;
        let src = new Position(0, 0);
        let dest = new Position(5, 5);
        let actual = Utility.isGoal(src, dest);
        assertEquals(expected, actual, this.test_isGoal);

        expected = true;
        src = new Position(5, 5);
        actual = Utility.isGoal(src, dest);
        assertEquals(expected, actual, this.test_isGoal);
    }

    static test_getHeuristicValue_manhattan() {
        let expected = 0;
        let src = new Position(0, 0);
        let dest = new Position(0, 0);
        let actual = Utility.getHeuristicValue("manhattan", src, dest);
        assertEquals(expected, actual, this.test_getHeuristicValue_manhattan);

        expected = 10;
        src = new Position(0, 0);
        dest = new Position(5, 5);
        actual = Utility.getHeuristicValue("manhattan", src, dest);
        assertEquals(expected, actual, this.test_getHeuristicValue_manhattan);

        expected = 20;
        src = new Position(0, 0);
        dest = new Position(10, 10);
        actual = Utility.getHeuristicValue("manhattan", src, dest);
        assertEquals(expected, actual, this.test_getHeuristicValue_manhattan);
    }
}

TestUtility.run();
