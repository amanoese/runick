import runick from '../src/index'
import fs from 'fs'

describe('runick',()=>{
  test('encode',()=>{
    // encodeしたときに、encodeあとの文字がランダムにどれか選ばれるため
    // 乱数を考慮して複数回テストを実行する。
    for (let i=0; i<1000; i++) {
      expect(runick.encode('unko'))
        .toMatch(/^[ᛢᛥ][ᚱᛗ][ᛇᚼ][ᚾᚫ][ᚷᛝ][ᚱᛗ][ᛈᛣ][ᛉᛤ]$/)

    }
  })

  test('decode',()=>{
    expect(runick.decode(runick.encode('こんにちは')))
      .toBe('こんにちは')
  })

  test('decode 改行文字込',()=>{
    expect(runick.decode('ᛢᚱᚼᚫᚷᚱᛣᛤ')).toBe('unko')
  })

  test('dumpされた文字が途中でもdecodeできるかの確認',()=>{
    // runick.encode('')
    expect(runick.decode(runick.encode('💩💩').slice(0,-4)))
      .toEqual(expect.stringContaining('💩'))
  })
  test('関係ない文字でもエラーが出ないことの確認',()=>{
    // runick.encode('')
    expect(()=>runick.decode('💩')).not.toThrow()
  })
})
