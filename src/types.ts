export type MapperFn<From,To> = ( value: From, options: MapperFnOptions<From,To> ) => Promise<To>

export type AsyncPredicate = ( value: any ) => Promise<boolean>

export interface PredicateMap<From> {
  [ name: string ]: ( value: From ) => Promise<boolean>
}

export interface FnMap<From,To> {
  [ name: string ]: MapperFn<From,To>
}

export interface MapperOptions<From,To> {
  map: FnMap<From,To>
  predicates: PredicateMap<From>
}

export interface MapperFnOptions<From,To> extends MapperOptions<From,To> {
  mapper: MapperFn<From,To>
}
