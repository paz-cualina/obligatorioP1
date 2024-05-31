// html elements
const toast = document.querySelector(".toast");

// sistema
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
    //error(`Can not be added to system`, "error")
  }
}

document.getElementById("product-upload-add").addEventListener("click", addNewProduct);
function addNewProduct(){
  const productUploadName = document.querySelector("#product-upload-name").value.trim();
  const productUploadPrice = document.querySelector("#product-upload-price").value.trim();
  const productUploadStock = document.querySelector("#product-upload-stock").value.trim();
  const productUploadDescription = document.querySelector("#product-upload-description").value.trim();
  const productUploadImg = document.querySelector("#product-upload-img").value.trim();

  const newProduct = new Product(productUploadName, productUploadPrice, productUploadStock, productUploadDescription, productUploadImg );

  if (newProduct.validate()) {
    newSystem.addProduct(newProduct);
  } else {
    error("All inputs must be added, price and stock grater than 0", "error")
  }
}