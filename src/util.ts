type FindPredicate = ( value: any, index?: number, array?: any[] ) => Promise<boolean>

export const find = async ( array: any[], predicate: FindPredicate ): Promise<any> => {
  for ( let i = 0; i < array.length; i++ ) {
    if ( await predicate( array[ i ], i, array ) ) return array[ i ]
  }
}
