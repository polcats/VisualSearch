function assertEquals(value1, value2, testName) {
    let result = value1 === value2 ? "PASSED" : "FAILED";
    console.log(result + ": " + testName.name);
}

class TestUtility {
    static run() {
        this.test_isValidLocation_invalidLocations();
    }

    static test_isValidLocation_invalidLocations() {
        const expected = false;

        let invalidLocations = [[-1, 0], [0, -1], [ROW + 1, 0], [COL + 1, 0], [("a", 0)], ["b", 0]];
        let actual = 0;

        for (const e in invalidLocations) {
            actual = Utility.isValidLocation(new Location(invalidLocations[0], invalidLocations[1]));
            assertEquals(expected, actual, this.test_isValidLocation_invalidLocations);
        }
    }
}

TestUtility.run();
