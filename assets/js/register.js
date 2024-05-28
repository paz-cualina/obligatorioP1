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
function luhn(card)
{
  let switchTo = true;
  let total = 0;
  for(let i = card.length-1; i >= 0; i--)
  {
    if(switchTo)
    {
      let subTotal = parseInt(card[i]) * 2;
      if(subTotal > 9) subTotal -= 9;
      total += subTotal;
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
document.getElementById("credit-card").oninput = (e) => {
  e.target.value = patternMatch({
    input: e.target.value,
    template: "xxxx xxxx xxxx xxxx",
  });
};
function patternMatch({ input, template }) {
  try {
    let i = 0;
    let plaintext = "";
    let counter = 0;
    while (i < template.length) {
      if (counter > input.length - 1) {
        template = template.substring(0, i);
        break;
      }
      if (template[i] === input[i]) {
        i++;
        counter++;
        continue;
      }
      if (template[i] === "x") {
        template = template.substring(0, i) + input[counter] + template.substring(i + 1);
        plaintext = plaintext + input[counter];
        counter++;
      }
      i++;
    }
    return template
  } catch {
    return ""
  }
}

document.getElementById("register-button").addEventListener("click", function() {
  const firstName = document.querySelector("#register-firstName").value.trim().toLowerCase();
  const lastName = document.querySelector("#register-lastName").value.trim().toLowerCase();
  const userName = document.querySelector("#register-user").value.trim().toLowerCase();
  const password = document.querySelector("#register-pwd").value.trim();
  const card = parseInt(document.querySelector("#credit-card").value.trim());

  if ( validateFirstName(firstName) && validateLastName(lastName) && validateUser(userName) && validatePassword(password) && luhn(card) ) {
    alert("User registered successfully");
  } else {
    alert("User registration failed");
  }

});