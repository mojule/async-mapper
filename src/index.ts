import { MapperOptions, MapperFnOptions } from './types'
import { find } from './util'

export const Mapper = ( mapperOptions: MapperOptions ) => {
  const mapper = async ( value: any, options?: MapperOptions ) => {
    const currentOptions = <MapperFnOptions>Object.assign(
      {},
      mapperOptions,
      { mapper },
      options
    )

    const { map, predicates } = currentOptions

    const name = await find(
      Object.keys( predicates ),
      async name => predicates[ name ]( value )
    )

    if( name ){
      return await map[ name ]( value, currentOptions )
    }

    throw Error( 'No function found in predicates to handle this value' )
  }

  return mapper
}
