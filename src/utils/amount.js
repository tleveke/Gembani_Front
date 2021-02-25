export const amount = (invoice) => {
  let result = 0;

  //prix HT
  invoice &&
    invoice.services.forEach((el) => {
      let price = el.unitPrice * el.quantity;
      result += price;
    });

  // taxe
  const tax = result * invoice?.tax;

  //total TTC
  const total = result + tax;

  return { result, tax, total };
};
