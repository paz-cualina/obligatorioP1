// html elements
const toast = document.querySelector(".toast");

// system
const aSystem = new System();

document.getElementById("register-button").addEventListener("click", registerBuyer);
function registerBuyer(){
  const firstName = document.getElementById("register-firstName").value.trim().toLowerCase();
  const lastName = document.getElementById("register-lastName").value.trim().toLowerCase();
  const userName = document.getElementById("register-user").value.trim().toLowerCase();
  const password = document.getElementById("register-pwd").value.trim();
  const card = document.getElementById("credit-card").value.trim();
  const cvc = document.getElementById("card-cvc").value.trim();

  const newBuyer = new Buyer(firstName, lastName, userName, password, card, cvc);

  if (newBuyer.validate()) {
      aSystem.addBuyer(newBuyer);
  } else {
    //toastMessage(`Can not be added to system`, "error")
  }
}

document.getElementById("product-upload-add").addEventListener("click", addNewProduct);
function addNewProduct(){
  const productUploadName = document.getElementById("product-upload-name").value.trim();
  const productUploadPrice = parseInt(document.getElementById("product-upload-price").value.trim());
  const productUploadDescription = document.getElementById("product-upload-description").value.trim();
  const productUploadImg = document.getElementById("product-upload-img").value.trim();
  const productUploadStock = parseInt(document.getElementById("product-upload-stock").value.trim());

  const newProduct = new Product(productUploadName, productUploadPrice, productUploadDescription, productUploadImg, productUploadStock);

  if (newProduct.validate()) {
    console.log(newProduct)
    aSystem.addProduct(newProduct);
  } else {
    toastMessage("All inputs must be added. Price and stock must be greater than 0", "error")
  }

}