let default_roter = [149,159,254,130,87,174,201,134,136,163,111,250,100,193,65,123,84,202,11,217,55,141,175,182,236,140,180,36,144,177,216,73,78,53,14,76,232,247,18,173,128,82,212,3,222,31,238,221,223,5,176,107,12,90,113,239,16,121,124,17,153,58,45,229,166,38,142,255,25,52,9,213,244,54,72,23,13,10,240,152,230,8,19,186,127,4,132,161,154,146,117,89,157,249,95,187,2,94,165,63,6,156,253,242,243,62,42,101,74,251,46,211,77,139,37,160,203,204,148,210,194,116,199,162,93,191,98,137,207,220,184,190,235,228,248,209,83,195,28,183,158,192,188,60,102,126,108,133,167,143,69,181,215,122,200,145,197,15,99,40,56,170,155,198,231,64,241,185,224,226,147,168,189,81,22,86,0,227,120,119,234,114,245,50,68,44,178,27,115,150,179,29,7,49,208,219,151,92,71,47,91,61,106,85,109,66,70,104,218,43,34,21,103,135,30,196,171,67,41,118,1,33,80,24,88,35,129,110,75,233,225,172,105,20,79,125,57,252,59,214,246,131,169,51,26,205,164,39,96,32,48,206,138,112,97,237]
let refrector     = [255,254,253,252,251,250,249,248,247,246,245,244,243,242,241,240,239,238,237,236,235,234,233,232,231,230,229,228,227,226,225,224,223,222,221,220,219,218,217,216,215,214,213,212,211,210,209,208,207,206,205,204,203,202,201,200,199,198,197,196,195,194,193,192,191,190,189,188,187,186,185,184,183,182,181,180,179,178,177,176,175,174,173,172,171,170,169,168,167,166,165,164,163,162,161,160,159,158,157,156,155,154,153,152,151,150,149,148,147,146,145,144,143,142,141,140,139,138,137,136,135,134,133,132,131,130,129,128,127,126,125,124,123,122,121,120,119,118,117,116,115,114,113,112,111,110,109,108,107,106,105,104,103,102,101,100,99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]

let toNumber    = (list,input) => list[input]
let revToNumber = (list,input) => list.indexOf(input)

let encrypt = (uint8array,roter,refrector) => {
  let fase_1 = toNumber(roter,uint8array[0])
  let fase_2 = toNumber(refrector,fase_1)
  let fase_3 = revToNumber(roter,fase_2)

  let nextRotor = [ ...roter.slice(1) , roter[0] ]

  return [fase_3, ...(uint8array.length <= 1 ? [] : encrypt(uint8array.slice(1),nextRotor,refrector)) ]
}

module.exports = {
  default_roter,
  refrector,
  encrypt,
  uint8ArrayEncrypt(uint8array){
    return this.encrypt(uint8array,this.default_roter,this.refrector)
  }
}