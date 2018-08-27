import { promises } from 'fs'
import * as path from 'path'
import { PredicateMap, FnMap } from '../types'
import { Mapper } from '..'

const { stat, readdir, readFile } = promises

export const predicates: PredicateMap = {
  file: async ( p: string ) => {
    const stats = await stat( p )

    return stats.isFile()
  },
  directory: async ( p: string ) => {
    const stats = await stat( p )

    return stats.isDirectory()
  }
}

export const map: FnMap = {
  file: async ( filePath: string ) => {
    const contents = await readFile( filePath, 'utf8' )
    const { base } = path.parse( filePath )

    return [ 'file', base, contents ]
  },
  directory: async ( directoryPath: string, options ) => {
    const { mapper } = options
    const contents = await readdir( directoryPath )
    const { base } = path.parse( directoryPath )
    const children = await Promise.all( contents.map( name => {
      const childPath = path.join( directoryPath, name )

      return mapper( childPath, options )
    }))

    return [ 'directory', base, ...children ]
  }
}

export const fsMapper = Mapper( { predicates, map } )
