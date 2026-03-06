// Automatically update footer year

const year = new Date().getFullYear();
const footerLeft = document.querySelector(".footer-left");

if (footerLeft) {
    footerLeft.textContent = `© ${year} Sonia Nicoletti`;
}