interface Futoshiki {
    state: number[][];
    ineq: number[][][];
}

// level 11 4x4
const exampleFutoshiki: Futoshiki = {
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
}

// Checks if all elements of the grid are filled (0 is equivalent to not being filled)
function isFutoshikiComplete(state: number[][]): boolean {

    const n = state[0].length;
    let result = true;
    outerLoop: for (let col = 0; col < n; col++) {
        for (let row = 0; row < n; row++) {
            if (state[col][row] === 0) {
                result = false;
                break outerLoop;
            }
        }
    }
    return result;
}

// Verifies whether a certain number can be placed in a certain coordinate
function isValidPlacement(state: number[][], coord: number[], value: number) {

}

function solveFutoshiki(problem: Futoshiki): number[][][] {
    let solutions: number[][][] = [];

    if (isFutoshikiComplete(problem.state)) {
        solutions.push(problem.state);
        return solutions;
    } else {

    }

    return solutions;
}





