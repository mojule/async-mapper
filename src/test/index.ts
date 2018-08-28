import * as assert from 'assert'
import { fsMapper, predicates, map, FsNode } from './fs-mapper'
import { Mapper } from '..';

const expect: FsNode = [
  "directory",
  "fixtures",
  [
    "file",
    "a.txt",
    "A"
  ],
  [
    "file",
    "b.txt",
    "B"
  ],
  [
    "directory",
    "c",
    [
      "file",
      "d.txt",
      "D"
    ],
    [
      "directory",
      "e",
      [
        "file",
        "f.txt",
        "F"
      ]
    ]
  ]
]

describe( 'async mapper', () => {
  it( 'fs mapper', async () => {
    const fileTree = await fsMapper( './src/test/fixtures' )

    assert.deepEqual( fileTree, expect )
  })

  it( 'fails when has no predicate', async () => {
    const { file } = predicates
    const badPredicates = { file }
    const badMapper = Mapper( { predicates: badPredicates, map } )

    try {
      const fileTree = await badMapper( './src/test/fixtures' )

      if( fileTree ) throw Error( 'Unexpected success' )
    } catch( err ){
      assert( err )
    }
  })
})
