var size = 4;
function indexFromChoice(row, column, digit) {
    return (Math.pow(size, 2)) * row + size * column + digit;
}
function choiceFromIndex(i) {
    return [Math.floor(i / (Math.pow(size, 2))), Math.floor(i / size) % size, i % size];
}
var hint = function (row, column, digit) { return indexFromChoice(row - 1, column - 1, digit - 1); };
function cellConstraint(row, column) {
    var constraints = [];
    for (var digit = 0; digit < size; digit++) {
        constraints.push(indexFromChoice(row, column, digit));
    }
    return constraints;
}
function rowConstraint(row, digit) {
    var constraints = [];
    for (var column = 0; column < size; column++) {
        constraints.push(indexFromChoice(row, column, digit));
    }
    return constraints;
}
function columnConstraint(column, digit) {
    var constraints = [];
    for (var row = 0; row < size; row++) {
        constraints.push(indexFromChoice(row, column, digit));
    }
    return constraints;
}
// Futoshiki specific
// Cada desigualdes vai criar mais do que uma coluna de constraints. Vai criar n-1 colunas
function ineqConstraint(greater, smaller) {
    var ineqConstraints = [];
    for (var d = size - 1; d > 0; d--) {
        var constraints = [];
        constraints.push(indexFromChoice(greater.row, greater.column, d));
        for (var nd = d; nd < size; nd++) {
            constraints.push(indexFromChoice(smaller.row, smaller.column, nd));
        }
        ineqConstraints.push(constraints);
    }
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
function generateConstraints() {
    var constraints = [];
    for (var r = 0; r < size; r++) {
        for (var c = 0; c < size; c++) {
            constraints.push(cellConstraint(r, c));
        }
        for (var d = 0; d < size; d++) {
            constraints.push(rowConstraint(r, d));
        }
    }
    for (var c = 0; c < size; c++) {
        for (var d = 0; d < size; d++) {
            constraints.push(columnConstraint(c, d));
        }
    }
    console.log(ineqConstraint({ row: 1, column: 2 }, { row: 0, column: 2 }));
    console.log(ineqConstraint({ row: 2, column: 2 }, { row: 1, column: 2 }));
    constraints.concat(ineqConstraint({ row: 1, column: 2 }, { row: 0, column: 2 }));
    constraints.concat(ineqConstraint({ row: 3, column: 3 }, { row: 2, column: 3 }));
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
function constraintDifficulty(relation, constraint) {
    var acc = 0;
    for (var _i = 0, _a = Object.values(relation); _i < _a.length; _i++) {
        var value = _a[_i];
        acc += value[constraint];
    }
    return acc;
}
function stripChoice(choice, constraints) {
    var result = {};
    for (var key in choice) {
        if (!constraints.includes(Number(key))) {
            result[Number(key)] = choice[key];
        }
    }
    return result;
}
function makeChoice(relation, choice) {
    var constraints = [];
    for (var _i = 0, _a = Object.entries(relation[choice]); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (value === 1) {
            constraints.push(Number(key));
        }
    }
    var choices = [];
    for (var _c = 0, constraints_1 = constraints; _c < constraints_1.length; _c++) {
        var c = constraints_1[_c];
        for (var _d = 0, _e = Object.keys(relation); _d < _e.length; _d++) {
            var key = _e[_d];
            if (!(choices.includes(Number(key))) && relation[Number(key)][c] === 1) {
                choices.push(Number(key));
            }
        }
    }
    var result = {};
    for (var _f = 0, _g = Object.entries(relation); _f < _g.length; _f++) {
        var _h = _g[_f], key = _h[0], value = _h[1];
        if (!choices.includes(Number(key))) {
            result[Number(key)] = stripChoice(value, constraints);
        }
    }
    return result;
}
function algoXImpl(relation, acc, depth) {
    if (Object.keys(relation).length === 0) {
        return acc;
    }
    var easiestConstraint;
    for (var _i = 0, _a = Object.keys(relation); _i < _a.length; _i++) {
        var i = _a[_i];
        for (var _b = 0, _c = Object.keys(relation[Number(i)]); _b < _c.length; _b++) {
            var j = _c[_b];
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
    var difficulty = constraintDifficulty(relation, easiestConstraint);
    for (var _d = 0, _e = Object.keys(relation); _d < _e.length; _d++) {
        var k = _e[_d];
        for (var _f = 0, _g = Object.entries(relation[Number(k)]); _f < _g.length; _f++) {
            var _h = _g[_f], constraint = _h[0], _ = _h[1];
            if (constraintDifficulty(relation, Number(constraint)) < difficulty) {
                easiestConstraint = Number(constraint);
                difficulty = constraintDifficulty(relation, Number(constraint));
            }
        }
        break;
    }
    console.log("depth ".concat(depth, ", Difficulty ").concat(difficulty));
    if (difficulty === 0) {
        console.log("");
        return undefined;
    }
    var choices = [];
    for (var _j = 0, _k = Object.entries(relation); _j < _k.length; _j++) {
        var _l = _k[_j], choice = _l[0], value = _l[1];
        if (value[easiestConstraint] === 1) {
            choices.push(Number(choice));
        }
    }
    for (var _m = 0, choices_1 = choices; _m < choices_1.length; _m++) {
        var c = choices_1[_m];
        var rel = makeChoice(relation, c);
        var new_acc = acc.slice();
        new_acc.push(c);
        var result = algoXImpl(rel, new_acc, depth + 1);
        if (result) {
            return result;
        }
    }
    ;
    return undefined;
}
function algoX(relation) {
    return algoXImpl(relation, [], 1);
}
function solve() {
    var constraints = generateConstraints();
    var relation = {};
    for (var i = 0; i < Math.pow(size, 3); i++) {
        relation[i] = {};
        for (var j = 0; j < constraints.length; j++) {
            relation[i][j] = 0;
        }
    }
    constraints.forEach(function (constraint, i) {
        for (var _i = 0, constraint_1 = constraint; _i < constraint_1.length; _i++) {
            var c = constraint_1[_i];
            relation[c][i] = 1;
        }
    });
    // Incluir aqui os "make_choice" do estado inicial do futoshiki.
    // Vai haver detalhes extra com as desigualdades though, o que é bastante chato
    relation = makeChoice(relation, hint(1, 1, 4));
    relation = makeChoice(relation, hint(3, 2, 2));
    relation = makeChoice(relation, hint(4, 4, 3));
    var result = algoX(relation);
    if (result === undefined) {
        console.log("Impossible");
    }
    else {
        var output_1 = [];
        // Assuming `result` is an object
        result.forEach(function (r) {
            var choice = choiceFromIndex(r);
            output_1.push("R".concat(choice[0] + 1, "C").concat(choice[1] + 1, "#").concat(choice[2] + 1));
        });
        console.log(output_1);
    }
}
solve();
