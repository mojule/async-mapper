declare type FindPredicate = (value: any, index?: number, array?: any[]) => Promise<boolean>;
export declare const find: (array: any[], predicate: FindPredicate) => Promise<any>;
export {};
