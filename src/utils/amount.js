export const amount = (invoice) => {
  let result = 0;
  invoice &&
    invoice.services.forEach((el) => {
      let price = el.unitPrice * el.quantity;
      result += price;
    });
  return result;
};
