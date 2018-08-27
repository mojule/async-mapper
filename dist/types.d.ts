export declare type MapperFn = (value: any, options: MapperFnOptions) => Promise<any>;
export declare type AsyncPredicate = (value: any) => Promise<boolean>;
export interface PredicateMap {
    [name: string]: (value: any) => Promise<boolean>;
}
export interface FnMap {
    [name: string]: MapperFn;
}
export interface MapperOptions {
    map: FnMap;
    predicates: PredicateMap;
}
export interface MapperFnOptions extends MapperOptions {
    mapper: MapperFn;
}
