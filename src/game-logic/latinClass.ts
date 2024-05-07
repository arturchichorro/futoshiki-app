class Latin {
    size: number;
    elements: number[];
    square: number[][];

    constructor(size = 4) {
        this.size = size;
        this.elements = [...Array(this.size)].map((v, i) => i + 1);
        this.square = Array(this.size).fill(0).map(() => Array(this.size).fill(0));

        if (this.create(0, 0)) {
            console.table(this.square);
        }
    }

    create(col: number, row: number): boolean {
        const d = [...this.elements];
        let s;
        while (true) {
            do {
                s = d.splice(Math.floor(Math.random() * d.length), 1)[0];
                if (!s) return false;
            } while (this.check(s, col, row));

            this.square[col][row] = s;
            if (++col >= this.size) {
                col = 0;
                if (++row >= this.size) {
                    return true;
                }
            }
            if (this.create(col, row)) return true;
            if (--col < 0) {
                col = this.size - 1;
                if (--row < 0) {
                    return false;
                }
            }
        }
    }

    check(d: number, col: number, row: number): boolean {
        for (let a = 0; a < this.size; a++) {
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
    }

    isLatinSquare(): boolean {
        for (let row = 0; row < this.size; row++) {
            const rowValues = new Set<number>();
            for (let col = 0; col < this.size; col++) {
                if (this.square[row][col] === 0 || rowValues.has(this.square[row][col])) {
                    return false;
                }
                rowValues.add(this.square[row][col]);
            }
        }

        for (let col = 0; col < this.size; col++) {
            const colValues = new Set<number>();
            for (let row = 0; row < this.size; row++) {
                if (this.square[row][col] === 0 || colValues.has(this.square[row][col])) {
                    return false;
                }
                colValues.add(this.square[row][col]);
            }
        }

        return true;
    }
}

new Latin(5);