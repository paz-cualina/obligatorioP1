
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
    toast.innerHTML = message;
    toast.classList.add(statusType);
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove(statusType);
        toast.classList.remove("show");
    }, 3000);
}
// Show next view
function showNextView( nextView ) {
    hideCommonClass(".view");
    showSectionId(nextView);
}

// Show layout for each type of user
function showUserLayout() {
    if ( currentUser.admin === false && Object.keys(currentUser).length > 0) {
        showCommonClass(".buyer-layout");
        hideCommonClass(".admin-sidebar-wrapper");
    } else if ( currentUser.admin && Object.keys(currentUser).length > 0) {
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