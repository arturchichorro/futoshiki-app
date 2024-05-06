// level 11 4x4
var exampleFutoshiki = {
    initState: [
        [0, 0, 0, 0],
        [0, 0, 0, 2],
        [2, 0, 0, 0],
        [0, 0, 0, 4]
    ],
    ineq: [
        [[0, 2], [0, 3]],
        [[1, 3], [2, 3]],
    ]
};
function isValidMove(grid, row, col, num) {
    var size = grid.length;
    // Check if the number already exists in the row or column
    for (var i = 0; i < size; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }
    // Check for inequalities
    for (var _i = 0, _a = exampleFutoshiki.ineq; _i < _a.length; _i++) {
        var _b = _a[_i], row1 = _b[0], col1 = _b[1];
        if ((row === row1[0] && col === col1[0]) && grid[row1[1]][col1[1]] !== 0 && grid[row][col] >= grid[row1[1]][col1[1]]) {
            return false;
        }
        if ((row === row1[1] && col === col1[1]) && grid[row1[0]][col1[0]] !== 0 && grid[row][col] <= grid[row1[0]][col1[0]]) {
            return false;
        }
    }
    return true;
}
function solveFutoshiki(grid) {
    var size = grid.length;
    var solutions = [];
    function solve() {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (grid[i][j] === 0) {
                    for (var num = 1; num <= size; num++) {
                        if (isValidMove(grid, i, j, num)) {
                            grid[i][j] = num;
                            if (solve()) {
                                solutions.push(JSON.parse(JSON.stringify(grid)));
                            }
                            grid[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    solve();
    return solutions;
}
var solutions = solveFutoshiki(exampleFutoshiki.initState);
console.log("Number of unique solutions:", solutions.length);
console.log("Solutions:");
solutions.forEach(function (solution, index) {
    console.log("Solution ".concat(index + 1, ":"));
    console.log(solution);
});
