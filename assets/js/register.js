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
  if ( firstName === "") {
    alert("First Name cannot be empty");
    return false; 
  } else {
    if ( firstName.length >= 2 && firstName.length <= 12 ) {
      return true;
    } else {
      alert("First Name must be between 2 and 12 characters");
      return false;
    }
  }
}
function validateLastName(lastName) {
  if ( lastName === "") {
    alert("Last Name cannot be empty");
    return false; 
  } else {
    if ( lastName.length >= 2 && lastName.length <= 12 ) {
      return true;
    } else {
      alert("Last Name must be between 2 and 12 characters");
      return false;
    }
  }
}
function validateUser(userName) {
  if ( userName === "" ) {
    alert("Username cannot be empty")
    return false; 
  } else {
    if ( userName.length >= 6 && userName.length <= 20 ) {
      return true;
    } else {
      alert("Username must be between 6 and 20 characters");
      return false;
    }
  }
}
function validatePassword(password) {
  if ( password === "" ) {
    alert("Password cannot be empty");
    return false; 
  } else {
    if ( password.length >= 5 && containUpperCase(password) && containLowerCase(password) && containNumber(password) ) {
      return true;
    } else {
      alert("Password failed");
      return false;
    }
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
function luhn(card) {
  let switchTo = true;
  let total = 0;

  for (let i = card.length - 1; i >= 0; i--) {
    let digit = parseInt(card[i], 10);

    if (switchTo) {
      let subTotal = digit * 2;
      if (subTotal > 9) subTotal -= 9;
      total += subTotal;
    } else {
      total += digit;
    }

    switchTo = !switchTo;
  }
  console.log(total % 10 === 0)
  return total % 10 === 0;
}
function validateCard (card) {
  if (!cardFormat(card)) {
    alert("Card number must be 16 digits");
    return false;
  }
  if (!luhn(card)) {
    alert("Card number is invalid");
    return false;
  }
  return true;
}
function validateCVC (cvc) {
  if (cvc.length!== 3) {
    alert("CVC must be 3 digits");
    return false;
  }
  for (let i = 0; i < cvc.length; i++) {
    if (isNaN(cvc[i])) {
      alert("CVC must be 3 digits");
      return false;
    }
  }
  return true;
}
document.getElementById("register-button").addEventListener("click", function() {
  const firstName = document.querySelector("#register-firstName").value.trim().toLowerCase();
  const lastName = document.querySelector("#register-lastName").value.trim().toLowerCase();
  const userName = document.querySelector("#register-user").value.trim().toLowerCase();
  const password = document.querySelector("#register-pwd").value.trim();
  const card = parseInt(document.querySelector("#credit-card").value.trim());
  const cvc = parseInt(document.querySelector("#card-cvc").value.trim())

  if ( validateFirstName(firstName) && validateLastName(lastName) && validateUser(userName) && validatePassword(password) && validateCard(card) && validateCVC(cvc) ) {
    alert("User registered successfully");
  } else {
    alert("User registration failed");
  }

});