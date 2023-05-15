// Calculaos para venta

export const TotalGrava = (item) => {
  const totalSum = item.reduce((accumulator, product) => {
    return accumulator + parseFloat(product.total);
  }, 0);

  const baseAmount = totalSum / (1 + 0.18);

  return baseAmount;
};

export const TotalSale = (item)=>{
  const totalSum = item.reduce((accumulator, product) => {
    return accumulator + parseFloat(product.total);
  }, 0);
  return totalSum
}

export const TotalIGV = (item) => {
  const totalIGV = item.reduce((accumulator, product) => {
    const baseAmount = parseFloat(product.total) / (1 + 0.18);
    const productIGV = baseAmount * 0.18;
    return accumulator + productIGV;
  }, 0);

  return totalIGV;
};


export const TotalDiscount = (item)=>{
  const totalDiscount = item.reduce((accumulator, product) => {
    return accumulator + parseFloat(product.discount);
  }, 0);
  return totalDiscount
}
