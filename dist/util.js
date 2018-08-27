"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = async (array, predicate) => {
    for (let i = 0; i < array.length; i++) {
        if (await predicate(array[i], i, array))
            return array[i];
    }
};
//# sourceMappingURL=util.js.map