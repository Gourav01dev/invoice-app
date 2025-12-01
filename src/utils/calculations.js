const parseValue = (value) => {
  if (!value || value === "") return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

export const updateInvoiceFields = (data) => {
  const changedField = data.changed;
  
  const formData = {
    qty: data.qty || "",
    price: data.price || "",
    discountPercent: data.discountPercent || "",
    discount: data.discount || "",
    taxPercent: data.taxPercent || "",
    tax: data.tax || "",
    total: data.total || ""
  };

  const qty = parseValue(formData.qty);
  const price = parseValue(formData.price);
  const discountPercent = parseValue(formData.discountPercent);
  const discount = parseValue(formData.discount);
  const taxPercent = parseValue(formData.taxPercent);
  const tax = parseValue(formData.tax);
  const total = parseValue(formData.total);


  const subtotal = qty * price;

  let calculatedDiscount = discount;
  let calculatedDiscountPercent = discountPercent;
  let calculatedTax = tax;
  let calculatedTaxPercent = taxPercent;
  let calculatedTotal = total;


  if (changedField === "discountPercent") {

    calculatedDiscountPercent = formData.discountPercent;
    if (subtotal > 0 && discountPercent > 0) {
      calculatedDiscount = subtotal * (discountPercent / 100);
    } else {
      calculatedDiscount = 0;
    }
  } else if (changedField === "discount") {

    calculatedDiscount = formData.discount;
    if (subtotal > 0 && discount > 0) {
      calculatedDiscountPercent = (discount / subtotal) * 100;
    } else {
      calculatedDiscountPercent = 0;
    }
  } else if (subtotal > 0) {

    if (discountPercent > 0) {
      calculatedDiscount = subtotal * (discountPercent / 100);
      calculatedDiscountPercent = discountPercent;
    } else if (discount > 0) {
      calculatedDiscountPercent = (discount / subtotal) * 100;
      calculatedDiscount = discount;
    } else {
      calculatedDiscount = 0;
      calculatedDiscountPercent = 0;
    }
  } else {
    calculatedDiscount = 0;
    calculatedDiscountPercent = 0;
  }

  const amountAfterDiscount = Math.max(0, subtotal - calculatedDiscount);

  if (changedField === "taxPercent") {

    const taxPercentValue = parseValue(formData.taxPercent);
    if (amountAfterDiscount > 0 && taxPercentValue >= 0) {
      calculatedTax = amountAfterDiscount * (taxPercentValue / 100);
      calculatedTaxPercent = taxPercentValue;
    } else {
      calculatedTax = 0;
      calculatedTaxPercent = taxPercentValue;
    }
  } else if (changedField === "tax") {

    const taxValue = parseValue(formData.tax);
    if (amountAfterDiscount > 0 && taxValue >= 0) {
      calculatedTaxPercent = (taxValue / amountAfterDiscount) * 100;
      calculatedTax = taxValue;
    } else if (amountAfterDiscount <= 0 && taxValue >= 0) {
      calculatedTaxPercent = 0;
      calculatedTax = taxValue;
    } else {
      calculatedTaxPercent = 0;
      calculatedTax = taxValue;
    }
  } else if (changedField === "total") {

    calculatedTotal = formData.total;
    const totalValue = parseValue(formData.total);
    if (amountAfterDiscount > 0) {
      calculatedTax = totalValue - amountAfterDiscount;
      calculatedTaxPercent = (calculatedTax / amountAfterDiscount) * 100;
    } else {
      calculatedTax = 0;
      calculatedTaxPercent = 0;
    }
  } else {

    if (amountAfterDiscount > 0) {
      if (taxPercent > 0) {
        calculatedTax = amountAfterDiscount * (taxPercent / 100);
        calculatedTaxPercent = taxPercent;
      } else if (tax > 0) {
        calculatedTaxPercent = (tax / amountAfterDiscount) * 100;
        calculatedTax = tax;
      } else {
        calculatedTax = 0;
        calculatedTaxPercent = 0;
      }
    } else {
      if (taxPercent > 0) {
        calculatedTaxPercent = taxPercent;
        calculatedTax = 0;
      } else if (tax > 0) {
        calculatedTax = tax;
        calculatedTaxPercent = 0;
      } else {
        calculatedTax = 0;
        calculatedTaxPercent = 0;
      }
    }
  }

  if (changedField !== "total") {
    calculatedTotal = amountAfterDiscount + calculatedTax;
  }

  if (changedField === "qty" || changedField === "price") {
    if (subtotal > 0) {
      if (discountPercent > 0) {
        calculatedDiscount = subtotal * (discountPercent / 100);
        calculatedDiscountPercent = discountPercent;
      } else if (discount > 0) {
        calculatedDiscountPercent = (discount / subtotal) * 100;
        calculatedDiscount = discount;
      }
      
      const newAmountAfterDiscount = Math.max(0, subtotal - calculatedDiscount);
      
      if (taxPercent > 0) {
        calculatedTax = newAmountAfterDiscount * (taxPercent / 100);
        calculatedTaxPercent = taxPercent;
      } else if (tax > 0 && newAmountAfterDiscount > 0) {
        calculatedTaxPercent = (tax / newAmountAfterDiscount) * 100;
        calculatedTax = tax;
      } else {
        calculatedTax = 0;
        calculatedTaxPercent = 0;
      }
      
      calculatedTotal = newAmountAfterDiscount + calculatedTax;
    }
  }

  let finalDiscountPercent = formData.discountPercent;
  let finalDiscount = formData.discount;
  let finalTaxPercent = formData.taxPercent;
  let finalTax = formData.tax;
  let finalTotal = formData.total;
  
  if (changedField === "discountPercent") {
    finalDiscountPercent = formData.discountPercent;
    if (calculatedDiscount > 0) {
      finalDiscount = calculatedDiscount.toFixed(2);
    } else {
      finalDiscount = "";
    }
  } else if (changedField === "discount") {
    finalDiscount = formData.discount;
    if (calculatedDiscountPercent > 0) {
      finalDiscountPercent = calculatedDiscountPercent.toFixed(2);
    } else {
      finalDiscountPercent = "";
    }
  } else {
    if (calculatedDiscountPercent > 0) {
      finalDiscountPercent = calculatedDiscountPercent.toFixed(2);
    } else if (formData.discountPercent === "") {
      finalDiscountPercent = "";
    }
    if (calculatedDiscount > 0) {
      finalDiscount = calculatedDiscount.toFixed(2);
    } else if (formData.discount === "") {
      finalDiscount = "";
    }
  }
  
  if (changedField === "taxPercent") {

    finalTaxPercent = formData.taxPercent;
    if (calculatedTax > 0) {
      finalTax = calculatedTax.toFixed(2);
    } else if (formData.taxPercent !== "" && formData.taxPercent !== "0" && amountAfterDiscount > 0) {
      finalTax = "0.00";
    } else {
      finalTax = "";
    }
  } else if (changedField === "tax") {
    finalTax = formData.tax;
    if (calculatedTaxPercent > 0) {
      finalTaxPercent = calculatedTaxPercent.toFixed(2);
    } else if (formData.tax !== "" && formData.tax !== "0" && amountAfterDiscount > 0) {
      finalTaxPercent = "0.00";
    } else {
      finalTaxPercent = "";
    }
  } else {
    if (calculatedTaxPercent > 0) {
      finalTaxPercent = calculatedTaxPercent.toFixed(2);
    } else if (formData.taxPercent === "") {
      finalTaxPercent = "";
    } else {
      finalTaxPercent = formData.taxPercent;
    }
    if (calculatedTax > 0) {
      finalTax = calculatedTax.toFixed(2);
    } else if (formData.tax === "") {
      finalTax = "";
    } else {
      finalTax = formData.tax;
    }
  }
  
  if (changedField !== "total") {
    if (calculatedTotal > 0) {
      finalTotal = calculatedTotal.toFixed(2);
    } else if (formData.total === "") {
      finalTotal = "";
    }
  }
  
  const result = {
    qty: formData.qty,
    price: formData.price,
    discountPercent: finalDiscountPercent,
    discount: finalDiscount,
    taxPercent: finalTaxPercent,
    tax: finalTax,
    total: finalTotal
  };

  return result;
};

