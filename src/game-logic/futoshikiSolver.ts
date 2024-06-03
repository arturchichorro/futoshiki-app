interface RelationMap {
    [key: number]: { [key: number]: number };
}

type Position = { row: number, column: number };

let size = 3;

function indexFromChoice(row: number, column: number, digit: number): number {
    return (size ** 2) * row + size * column + digit;
}

function choiceFromIndex(i: number): [number, number, number] {
    return [Math.floor(i / (size ** 2)), Math.floor(i / size) % size, i % size];
}

const hint = (row: number, column: number, digit: number): number => indexFromChoice(row - 1, column - 1, digit - 1);

function cellConstraint(row: number, column: number): number[] {
    let constraints: number[] = [];
    for (let digit = 0; digit < size; digit++) {
        constraints.push(indexFromChoice(row, column, digit));
    }
    return constraints;
}

function rowConstraint(row: number, digit: number): number[] {
    let constraints: number[] = [];
    for (let column = 0; column < size; column++) {
        constraints.push(indexFromChoice(row, column, digit));
    }
    return constraints;
}

function columnConstraint(column: number, digit: number): number[] {
    let constraints: number[] = [];
    for (let row = 0; row < size; row++) {
        constraints.push(indexFromChoice(row, column, digit));
    }
    return constraints;
}

// Futoshiki specific
// Cada desigualdes vai criar mais do que uma coluna de constraints. Vai criar n-1 colunas
function ineqConstraint(greater: Position, smaller: Position): number[][] {
    let ineqConstraints: number[][] = [];

    for (let d = size - 1; d > 0; d--) {
        for (let nd = d - 1; nd > -1; nd--) {
            let constraints: number[] = [];
            constraints.push(indexFromChoice(greater.row, greater.column, d));
            constraints.push(indexFromChoice(smaller.row, smaller.column, nd));
            ineqConstraints.push(constraints);
        }
    }
    // for (let d = size - 1; d > 0; d--) {
    //     let constraints: number[] = [];
    //     constraints.push(indexFromChoice(greater.row, greater.column, d));
    //     for (let nd = d; nd < size - 1; nd++) {
    //         constraints.push(indexFromChoice(smaller.row, smaller.column, nd));
    //     }
    //     ineqConstraints.push(constraints);
    // }
    return ineqConstraints;
}

// Para sudoku:
// function boxConstraint(row: number, column: number, digit: number): number[] {
//     let constraints: number[] = [];
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             constraints.push(indexFromChoice(row + i, column + j, digit));
//         }
//     }
//     return constraints;
// }

// TODO: function inequalityConstraints(?): number[] {}

function generateConstraints(): number[][] {
    let constraints: number[][] = [];
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            constraints.push(cellConstraint(r, c));
        }
        for (let d = 0; d < size; d++) {
            constraints.push(rowConstraint(r, d));
        }
    }

    for (let c = 0; c < size; c++) {
        for (let d = 0; d < size; d++) {
            constraints.push(columnConstraint(c, d));
        }
    }

    // console.log(ineqConstraint({ row: 1, column: 2 }, { row: 0, column: 2 }));
    console.log(ineqConstraint({ row: 0, column: 0 }, { row: 0, column: 1 }));
    // constraints.concat(ineqConstraint({ row: 1, column: 2 }, { row: 0, column: 2 }));
    constraints.concat(ineqConstraint({ row: 0, column: 0 }, { row: 0, column: 1 }));
    // TODO: inequality constraints
    // Para sudoku:
    // for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j < 3; j++) {
    //         for (let d = 0; d < 9; d++) {
    //             constraints.push(boxConstraint(i * 3, j * 3, d));
    //         }
    //     }
    // }
    return constraints;
}

function constraintDifficulty(relation: RelationMap, constraint: number): number {
    let acc = 0;
    for (const value of Object.values(relation)) {
        acc += value[constraint];
    }
    return acc;
}

function stripChoice(choice: { [key: number]: number }, constraints: number[]): { [key: number]: number } {
    let result: { [key: number]: number } = {};
    for (const key in choice) {
        if (!constraints.includes(Number(key))) {
            result[Number(key)] = choice[key];
        }
    }
    return result;
}

function makeChoice(relation: RelationMap, choice: number): RelationMap {
    let constraints: number[] = [];
    for (const [key, value] of Object.entries(relation[choice])) {
        if (value === 1) {
            constraints.push(Number(key));
        }
    }

    let choices: number[] = [];
    for (const c of constraints) {
        for (const key of Object.keys(relation)) {
            if (!(choices.includes(Number(key))) && relation[Number(key)][c] === 1) {
                choices.push(Number(key));
            }
        }
    }

    const result: RelationMap = {};
    for (const [key, value] of Object.entries(relation)) {
        if (!choices.includes(Number(key))) {
            result[Number(key)] = stripChoice(value, constraints);
        }
    }

    return result;
}

function algoXImpl(relation: RelationMap, acc: number[], depth: number): number[] | undefined {
    if (Object.keys(relation).length === 0) {
        return acc;
    }

    let easiestConstraint: number | undefined;
    for (const i of Object.keys(relation)) {
        for (const j of Object.keys(relation[Number(i)])) {
            easiestConstraint = Number(j);
            break;
        }
        if (easiestConstraint !== undefined) {
            break;
        }
    }

    if (easiestConstraint === undefined) {
        return undefined;
    }


    let difficulty = constraintDifficulty(relation, easiestConstraint);

    for (const k of Object.keys(relation)) {
        for (const [constraint, _] of Object.entries(relation[Number(k)])) {
            if (constraintDifficulty(relation, Number(constraint)) < difficulty) {
                easiestConstraint = Number(constraint);
                difficulty = constraintDifficulty(relation, Number(constraint));
            }
        }
        break;
    }

    console.log(`depth ${depth}, Difficulty ${difficulty}`);
    if (difficulty === 0) {
        console.log("");
        return undefined;
    }

    let choices: number[] = [];
    for (const [choice, value] of Object.entries(relation)) {
        if (value[easiestConstraint] === 1) {
            choices.push(Number(choice));
        }
    }

    for (const c of choices) {
        const rel: RelationMap = makeChoice(relation, c);
        const new_acc: number[] = acc.slice();
        new_acc.push(c);
        let result: number[] | undefined = algoXImpl(rel, new_acc, depth + 1);
        if (result) {
            return result;
        }
    };

    return undefined;
}

function algoX(relation: RelationMap): number[] | undefined {
    return algoXImpl(relation, [], 1);
}

function solve() {
    let constraints: number[][] = generateConstraints();
    let relation: RelationMap = {};

    for (let i = 0; i < size ** 3; i++) {
        relation[i] = {}
        for (let j = 0; j < constraints.length; j++) {
            relation[i][j] = 0;
        }
    }

    constraints.forEach((constraint, i) => {
        for (const c of constraint) {
            relation[c][i] = 1;
        }
    });

    // Incluir aqui os "make_choice" do estado inicial do futoshiki.
    // Vai haver detalhes extra com as desigualdades though, o que é bastante chato
    // relation = makeChoice(relation, hint(1, 1, 4));
    // relation = makeChoice(relation, hint(3, 2, 2));
    // relation = makeChoice(relation, hint(4, 4, 3));

    let result = algoX(relation);

    if (result === undefined) {
        console.log("Impossible");
    }
    else {
        const output: string[] = [];
        // Assuming `result` is an object
        result.forEach(r => {
            let choice = choiceFromIndex(r);
            output.push(`R${choice[0] + 1}C${choice[1] + 1}#${choice[2] + 1}`);
        })
        console.log(output);
    }
}

solve();