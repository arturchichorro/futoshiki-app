var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Latin = /** @class */ (function () {
    function Latin(size) {
        if (size === void 0) { size = 4; }
        var _this = this;
        this.size = size;
        this.elements = __spreadArray([], Array(this.size), true).map(function (v, i) { return i + 1; });
        this.square = Array(this.size).fill(0).map(function () { return Array(_this.size).fill(0); });
        if (this.create(0, 0)) {
            console.table(this.square);
        }
    }
    Latin.prototype.create = function (col, row) {
        var d = __spreadArray([], this.elements, true);
        var s;
        while (true) {
            do {
                s = d.splice(Math.floor(Math.random() * d.length), 1)[0];
                if (!s)
                    return false;
            } while (this.check(s, col, row));
            this.square[col][row] = s;
            if (++col >= this.size) {
                col = 0;
                if (++row >= this.size) {
                    return true;
                }
            }
            if (this.create(col, row))
                return true;
            if (--col < 0) {
                col = this.size - 1;
                if (--row < 0) {
                    return false;
                }
            }
        }
    };
    Latin.prototype.check = function (d, col, row) {
        for (var a = 0; a < this.size; a++) {
            if (col - a > -1) {
                if (this.square[col - a][row] === d)
                    return true;
            }
            if (row - a > -1) {
                if (this.square[col][row - a] === d)
                    return true;
            }
        }
        return false;
    };
    Latin.prototype.isLatinSquare = function () {
        for (var row = 0; row < this.size; row++) {
            var rowValues = new Set();
            for (var col = 0; col < this.size; col++) {
                if (this.square[row][col] === 0 || rowValues.has(this.square[row][col])) {
                    return false;
                }
                rowValues.add(this.square[row][col]);
            }
        }
        for (var col = 0; col < this.size; col++) {
            var colValues = new Set();
            for (var row = 0; row < this.size; row++) {
                if (this.square[row][col] === 0 || colValues.has(this.square[row][col])) {
                    return false;
                }
                colValues.add(this.square[row][col]);
            }
        }
        return true;
    };
    return Latin;
}());
new Latin(4);
