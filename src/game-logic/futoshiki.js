"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stack_1 = require("./stack");
function initializeBounds(futoshiki) {
    var size = futoshiki.state[0].length;
    var bounds = [];
    for (var i = 0; i < size; i++) {
        bounds[i] = [];
        for (var j = 0; j < size; j++) {
            if (futoshiki.state[i][j] === 0) {
                bounds[i][j] = {
                    value: futoshiki.state[i][j],
                    lowerBound: 1,
                    upperBound: size
                };
            }
            else {
                bounds[i][j] = {
                    value: futoshiki.state[i][j],
                    lowerBound: futoshiki.state[i][j],
                    upperBound: futoshiki.state[i][j]
                };
            }
        }
    }
    var boundedFutoshiki = {
        state: bounds,
        ineq: futoshiki.ineq
    };
    var stack = new stack_1.Stack();
    // Initialize Lower Bounds
    for (var _i = 0, _a = boundedFutoshiki.ineq; _i < _a.length; _i++) {
        var ineq = _a[_i];
        stack.push(boundedFutoshiki.state[ineq[1][0]][ineq[1][1]]);
    }
    while (!stack.isEmpty()) {
        var cell = stack.pop();
        for (var _b = 0, _c = boundedFutoshiki.ineq; _b < _c.length; _b++) {
            var ineq = _c[_b];
            if (cell === boundedFutoshiki.state[ineq[1][0]][ineq[1][1]]) {
                if (boundedFutoshiki.state[ineq[0][0]][ineq[0][1]].lowerBound <= cell.lowerBound) {
                    boundedFutoshiki.state[ineq[0][0]][ineq[0][1]].lowerBound = cell.lowerBound + 1;
                    stack.push(boundedFutoshiki.state[ineq[0][0]][ineq[0][1]]);
                }
            }
        }
    }
    // Initiliaze Upper Bounds
    for (var _d = 0, _e = boundedFutoshiki.ineq; _d < _e.length; _d++) {
        var ineq = _e[_d];
        stack.push(boundedFutoshiki.state[ineq[0][0]][ineq[0][1]]);
    }
    while (!stack.isEmpty()) {
        var cell = stack.pop();
        for (var _f = 0, _g = boundedFutoshiki.ineq; _f < _g.length; _f++) {
            var ineq = _g[_f];
            if (cell === boundedFutoshiki.state[ineq[0][0]][ineq[0][1]]) {
                if (boundedFutoshiki.state[ineq[1][0]][ineq[1][1]].upperBound >= cell.upperBound) {
                    boundedFutoshiki.state[ineq[1][0]][ineq[1][1]].upperBound = cell.upperBound - 1;
                    stack.push(boundedFutoshiki.state[ineq[1][0]][ineq[1][1]]);
                }
            }
        }
    }
    return boundedFutoshiki;
}
var exampleFutoshiki = {
    state: [
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 0]
    ],
    ineq: [
        [[1, 0], [1, 1]],
        [[2, 0], [1, 0]],
        [[3, 1], [3, 2]],
    ]
};
var result = initializeBounds(exampleFutoshiki);
for (var i = 0; i < 4; i++) {
    console.log(result.state[i]);
}
