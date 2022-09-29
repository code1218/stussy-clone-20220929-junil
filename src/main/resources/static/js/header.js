const logoContainer = document.querySelector(".logo-container");
const siteNavMenu = document.querySelector(".site-nav-menu");
const nav = document.querySelector("nav");

logoContainer.onclick = () => {
    location.href = "/";
}
siteNavMenu.onmouseover = () => {
    nav.classList.remove("nav-invisible");
}
siteNavMenu.onmouseout = () => {
    nav.classList.add("nav-invisible");
}
nav.onmouseover = () => {
    nav.classList.remove("nav-invisible");
}
nav.onmouseout = () => {
    nav.classList.add("nav-invisible");
}


