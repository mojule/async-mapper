import { promises } from 'fs'
import * as path from 'path'
import { PredicateMap, FnMap, MapperFnOptions } from '../types'
import { Mapper } from '..'

const { stat, readdir, readFile } = promises

export type FsNodeId = 'file' | 'directory'
// recursive types in typescript are too difficult to easily describe this
export type FsNode = [ FsNodeId, string, ...any[] ]

export const predicates: PredicateMap<string> = {
  file: async ( p: string ) => {
    const stats = await stat( p )

    return stats.isFile()
  },
  directory: async ( p: string ) => {
    const stats = await stat( p )

    return stats.isDirectory()
  }
}

export const map: FnMap<string,FsNode> = {
  file: async ( filePath: string ) => {
    const contents = await readFile( filePath, 'utf8' )
    const { base } = path.parse( filePath )

    return [ 'file', base, contents ]
  },
  directory: async ( directoryPath: string, options: MapperFnOptions<string,FsNode> ) => {
    const { mapper } = options
    const { base } = path.parse( directoryPath )

    const contents = await readdir( directoryPath )

    const children = await Promise.all( contents.map( name => {
      const childPath = path.join( directoryPath, name )

      return mapper( childPath, options )
    }))

    return [ 'directory', base, ...children ]
  }
}

export const fsMapper = Mapper( { predicates, map } )
