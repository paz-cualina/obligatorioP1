// html elements
const toast = document.querySelector(".toast");

// system
const aSystem = new System();

function initialState(){
  aSystem.crateProductList();
}
initialState();

document.getElementById("register-button").addEventListener("click", registerBuyer);
function registerBuyer(){
  const firstName = document.getElementById("register-firstName").value.trim().toLowerCase();
  const lastName = document.getElementById("register-lastName").value.trim().toLowerCase();
  const userName = document.getElementById("register-user").value.trim().toLowerCase();
  const password = document.getElementById("register-pwd").value.trim();
  const card = document.getElementById("credit-card").value.trim();
  const cvc = document.getElementById("card-cvc").value.trim();

  const newBuyer = new Buyer(firstName, lastName, userName, password, card, cvc);

  aSystem.addBuyer(newBuyer);

}

document.getElementById("product-upload-add").addEventListener("click", addNewProduct);
function addNewProduct(){
  const productUploadName = document.getElementById("product-upload-name").value.trim();
  const productUploadPrice = parseInt(document.getElementById("product-upload-price").value.trim());
  const productUploadDescription = document.getElementById("product-upload-description").value.trim();
  const productUploadImg = document.getElementById("product-upload-img").value.trim();
  const productUploadStock = parseInt(document.getElementById("product-upload-stock").value.trim());

  const newProduct = new Product(productUploadName, productUploadPrice, productUploadDescription, productUploadImg, productUploadStock, true, false);

  aSystem.addProduct(newProduct);
  aSystem.crateProductList();

}




document.querySelectorAll(".product-list-ul li").forEach(element => {
  element.addEventListener("click", showProductDetails);
  function showProductDetails(){
    const dataIdProduct = element.getAttribute("data-productid");
    aSystem.productDetail(dataIdProduct);
  }
});