function moneyFormat(input) {
  return "R$ " + input.replace('.', ',');
}

function saveFormat(input) {
  return input.replace(',', '.');
}

export {
  moneyFormat,
  saveFormat,
};
