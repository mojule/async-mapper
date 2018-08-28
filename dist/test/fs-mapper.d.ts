import { PredicateMap, FnMap } from '../types';
export declare type FsNodeId = 'file' | 'directory';
export declare type FsNode = [FsNodeId, string, ...any[]];
export declare const predicates: PredicateMap<string>;
export declare const map: FnMap<string, FsNode>;
export declare const fsMapper: (value: any, options?: import("../types").MapperOptions<string, [FsNodeId, string, ...any[]]> | undefined) => any;
