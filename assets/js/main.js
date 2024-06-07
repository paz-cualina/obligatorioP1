// html elements
const toast = document.querySelector(".toast");
let currentUser = [];
let aDataProduct = [];
let filterSale = false;

// system
const aSystem = new System();

function initialState(){
  aSystem.crateProductList();
  currentUser = [];
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

document.getElementById("login-button").addEventListener("click", loginUser);
function loginUser(){
  const userName = document.getElementById("login-user").value.trim().toLowerCase();
  const password = document.getElementById("login-pwd").value.trim();
  const checkbox = document.getElementById("buyer-radio").checked;

  aSystem.loginUser(userName, password, checkbox);

}

document.getElementById("log-out-btn").addEventListener("click", logOut);
document.getElementById("log-out-btn-admin").addEventListener("click", logOut);
function logOut(){
  currentUser = [];
  showNextView("user-login");
  showBuyerLayout();
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
    showNextView( "product-details" );
  }
});

document.getElementById("filter-sale").addEventListener("click", onSale);

function onSale(){
  filterSale = this.checked;
  aSystem.crateProductList();
}

document.getElementById("btn-buy").addEventListener("click", buyProduct);
function buyProduct(){
  const productQty = parseInt(document.getElementById("qty-product").value);
  const newPurchase = new Purchase (currentUser.id, aDataProduct, productQty, "pending", (productQty * aDataProduct.productPrice));

  aSystem.addPurchase(newPurchase);
  aSystem.createPurchaseOrders("pending");
  showNextView("purchase-orders");

}

document.getElementById("btn-go-register").addEventListener("click", goRegister);
function goRegister(){
  showNextView( "user-registration" );
}

document.getElementById("btn-go-login").addEventListener("click", goLogin);
function goLogin(){
  showNextView( "user-login" );
}

document.getElementById("btn-go-list").addEventListener("click", goList);
function goList(){
  showNextView( "list-of-products" );
}

document.querySelectorAll(".admin-sidebar li").forEach(element => {
  element.addEventListener("click", goAdminSection);
  function goAdminSection(){
    const sidebarItem = element.getAttribute("data-sidebar");
    showNextView( sidebarItem );
    if(sidebarItem === "purchase-approval-section"){
      aSystem.createPurchaseOrders("pending");
    }
  }
});