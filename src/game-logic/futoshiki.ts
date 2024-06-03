import { Stack } from "./stack";

interface Futoshiki {
    state: number[][];
    ineq: number[][][];
}

interface boundedCell {
    value: number;
    lowerBound: number;
    upperBound: number;
}

interface BoundedFutoshiki {
    state: boundedCell[][];
    ineq: number[][][];
}

function initializeBounds(futoshiki: Futoshiki): BoundedFutoshiki {
    let size = futoshiki.state[0].length;
    let bounds: boundedCell[][] = [];
    for (let i = 0; i < size; i++) {
        bounds[i] = [];
        for (let j = 0; j < size; j++) {

            if (futoshiki.state[i][j] === 0) {
                bounds[i][j] = {
                    value: futoshiki.state[i][j],
                    lowerBound: 1,
                    upperBound: size
                }
            } else {
                bounds[i][j] = {
                    value: futoshiki.state[i][j],
                    lowerBound: futoshiki.state[i][j],
                    upperBound: futoshiki.state[i][j]
                }
            }
        }
    }

    let boundedFutoshiki: BoundedFutoshiki = {
        state: bounds,
        ineq: futoshiki.ineq
    }

    let stack = new Stack<boundedCell>();

    // Initialize Lower Bounds
    for (const ineq of boundedFutoshiki.ineq) {
        stack.push(boundedFutoshiki.state[ineq[1][0]][ineq[1][1]]);
    }

    while (!stack.isEmpty()) {
        let cell = stack.pop();
        for (const ineq of boundedFutoshiki.ineq) {
            if (cell === boundedFutoshiki.state[ineq[1][0]][ineq[1][1]]) {
                if (boundedFutoshiki.state[ineq[0][0]][ineq[0][1]].lowerBound <= cell.lowerBound) {
                    boundedFutoshiki.state[ineq[0][0]][ineq[0][1]].lowerBound = cell.lowerBound + 1;
                    stack.push(boundedFutoshiki.state[ineq[0][0]][ineq[0][1]]);
                }
            }
        }
    }

    // Initiliaze Upper Bounds
    for (const ineq of boundedFutoshiki.ineq) {
        stack.push(boundedFutoshiki.state[ineq[0][0]][ineq[0][1]]);
    }

    while (!stack.isEmpty()) {
        let cell = stack.pop();
        for (const ineq of boundedFutoshiki.ineq) {
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



const exampleFutoshiki: Futoshiki = {
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
}

let result = initializeBounds(exampleFutoshiki);
for (let i = 0; i < 4; i++) {
    console.log(result.state[i]);
}