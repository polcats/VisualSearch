function assertEquals(value1, value2, testName) {
    let result = value1 === value2 ? "PASSED" : "FAILED";
    console.log(result + ": " + testName.name);
    console.log("  " + value1 + " === " + value2);
}

class TestUtility {
    static run() {
        this.test_isValidLocation_invalidLocations();
        this.test_isNotBlocked_blockedLocations();
        this.test_isGoal();
        this.test_getHeuristicValue_manhattan();
    }

    static test_isValidLocation_invalidLocations() {
        const expected = false;
        const invalidLocations = [[-1, 0], [0, -1], [ROW + 1, 0], [COL + 1, 0], [("a", 0)], ["b", 0]];
        let actual = 0;

        for (let i = 0; i < invalidLocations.length; ++i) {
            actual = Utility.isValidLocation(new Location(invalidLocations[i][0], invalidLocations[i][1]));
            assertEquals(expected, actual, this.test_isValidLocation_invalidLocations);
        }
    }

    static test_isNotBlocked_blockedLocations() {
        const expected = false;
        const grid = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        const blockedLocations = [
            [0, 0],
            [1, 1],
            [2, 2]
        ];

        let actual = 0;
        for (let i = 0; i < blockedLocations.length; ++i) {
            actual = Utility.isNotBlocked(grid, new Location(blockedLocations[i][0], blockedLocations[i][1]));
            assertEquals(expected, actual, this.test_isNotBlocked_blockedLocations);
        }
    }

    static test_isGoal() {
        let expected = false;
        let src = new Location(0, 0);
        let dest = new Location(5, 5);
        let actual = Utility.isGoal(src, dest);
        assertEquals(expected, actual, this.test_isGoal);

        expected = true;
        src = new Location(5, 5);
        actual = Utility.isGoal(src, dest);
        assertEquals(expected, actual, this.test_isGoal);
    }

    static test_getHeuristicValue_manhattan() {
        let expected = 0;
        let src = new Location(0, 0);
        let dest = new Location(0, 0);
        let actual = Utility.getHeuristicValue("manhattan", src, dest);
        assertEquals(expected, actual, this.test_getHeuristicValue_manhattan);

        expected = 10;
        src = new Location(0, 0);
        dest = new Location(5, 5);
        actual = Utility.getHeuristicValue("manhattan", src, dest);
        assertEquals(expected, actual, this.test_getHeuristicValue_manhattan);

        expected = 20;
        src = new Location(0, 0);
        dest = new Location(10, 10);
        actual = Utility.getHeuristicValue("manhattan", src, dest);
        assertEquals(expected, actual, this.test_getHeuristicValue_manhattan);
    }
}

TestUtility.run();
