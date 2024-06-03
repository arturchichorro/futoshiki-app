"use strict";
// Stack.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
var Stack = /** @class */ (function () {
    function Stack() {
        this.items = [];
    }
    Stack.prototype.push = function (element) {
        this.items.push(element);
    };
    Stack.prototype.pop = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    };
    Stack.prototype.peek = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    };
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    Stack.prototype.size = function () {
        return this.items.length;
    };
    Stack.prototype.clear = function () {
        this.items = [];
    };
    Stack.prototype.print = function () {
        console.log(this.items.toString());
    };
    return Stack;
}());
exports.Stack = Stack;
