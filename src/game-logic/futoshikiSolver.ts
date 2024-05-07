interface Futoshiki {
    state: number[][];
    ineq: number[][][];
    // example inequality:
    // ineq: [
    //     [[0, 2], [0, 3]],
    //     [[1, 3], [2, 3]],
    // ]
    // where value at (0,2) is greater than value at (0,3)
    // and value at (1,3) is greater than value at (2,3)
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

// level 7 6x6
const sevenFutoshiki: Futoshiki = {
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
}


// 9x9 takes too much work to type the ineqs
const biggerFutoshiki: Futoshiki = {
    state: [
        [0, 8, 6, 0, 0, 0, 2, 7, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 8, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 3, 1, 0]
    ],
    ineq: [
        [[1, 0], [0, 0]],
        [[1, 8], [0, 8]],
        [[1, 0], [2, 0]],
        [[1, 2], [2, 2]],
        [[1, 3], [1, 2]],
        [[1, 4], [1, 3]],
        [[1, 5], [1, 4]],
        [[1, 7], [2, 7]],
        [[1, 8], [2, 8]],
        [[2, 5], [2, 6]],
        [[2, 7], [2, 6]],
        [[3, 0], [3, 1]],
        [[3, 3], [3, 4]],
        [[3, 5], [4, 5]],
        [[3, 6], [4, 6]],
        [[3, 8], [4, 8]],
        [[4, 3], [3, 3]],
        [[4, 5], [4, 4]],
        [[4, 7], [3, 7]],
        [[4, 8], [4, 7]],
        [[4, 8], [5, 8]],
        [[5, 3], [5, 2]],
        [[5, 4], [5, 3]],
        [[5, 5], [5, 4]],
        [[6, 0], [6, 1]],
        [[6, 1], [7, 1]],
        [[6, 2], [6, 1]],
        [[6, 4], [7, 4]],
        [[6, 5], [6, 4]],
        [[6, 6], [6, 5]],
        [[6, 7], [6, 8]],
        [[7, 0], [7, 1]],
        [[7, 3], [7, 2]],
        [[7, 6], [6, 6]],
        [[7, 6], [7, 7]],
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
function isValidPlacement(state: number[][], ineq: number[][][], col: number, row: number, value: number): boolean {

    const n = state[0].length;

    // Check columns and rows
    for (let i = 0; i < n; i++) {
        if (state[col][i] === value && i !== row) {
            return false; // check columns
        }
        if (state[i][row] === value && i !== col) {
            return false; // check rows
        }
    }

    // Check inequalities
    for (let i = 0; i < ineq.length; i++) {
        for (let j = 0; j < 2; j++) {
            let ineqCol = ineq[i][j][0];
            let ineqRow = ineq[i][j][1];

            if (col === ineqCol && row === ineqRow) {
                if (j % 2 === 0) {
                    if (value <= state[ineq[i][1][0]][ineq[i][1][1]] && state[ineq[i][1][0]][ineq[i][1][1]] !== 0) {
                        return false;
                    }
                } else {
                    if (value >= state[ineq[i][0][0]][ineq[i][0][1]] && state[ineq[i][0][0]][ineq[i][0][1]] !== 0) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

function possibleValuesForCell(state: number[][], col: number, row: number): number[] {

    const n = state[0].length;
    const set = new Set();

    for (let i = 0; i < n; i++) {
        if (i !== col && state[i][row] !== 0) {
            set.add(state[i][row]); // check columns
        }
        if (i !== row && state[col][i] !== 0) {
            set.add(state[col][i]); // check rows
        }
    }

    const possibleValues: number[] = [];
    for (let i = 1; i <= n; i++) {
        if (!set.has(i)) {
            possibleValues.push(i);
        }
    }

    return possibleValues;
}


function chooseNextEmptyCell(state: number[][]): number[] {
    const n = state[0].length;

    for (let col = 0; col < n; col++) {
        for (let row = 0; row < n; row++) {
            if (state[col][row] === 0) {
                return [col, row];
            }
        }
    }

    return [];
}

function solveFutoshiki(problem: Futoshiki, solutions: number[][][] = []): number[][][] {

    // TODO: Adicionar check para ver se initial state é possível

    if (isFutoshikiComplete(problem.state)) {
        solutions.push(problem.state);
        return solutions;
    } else {
        let cell = chooseNextEmptyCell(problem.state);
        if (cell.length === 0) {
            return solutions;
        }


        // console.log(possibleValuesForCell(problem.state, cell[0], cell[1]))
        for (const value of possibleValuesForCell(problem.state, cell[0], cell[1])) {
            if (isValidPlacement(problem.state, problem.ineq, cell[0], cell[1], value)) {
                let newState = [...problem.state.map(row => [...row])]; // Create a deep copy
                newState[cell[0]][cell[1]] = value;
                solveFutoshiki({ state: newState, ineq: problem.ineq }, solutions);
            }
        }
        return solutions;
    }
}


const startTime = performance.now(); // Record start time
console.log(solveFutoshiki(biggerFutoshiki));
const endTime = performance.now(); // Record end time
const executionTime = endTime - startTime; // Calculate execution time
console.log(`Execution time: ${executionTime} milliseconds`);



