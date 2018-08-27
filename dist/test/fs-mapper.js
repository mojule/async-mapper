"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
const __1 = require("..");
const { stat, readdir, readFile } = fs_1.promises;
exports.predicates = {
    file: async (p) => {
        const stats = await stat(p);
        return stats.isFile();
    },
    directory: async (p) => {
        const stats = await stat(p);
        return stats.isDirectory();
    }
};
exports.map = {
    file: async (filePath) => {
        const contents = await readFile(filePath, 'utf8');
        const { base } = path.parse(filePath);
        return ['file', base, contents];
    },
    directory: async (directoryPath, options) => {
        const { mapper } = options;
        const { base } = path.parse(directoryPath);
        const contents = await readdir(directoryPath);
        const children = await Promise.all(contents.map(name => {
            const childPath = path.join(directoryPath, name);
            return mapper(childPath, options);
        }));
        return ['directory', base, ...children];
    }
};
exports.fsMapper = __1.Mapper({ predicates: exports.predicates, map: exports.map });
//# sourceMappingURL=fs-mapper.js.map