const siteNavMenu = document.querySelector(".site-nav-menu");

siteNavMenu.onmouseenter = () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("nav-invisible");

    nav.onmouseout = () => {
        nav.classList.toggle("nav-invisible");
    }
}

siteNavMenu.onmouseout = () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("nav-invisible");
}



