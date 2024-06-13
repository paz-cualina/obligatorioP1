// html elements
const toastWrapper = document.querySelector(".toast-wrapper");

// global variables
let currentUser = [];
let aDataProduct = [];
let filterSale = false;
let tabStatus = "pending";

// system instance
const aSystem = new System();

// initial state
function initialState(){
  aSystem.createProductList();
  currentUser = [];
}
initialState();

// register buyer
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

// login users
document.getElementById("login-button").addEventListener("click", loginUser);
function loginUser(){
  const userName = document.getElementById("login-user").value.trim().toLowerCase();
  const password = document.getElementById("login-pwd").value.trim();
  const checkbox = document.querySelector('input[name="radio"]:checked');

  aSystem.loginUser(userName, password, checkbox);
}

// logout users
document.getElementById("log-out-btn").addEventListener("click", logOut);
document.getElementById("log-out-btn-admin").addEventListener("click", logOut);
function logOut(){
  currentUser = [];
  showNextView("user-login");
  showUserLayout();
}

// upload new product
document.getElementById("product-upload-add").addEventListener("click", addNewProduct);
function addNewProduct(){
  const productUploadName = document.getElementById("product-upload-name").value.trim();
  const productUploadPrice = parseInt(document.getElementById("product-upload-price").value.trim());
  const productUploadDescription = document.getElementById("product-upload-description").value.trim();
  const productUploadImg = document.getElementById("product-upload-img").value.trim().toLowerCase();
  const productUploadStock = parseInt(document.getElementById("product-upload-stock").value.trim());

  const newProduct = new Product(productUploadName, productUploadPrice, productUploadDescription, productUploadImg, productUploadStock, true, false);

  aSystem.addProduct(newProduct);
  aSystem.createProductList();
}

// show product details
document.querySelector(".product-list-ul").addEventListener("click", ($event) => {
  const product = $event.target.closest("li");
  if (product.getAttribute('data-productId')) {
    showProductDetails(product);
  }
});

function showProductDetails(element) {
  const dataIdProduct = element.getAttribute("data-productid");
  aSystem.productDetail(dataIdProduct);
  showNextView("product-details");
  counterQty();
  window.scrollTo(0, 0);
}

// filter on sale products
document.getElementById("filter-sale").addEventListener("click", onSale);
function onSale(){
  filterSale = this.checked;
  aSystem.createProductList();
}

// buy product, create purchase order
document.getElementById("btn-buy").addEventListener("click", buyProduct);
function buyProduct(){
  const productQty = parseInt(document.getElementById("qty-product").value);
  const newPurchase = new Purchase (currentUser.id, aDataProduct, productQty, "pending", (productQty * aDataProduct.productPrice));

  aSystem.addPurchase(newPurchase);
  aSystem.showPurchaseOrders("pending");
  showNextView("purchase-orders");
}

// go to register page
document.getElementById("btn-go-register").addEventListener("click", goRegister);
function goRegister(){
  showNextView("user-registration");
}

// go to login page
document.getElementById("btn-go-login").addEventListener("click", goLogin);
function goLogin(){
  showNextView("user-login");
}

// return to list of products after purchase
document.getElementById("btn-go-list").addEventListener("click", goList);
function goList(){
  showNextView("list-of-products");
  document.getElementsByClassName('main-products')[0].scrollIntoView();
}

// navigate on admin bar sections 
document.querySelectorAll(".admin-sidebar li").forEach(element => {
  element.addEventListener("click", goAdminSection);
  function goAdminSection(){
     document.querySelectorAll(".admin-sidebar li.active").forEach(activeElement => {
      activeElement.classList.remove("active");
    });
    element.classList.add("active");
    const sidebarItem = element.getAttribute("data-sidebar");
    showNextView(sidebarItem);
    if(sidebarItem === "purchase-approval-section"){
      aSystem.showPurchaseOrders("pending");
    }
  }
});

// purchase orders by status
document.querySelectorAll(".list-tabs-orders li").forEach(element => {
  element.addEventListener("click", showViewOrder);
  function showViewOrder(){
    tabStatus = element.getAttribute("data-orders");
    aSystem.showPurchaseOrders(tabStatus);
  }
});


// cancel purchase button buyer
document.getElementById("list-of-orders-buyer").addEventListener("click", ($event) => {
  const itemPurchase = $event.target.closest("li .btn-purchase").getAttribute('data-purchaseId');
  const btnStatusAction = $event.target.closest("li .btn-purchase").getAttribute('data-status-action');

  aSystem.findPurchaseToChangeStatus(itemPurchase, btnStatusAction);
  aSystem.showPurchaseOrders(tabStatus);
  
});

// cancel purchase button admin
document.getElementById("list-of-orders-admin").addEventListener("click", ($event) => {
  const itemPurchase = $event.target.closest("li .btn-purchase").getAttribute('data-purchaseId');
  const btnStatusAction = $event.target.closest("li .btn-purchase").getAttribute('data-status-action');
  
  aSystem.findPurchaseToChangeStatus(itemPurchase, btnStatusAction);
  aSystem.showPurchaseOrders(tabStatus);
  
});