"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.Mapper = (mapperOptions) => {
    const mapper = async (value, options) => {
        const currentOptions = Object.assign({}, mapperOptions, { mapper }, options);
        const { map, predicates } = currentOptions;
        const name = await util_1.find(Object.keys(predicates), async (name) => predicates[name](value));
        if (name) {
            return await map[name](value, currentOptions);
        }
        throw Error('No function found in predicates to handle this value');
    };
    return mapper;
};
//# sourceMappingURL=index.js.map