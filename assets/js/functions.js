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
