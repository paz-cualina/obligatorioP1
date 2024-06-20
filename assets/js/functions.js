
// General functions
function hideCommonClass(className) {
    document.querySelectorAll(className).forEach(element => {
        element.style.display = "none";
    });
}
function showCommonClass(className) {
    document.querySelectorAll(className).forEach(element => {
        element.style.display = "block";
    });
}
function hideSectionId(sectionId) {
    document.getElementById(sectionId).style.display = "none";
}
function showSectionId(sectionId) {
    document.getElementById(sectionId).style.display = "block";
}
function notEmpty(value) {
    if ( value === "" ) {
      return false; 
    } else {
        return true;
    }
}
function isNumber(value) {
    if ( !isNaN(value) ) {
      return true; 
    } else {
        return false;
    }
}
function greaterZero(value) {
    if ( value > 0 ) {
      return true; 
    } else {
        return false;
    }
}

// Toast
function toastMessage(message, statusType) {
    if ( loggedIn ) {
        let toast = document.createElement("li");
        toast.classList.add("toast");
        toast.innerHTML = message;
        toast.classList.add(statusType);
        toastWrapper.appendChild(toast);
        setTimeout(() => {
            toastWrapper.innerHTML = "";
        }, 3000);
    }
}
// Show next view
function showNextView( nextView ) {
    hideCommonClass(".view");
    showSectionId(nextView);
}

// Show layout for each type of user
function showUserLayout() {
    if ( currentUser.admin === false) {
        showCommonClass(".buyer-layout");
        hideCommonClass(".admin-sidebar-wrapper");
    } else if ( currentUser.admin) {
        showCommonClass(".admin-sidebar-wrapper");
        hideCommonClass(".buyer-layout");
    } else {
        hideCommonClass(".admin-sidebar-wrapper");
        hideCommonClass(".buyer-layout");
    }
}

// Show current admin userName on sidebar
function dataAdminUser(){
    document.getElementById("sidebar-user-name").innerHTML = currentUser.userName;
}

// Counter quantity of products
function counterQty() {
    const btnMinus = document.querySelector(".btn-minus");
    const btnPlus = document.querySelector(".btn-plus");
    const qtyProduct = document.getElementById("qty-product");
  
    btnMinus.addEventListener("click", function() {
        let currentValue = parseInt(qtyProduct.value);
        if (currentValue > 1) {
            qtyProduct.value = currentValue - 1;
        }
    });

    btnPlus.addEventListener("click", function() {
        let currentValue = parseInt(qtyProduct.value);
        qtyProduct.value = currentValue + 1;
    });

};

function findObjectByNumericId(allObject, propertyName, matchingId) {
    let foundObject = null;
    let index = 0;
    
    while (foundObject === null && index < allObject.length) {
        if (parseInt(allObject[index][propertyName]) === parseInt(matchingId)) {
            foundObject = allObject[index];         
        }else { index++; }
    }
    return foundObject
}

function findObjectByValue(allObject, propertyName, matchingValue) {
    let foundObject = null;
    let index = 0;
    
    while (foundObject === null && index < allObject.length) {
        if (allObject[index][propertyName] === matchingValue) {
            foundObject = allObject[index];         
        }else { index++; }
    }
    return foundObject
}

function toggleClass(elemetId, className){
    const element = document.getElementById(elemetId);
    element.classList.toggle(className);
}

function restoreImgPlaceholder(){
    document.getElementById("loaded-img").src = `./assets/img/product-placeholder.png`;
}

function cleanInputs(formId){
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');
    const textarea = form.querySelectorAll('textarea');
    inputs.forEach(input => {
        input.value = '';
    });
    if(textarea !== undefined || textarea !== null) {
        textarea.forEach(texta => {
            texta.value = '';
        });
    }
}