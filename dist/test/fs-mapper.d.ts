import { PredicateMap, FnMap } from '../types';
declare type FsNode = [string, string, ...any[]];
export declare const predicates: PredicateMap<string>;
export declare const map: FnMap<string, FsNode>;
export declare const fsMapper: (value: any, options?: import("../types").MapperOptions<string, [string, string, ...any[]]> | undefined) => any;
export {};
