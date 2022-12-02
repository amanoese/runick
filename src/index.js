import simpleEnigma from './machine-encrypt.js'
import fs from 'fs'
import path from 'path'
const dirname = path.dirname(new URL(import.meta.url).pathname)
const runes = {
  0:['ᛏ','ᚠ'],
  1:['ᚢ','ᛒ'],
  2:['ᚦ','ᛖ'],
  3:['ᚱ','ᛗ'],
  4:['ᚳ','ᛚ'],
  5:['ᚷ','ᛝ'],
  6:['ᚹ','ᛟ'],
  7:['ᚻ','ᛞ'],
  8:['ᚾ','ᚫ'],
  9:['ᛁ','ᚣ'],
  A:['ᛄ','ᛠ'],
  B:['ᛇ','ᚼ'],
  C:['ᛈ','ᛣ'],
  D:['ᛉ','ᛤ'],
  E:['ᛋ','ᚸ'],
  F:['ᛢ','ᛥ'],
}

let default_encoder = (uint8text) => {

  //機械式暗号（ロータ型）の仕組みを利用したスクランブラーを配置
  //バイトコードは連続しやすい性質があるが、
  //これによって単語頻出頻度の偏りを少なくし自然な文章を生み出す
  let encryptCode = simpleEnigma.uint8ArrayEncrypt([ ...uint8text ])

  // TextEncoderを利用するとuint8array(10進数でUTF-8のバイトコード)に変換されるため2桁の16進数コードへ変換。
  let encryptCode16 = encryptCode.map(v=>`0${(+v).toString(16).toUpperCase()}`.slice(-2))

  let rune_code = encryptCode16
    .reduce((s,v)=>[ ...s,...v.split('')],[])
    .map((code,i)=> runes[code] )
    .map(v=> v[Math.floor(Math.random() * v.length)])

  return rune_code.join('')
}

let default_decoder = (encodeText) => {
  // 元のハッシュマップのキーとバリューを逆にすることでデコード用のハッシュマップとする。
  // エンコードに使用しているハッシュマップの値はリストのため、リストの要素をそれぞれコードと紐付ける。
  // ex:
  //   from:
  //     0:['ᛏ','ᚠ'],
  //   to:
  //     'ᛏ' : "0"
  //     'ᚠ' : "0"
  let decodeHash = {}
  Object.entries(runes).forEach(([k,v])=> {
    v.forEach(v2=> {
      decodeHash[v2] = k
    })
  })

  // デコード用の正規表現に変換。
  // ex: /さざ波|その者|ほうき星よ/g
  let decodeRegExp = new RegExp(Object.keys(decodeHash).join('|'),'g')

  // 正規表現にマッチするもののみに絞り込み。
  let textCodeList = encodeText.match(decodeRegExp) || []

  // デコード用のハッシュマップからエンコード前の2桁16進数のコードを復元。
  let runes_keys = textCodeList.map(v=>decodeHash[v])
  let encryptCode = 
     (runes_keys.join('').match(/../g) || [])
    .map(v=>parseInt(v,16))

  let textCode = simpleEnigma.uint8ArrayEncrypt(encryptCode)
  return Uint8Array.from(textCode)
}

export default {
  generate(length, generater = default_encoder) {
    let rand = n => (Math.random() * n).toFixed()
    let uint8text = Uint8Array.from({length:length || +rand(16) + 4}).map(_=>rand(255))
    return generater(uint8text)
  },
  encode( text, encoder = default_encoder ){
    let uint8text = (new TextEncoder()).encode(text)
    return encoder(uint8text)
  },
  decode( text, decoder = default_decoder ){
    let uint8text = decoder(text)
    return (new TextDecoder()).decode(uint8text)
  }
}
