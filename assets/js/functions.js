function hideCommonClass(hideClassName) {
    document.querySelectorAll(hideClassName).forEach(element => {
        element.style.display = "none";
    });
}
function showCommonClass(showClassName) {
    document.querySelectorAll(showClassName).forEach(element => {
        element.style.display = "block";
    });
}
function hideSectionId(sectonId) {
    document.querySelector(sectonId).style.display = "none";
}
function showSectionId(sectonId) {
    document.querySelector(sectonId).style.display = "block";
}
