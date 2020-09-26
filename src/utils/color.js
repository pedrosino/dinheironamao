const letters = [];
letters["A"] = 10;
letters["B"] = 11;
letters["C"] = 12;
letters["D"] = 13;
letters["E"] = 14;
letters["F"] = 15;

const flippedLetters = Object.entries(letters)
  .reduce((obj, [key, value]) => ({ ...obj, [value]: key }), {});

function isAlpha(char) {
  return /^[A-Z]$/i.test(char);
}

function hexToRGB(hex) {
  const arr = hex.split("");
  
  let red = 0;
  let green = 0;
  let blue = 0;
  
  red += isAlpha(arr[0]) ? letters[arr[0]] * 16 : parseInt(arr[0]) * 16;
  red += isAlpha(arr[1]) ? letters[arr[1]] : parseInt(arr[1]);

  green += isAlpha(arr[2]) ? letters[arr[2]] * 16 : parseInt(arr[2]) * 16;
  green += isAlpha(arr[3]) ? letters[arr[3]] : parseInt(arr[3]);

  blue += isAlpha(arr[4]) ? letters[arr[4]] * 16 : parseInt(arr[4]) * 16;
  blue += isAlpha(arr[5]) ? letters[arr[5]] : parseInt(arr[5]);

  return [red, green, blue];
}

function RGBToHex(red, green, blue) {  
  let hex = "";

  let r1 = parseInt(red / 16);
  let r2 = red % 16;

  let g1 = parseInt(green / 16);
  let g2 = green % 16;

  let b1 = parseInt(blue / 16);
  let b2 = blue % 16;
  
  hex += r1 > 9 ? flippedLetters[r1] : r1;
  hex += r2 > 9 ? flippedLetters[r2] : r2;
  hex += g1 > 9 ? flippedLetters[g1] : g1;
  hex += g2 > 9 ? flippedLetters[g2] : g2;
  hex += b1 > 9 ? flippedLetters[b1] : b1;
  hex += b2 > 9 ? flippedLetters[b2] : b2;
  
  return hex;
}

function invertColor(red, green, blue) {
  return [255-red, 255-green, 255-blue];
}



export {
  hexToRGB,
  RGBToHex,
  invertColor,
};