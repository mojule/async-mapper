"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs_mapper_1 = require("./fs-mapper");
const __1 = require("..");
const expect = [
    "directory",
    "fixtures",
    [
        "file",
        "a.txt",
        "A"
    ],
    [
        "file",
        "b.txt",
        "B"
    ],
    [
        "directory",
        "c",
        [
            "file",
            "d.txt",
            "D"
        ],
        [
            "directory",
            "e",
            [
                "file",
                "f.txt",
                "F"
            ]
        ]
    ]
];
describe('async mapper', () => {
    it('fs mapper', async () => {
        const fileTree = await fs_mapper_1.fsMapper('./src/test/fixtures');
        assert.deepEqual(fileTree, expect);
    });
    it('fails when has no predicate', async () => {
        const { file } = fs_mapper_1.predicates;
        const badPredicates = { file };
        const badMapper = __1.Mapper({ predicates: badPredicates, map: fs_mapper_1.map });
        try {
            const fileTree = await badMapper('./src/test/fixtures');
            if (fileTree)
                throw Error('Unexpected success');
        }
        catch (err) {
            assert(err);
        }
    });
});
//# sourceMappingURL=index.js.map