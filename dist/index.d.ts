import { MapperOptions } from './types';
export declare const Mapper: <From, To>(mapperOptions: MapperOptions<From, To>) => (value: any, options?: MapperOptions<From, To> | undefined) => any;
