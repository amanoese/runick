# runick

[![Actions Status](https://github.com/amanoese/runick/workflows/Node%20CI/badge.svg)](https://github.com/amanoese/runick/actions)
[![npm version](http://img.shields.io/npm/v/runick.svg)](https://npmjs.org/package/runick)

runickは、テキストデータをルーン文字にエンコードするコマンドです。  
また変換したルーン文字は、元のテキストデータにデコードすることができます。  
  
エニグマのスクランブラーをの仕組みを利用することで変換したエンコード文字は法則性が掴みづらく、  
知らない人にオカルトや中二病のミスリードを与えることができるかもしれません。

## Install

```bash
$ npm install -g runick
```

## Usage

```bash
## encode text
$ echo Hello,World | runick
ᚢᛖᛝᛋᚻᛝᛠᛟᛝᛁᚠᚷᛝᛉᛖᛇᚾᚻᛤᛁᛞᛣᛁᛁ

## decode text
$ echo ᚢᛖᛝᛋᚻᛝᛠᛟᛝᛁᚠᚷᛝᛉᛖᛇᚾᚻᛤᛁᛞᛣᛁᛁ | runick -d
Hello,World

## Random Geneate Magic Words.
$ runick
ᛄᛖᛗᛣᚷᚱᛖᚳᚳᛟᚸᛇᚱᚣᛗᚾᛉᚼᛠᚠᚼᛄᛇᛗ
```

## Documentation for Developers
[develop](/doc/develop.md)

## Thanks
I named "runick" by an imitation of Aleister Crowley calling "magic" "magick".
Sorry.Not related to Yu-Gi-Oh's "runick" category.

## LICENSE
Apache-2.0

