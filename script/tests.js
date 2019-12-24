function assertEquals(value1, value2, testName) {
    let result = value1 === value2 ? "PASSED" : "FAILED";
    console.log(result + ": " + testName.name);
}

class TestUtility {
    static run() {
        this.test_isValidLocation_invalidLocations();
        this.test_isNotBlocked_blockedLocations();
    }

    static test_isValidLocation_invalidLocations() {
        const expected = false;
        const invalidLocations = [[-1, 0], [0, -1], [ROW + 1, 0], [COL + 1, 0], [("a", 0)], ["b", 0]];
        let actual = 0;

        for (let i = 0; i < invalidLocations.length; ++i) {
            // console.log(invalidLocations[i]);
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
            actual = Utility.isNotBlocked(grid, blockedLocations[i][0], blockedLocations[i][1]);
            assertEquals(expected, actual, this.test_isNotBlocked_blockedLocations);
        }
    }
}

TestUtility.run();
