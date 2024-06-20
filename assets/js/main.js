// html elements
const toastWrapper = document.querySelector(".toast-wrapper");

// global variables
let currentUser = {};
let aDataProduct = {};
let filterSale = false;
let tabStatus = "pending";
let totalEarnings = 0;
let loggedIn = false;

// system instance
const aSystem = new System();

// initial state
function initialState(){
  aSystem.createProductList();
  currentUser = {};
}
initialState();

// register buyer
document.getElementById("register-button").addEventListener("click", registerBuyer);
function registerBuyer(){
  const firstName = document.getElementById("register-firstName").value.trim().toLowerCase();
  const lastName = document.getElementById("register-lastName").value.trim().toLowerCase();
  const userName = document.getElementById("register-user").value.trim().toLowerCase();
  const password = document.getElementById("register-pwd").value.trim();
  const card = document.getElementById("credit-card").value.trim().replace(/-/g, '');
  const cvc = document.getElementById("card-cvc").value.trim();

  const newBuyer = new Buyer(firstName, lastName, userName, password, card, cvc);

  aSystem.addBuyer(newBuyer);
}

// login users
document.getElementById("login-button").addEventListener("click", loginUser);
function loginUser(){
  loggedIn = true;
  const userName = document.getElementById("login-user").value.trim().toLowerCase();
  const password = document.getElementById("login-pwd").value.trim();
  const checkbox = document.querySelector('input[name="radio"]:checked');

  aSystem.loginUser(userName, password, checkbox);
}

// logout users
document.getElementById("log-out-btn").addEventListener("click", logOut);
document.getElementById("log-out-btn-admin").addEventListener("click", logOut);
function logOut(){
  currentUser = {};
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
}

// show product details
document.querySelector(".product-list-ul").addEventListener("click", ($event) => {
  const product = $event.target.closest("li");
  const dataIdProduct = product.getAttribute("data-productId");
  if (dataIdProduct) {
    showProductDetails(dataIdProduct);
  }
});

function showProductDetails(dataIdProduct) {
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
  loggedIn = true;
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
    } else if (sidebarItem === "profile-section"){
      aSystem.createProfilesList();
    } else if (sidebarItem === "earnings-report-section"){
      aSystem.createEarningsList();
    }
  }
});

// navigate on buyer header 
document.querySelectorAll(".header nav ul li").forEach(element => {
  element.addEventListener("click", goBuyerSection);
  function goBuyerSection(){
    const navItem = element.getAttribute("data-nav");
    showNextView(navItem);
    if(navItem === "list-of-products"){
      aSystem.createProductList();
    } else if (navItem === "purchase-orders"){
      aSystem.showPurchaseOrders("pending");
    }
  }
});

// purchase orders by status
document.querySelectorAll(".list-tabs-orders li").forEach(element => {
  element.addEventListener("click", showViewOrder);
  function showViewOrder(){
    document.querySelectorAll(".list-tabs-orders li.active").forEach(activeElement => {
      activeElement.classList.remove("active");
    });
    element.classList.add("active");

    tabStatus = element.getAttribute("data-orders");
    aSystem.showPurchaseOrders(tabStatus);
  }
});

// cancel purchase button buyer
document.getElementById("list-of-orders-buyer").addEventListener("click", ($event) => {
  const actionButton = $event.target.closest(".btn-purchase");
  if (actionButton) {
    const itemPurchase = actionButton.getAttribute('data-purchaseId');
    const btnStatusAction = actionButton.getAttribute('data-status-action');

    aSystem.findPurchaseToChangeStatus(itemPurchase, btnStatusAction);
    aSystem.showPurchaseOrders(tabStatus);
  }
});

// cancel and approve purchase button admin
document.getElementById("list-of-orders-admin").addEventListener("click", ($event) => {
  const itemPurchase = $event.target.closest(".btn-purchase").getAttribute('data-purchaseId');
  const btnStatusAction = $event.target.closest(".btn-purchase").getAttribute('data-status-action');
  
  aSystem.findPurchaseToChangeStatus(itemPurchase, btnStatusAction);
  aSystem.showPurchaseOrders(tabStatus);
});

// table STOCK AND STATUS OF PRODUCTS
document.getElementById("stock-status-list").addEventListener("click", ($event) => {
  const dataInput = $event.target.closest("input");
  if (dataInput) {
    const dataProductId = dataInput.getAttribute('data-product-id');
    const dataSwitchAction = dataInput.getAttribute('data-switch-action');
    if (dataProductId && dataSwitchAction) {
      aSystem.findProductToChangeStatus(dataProductId, dataSwitchAction, dataInput.checked);
    }
  }
});

// input stock table STOCK AND STATUS OF PRODUCTS
document.getElementById("stock-status-list").addEventListener("input", ($event) => {
  const stockInput = $event.target.closest("input[type=number]");
  if (stockInput) {
    const dataProductId = stockInput.getAttribute("data-product-id");
    if (dataProductId) {
      const statusElement = stockInput.closest(".row").getElementsByClassName("switch-status")[0];
      aSystem.updateStockTable(dataProductId, stockInput.value, statusElement);
    }
  }
});

// Gallery Add Products
document.getElementById("btn-img").addEventListener("click", () => {
  toggleClass("img-gallery", "show")
});
document.getElementById("close-gallery").addEventListener("click", () => {
  toggleClass("img-gallery", "show")
});
document.querySelectorAll("#img-gallery ul li").forEach(element => {
  element.addEventListener("click", selectImageGallery);
  function selectImageGallery(){
    document.getElementById("product-upload-img").value = element.getAttribute("data-img-name");
    toggleClass("img-gallery", "show");
    document.getElementById("loaded-img").src = `./assets/img/products/${element.getAttribute("data-img-name")}.png`;
  }
});

// Credit Card Format
document.getElementById("credit-card").addEventListener('input', function() {

  let valueInput = document.getElementById("credit-card").value.replace(/-/g, '');

  let formattedValue = '';
  for (let i = 0; i < valueInput.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += '-';
      }
      formattedValue += valueInput[i];
  }
  document.getElementById("credit-card").value = formattedValue;
});