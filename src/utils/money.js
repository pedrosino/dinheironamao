function moneyFormat(input) {
  return "R$ " + input.replace('.', ',');
}

export default moneyFormat;
