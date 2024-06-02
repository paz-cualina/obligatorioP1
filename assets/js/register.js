function containUpperCase(text) {
  for ( let i = 0; i < text.length; i++ ) {
    if ( text[i] >= "A" && text[i] <= "Z" ) {
      return true;
    } 
  }
  return false;
}
function containLowerCase(text) {
  for ( let i = 0; i < text.length; i++ ) {
    if ( text[i] >= "a" && text[i] <= "z" ) {
      return true;
    } 
  }
  return false;
}
function containNumber(text) {
  for ( let i = 0; i < text.length; i++ ) {
    if ( !isNaN(text[i]) ) {
      return true;
    } 
  }
  return false;
}
function validateFirstName(firstName) {
  if ( notEmpty(firstName) ) {
    if ( firstName.length >= 2 && firstName.length <= 12 ) {
      return true;
    } else {
      toastMessage("First Name must be between 2 and 12 characters", "error")
      return false;
    }
  } else {
    toastMessage("First Name cannot be empty", "error")
    return false; 
  }
}
function validateLastName(lastName) {
  if ( notEmpty(lastName) ) {
    if ( lastName.length >= 2 && lastName.length <= 12 ) {
      return true;
    } else {
      toastMessage("Last Name must be between 2 and 12 characters", "error")
      return false;
    }
  } else {
    toastMessage("Last Name cannot be empty", "error")
    return false; 
  }
}
function validateUser(userName) {
  if ( notEmpty(userName)) {
    if ( userName.length >= 6 && userName.length <= 20 ) {
      return true;
    } else {
      toastMessage("Username must be between 6 and 20 characters", "error")
      return false;
    }
  } else {
    toastMessage("Username cannot be empty", "error")
    return false; 
  }
}
function validatePassword(password) {
  if ( notEmpty(password) ) {
    if ( password.length >= 5 && containUpperCase(password) && containLowerCase(password) && containNumber(password) ) {
      return true;
    } else {
      toastMessage("Password failed", "error")
      return false;
    }
  } else { 
    toastMessage("Password cannot be empty", "error")
    return false; 
  }
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
    toastMessage("Card number must be 16 digits", "error")
    return false;
  }
  if (!luhn(card)) {
    toastMessage("Card number is invalid", "error")
    return false;
  }
  return true;
}
function validateCVC(cvc) {
  if (cvc.length !== 3) {
    toastMessage("CVC must be 3 digits", "error")
    return false;
  }
  for (let i = 0; i < cvc.length; i++) {
    if (isNaN(cvc[i])) {
      toastMessage("CVC must be numbers", "error")
      return false;
    }
  }
  return true;
}
