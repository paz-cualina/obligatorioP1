const newSystem = new System();

document.getElementById("register-button").addEventListener("click", registerBuyer);
function registerBuyer(){
  const firstName = document.querySelector("#register-firstName").value.trim().toLowerCase();
  const lastName = document.querySelector("#register-lastName").value.trim().toLowerCase();
  const userName = document.querySelector("#register-user").value.trim().toLowerCase();
  const password = document.querySelector("#register-pwd").value.trim();
  const card = document.querySelector("#credit-card").value.trim();
  const cvc = document.querySelector("#card-cvc").value.trim();

  const newBuyer = new Buyer(firstName, lastName, userName, password, card, cvc);

  if (newBuyer.validate()) {
      newSystem.addBuyer(newBuyer);
  } else {
    alert("Can not be added to system");
  }
}