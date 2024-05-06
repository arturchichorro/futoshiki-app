var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// level 11 4x4
var exampleFutoshiki = {
    state: [
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
var sevenFutoshiki = {
    state: [
        [0, 1, 0, 0, 4, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 5, 4, 1, 2, 0],
        [0, 6, 3, 4, 5, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 6, 0]
    ],
    ineq: [
        [[1, 0], [0, 0]],
        [[0, 4], [0, 3]],
        [[1, 5], [0, 5]],
        [[2, 0], [2, 1]],
        [[3, 2], [4, 2]],
        [[5, 1], [5, 2]],
    ]
};
// // 9x9 takes too much work to type the ineqs
// const biggerFutoshiki: Futoshiki = {
//     state: [
//         [0, 8, 6, 0, 0, 0, 2, 7, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 2, 0, 0, 0, 0, 0, 3, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 1, 0, 0, 0, 0, 0, 8, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 9, 8, 0, 0, 0, 3, 1, 0]
//     ],
//     ineq: [
//         [[]]
//     ]
// }
// Checks if all elements of the grid are filled (0 is equivalent to not being filled)
function isFutoshikiComplete(state) {
    var n = state[0].length;
    var result = true;
    outerLoop: for (var col = 0; col < n; col++) {
        for (var row = 0; row < n; row++) {
            if (state[col][row] === 0) {
                result = false;
                break outerLoop;
            }
        }
    }
    return result;
}
// Verifies whether a certain number can be placed in a certain coordinate
function isValidPlacement(state, ineq, col, row, value) {
    var n = state[0].length;
    // Check columns
    for (var colIdx = 0; colIdx < n; colIdx++) {
        if (colIdx === col) {
            continue;
        }
        if (state[colIdx][row] === value) {
            return false;
        }
    }
    // Check rows
    for (var rowIdx = 0; rowIdx < n; rowIdx++) {
        if (rowIdx === row) {
            continue;
        }
        if (state[col][rowIdx] === value) {
            return false;
        }
    }
    // Check inequalities
    for (var i = 0; i < ineq.length; i++) {
        for (var j = 0; j < 2; j++) {
            var ineqCol = ineq[i][j][0];
            var ineqRow = ineq[i][j][1];
            if (col === ineqCol && row === ineqRow) {
                if (j % 2 === 0) {
                    if (value <= state[ineq[i][1][0]][ineq[i][1][1]]) {
                        return false;
                    }
                }
                else {
                    if (value >= state[ineq[i][0][0]][ineq[i][0][1]]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
function chooseNextEmptyCell(state) {
    var n = state[0].length;
    for (var col = 0; col < n; col++) {
        for (var row = 0; row < n; row++) {
            if (state[col][row] === 0) {
                return [col, row];
            }
        }
    }
    return [];
}
function solveFutoshiki(problem, solutions) {
    // TODO: Adicionar check para ver se initial state é possível
    if (solutions === void 0) { solutions = []; }
    if (isFutoshikiComplete(problem.state)) {
        solutions.push(problem.state);
        return solutions;
    }
    else {
        var cell = chooseNextEmptyCell(problem.state);
        if (cell.length === 0) {
            return solutions;
        }
        for (var i = 1; i < problem.state[0].length + 1; i++) {
            if (isValidPlacement(problem.state, problem.ineq, cell[0], cell[1], i)) {
                var newState = __spreadArray([], problem.state.map(function (row) { return __spreadArray([], row, true); }), true); // Create a deep copy
                newState[cell[0]][cell[1]] = i;
                solveFutoshiki({ state: newState, ineq: problem.ineq }, solutions);
            }
        }
        return solutions;
    }
}
console.log(solveFutoshiki(sevenFutoshiki));
