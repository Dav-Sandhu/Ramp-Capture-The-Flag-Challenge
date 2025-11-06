const decodeBase64 = (text: string) => {

  //the base64 alphabet which is used to reference the index value of each character
  const b64_alphabet: Array<string> = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 
    'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
    '+', '/'
  ]

  const decNum: Array<number> = []

  //returns the number corresponding to the base64 letter
  for (let i = 0;i < text.length;i++){
    if (text[i] !== '='){
      decNum.push(b64_alphabet.indexOf(text[i]))
    }
  }

  let binaryStr: string = ""
  const binaryArr: Array<string> = []

  //converts to binary
  for (let i = 0;i < decNum.length;i++){
    binaryArr.push(decNum[i].toString(2))
  }

  //makes each binary a 6-bit number if it isn't already
  binaryArr.forEach((b) => { binaryStr += "0".repeat(6 - b.length) + b })

  //removes padding
  const padding = ((text.split('=').length - 1) * 2)
  binaryStr = padding > 0 ? binaryStr.slice(0, binaryStr.length - padding) : binaryStr

  let output = ""
  
  //converts to 8-bit and then to decimal value from which it decodes its ascii value
  for(let i = 0;i < binaryStr.length;i += 8){        
    let binaryValue = binaryStr.slice(i, i + 8)
    let decimalValue = parseInt(binaryValue, 2)
    let charValue = String.fromCharCode(decimalValue)
    output += charValue
  }

  return output
}

const output = decodeBase64("aHR0cHM6Ly90bnM0bHBnbXppaXlwbnh4emVsNXNzNW55dTBuZnRvbC5sYW1iZGEtdXJsLnVzLWVhc3QtMS5vbi5hd3MvcmFtcC1jaGFsbGVuZ2UtaW5zdHJ1Y3Rpb25zLw==")
console.log(output)

export {}