function moneyFormat(input) {
  return "R$ " + input.replace('.', ',');
}

function saveFormat(input) {
  return input.replace(',', '.').replace('R$ ', '');
}

export {
  moneyFormat,
  saveFormat,
};
