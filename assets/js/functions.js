
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
    document.querySelector(sectionId).style.display = "none";
}
function showSectionId(sectionId) {
    document.querySelector(sectionId).style.display = "block";
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
    toast.innerHTML = message;
    toast.classList.add(statusType);
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove(statusType);
        toast.classList.remove("show");
    }, 3000);
}