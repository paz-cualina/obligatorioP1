
function validateCVC(cvc) {
  if (cvc.length !== 3) {
    error("CVC must be 3 digits", "error")
    return false;
  }
  for (let i = 0; i < cvc.length; i++) {
    if (isNaN(cvc[i])) {
      error("CVC must be numbers", "error")
      return false;
    }
  }
  return true;
}

function cardFormat(card) {
  if (card.length !== 16) {
    return false;
  }
  for (let i = 0; i < card.length; i++) {
    if (isNaN(card[i])) {
      return false;
    }
  }
  return true;
}
function luhn(card)
{
  let switchTo = true;
  let total = 0;
  for(let i = card.length-1; i >= 0; i--)
  {
    if(switchTo)
    {
      let subTotal = parseInt(card[i]) * 2;
      if(subTotal > 9) {
        subTotal -= 9;
        total += subTotal;
      }
      switchTo = false;
    }
    else
    {
      total += parseInt(card[i]);
      switchTo = true;
    }
  }
  total = total * 9;
  total = String(total);

  return total[total.length-1];
}
function validateCard(card) {
  if (!cardFormat(card)) {
    error("Card number must be 16 digits", "error")
    return false;
  }
  if (!luhn(card)) {
    error("Card number is invalid", "error")
    return false;
  }
  return true;
}
function validateCVC(cvc) {
  if (cvc.length !== 3) {
    error("CVC must be 3 digits", "error")
    return false;
  }
  for (let i = 0; i < cvc.length; i++) {
    if (isNaN(cvc[i])) {
      error("CVC must be numbers", "error")
      return false;
    }
  }
  return true;
}
