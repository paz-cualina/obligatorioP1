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
function hideSectionId(sectionId) {
    document.querySelector(sectionId).style.display = "none";
}
function showSectionId(sectionId) {
    document.querySelector(sectionId).style.display = "block";
}
