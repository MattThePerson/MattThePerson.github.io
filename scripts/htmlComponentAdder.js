

function addHtmlComponents() {
    adders = document.getElementsByClassName("html-component-injector");
    for (let i = adders.length-1; i >= 0; i--) {
        element = adders[i];
        componentName = element.getAttribute("html-component");
        // console.log("Injecting HTML component: " + componentName);
        html = componentMethods[componentName]();
        if (html) {
            element.insertAdjacentHTML("afterend", html);
            element.remove();
        } else {
            console.log("ERROR: Unable to get html for component " + componentName);
        }
    }
}

componentMethods = {
    "header" : HeaderTemplate,
    "footer" : FooterTemplate
}

/* COMPONENT METHODS */

function HeaderTemplate() {
    return `
<header>
<div class="site-logo">
    <div title="click me!" class="led-matrix-display random-color change-color-on-click pointer" data-width="3" data-height="3" data-updatems="250" data-size="13px"></div>
    <div id="nav-logo" title="don't click me!">matti</div>
</div>
<div class="top-nav">
    <div class="nav-item">
        <a href="index.html">home</a>
    </div>
    <div class="nav-item">
        <a href="about.html">about</a>
    </div>
    <div class="nav-item">
        <a href="contact.html">contact</a>
    </div>
    <div class="nav-icons">
        <a class="icon-external-link" href="https://github.com/MattThePerson" target="_blank">
            <!-- <img class="nav-icon" src="assets/icons/github-icon.svg"></img> -->
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a class="icon-external-link" href="https://www.linkedin.com/in/matt-stirling-986b90123/" target="_blank">
            <!-- <img class="nav-icon" src="assets/pinterest.png"> -->
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
            </svg>
        </a>
    </div>
    <div class="color-input-container">
        <div>#</div>
        <input id="root-highlight-color-input" type="text" autocomplete="off" title="change me!">
    </div>
</div>
</header>
    `
}

function FooterTemplate() {
    return `
<footer>
    Edited and stuff by Matt (Matti) Stirling
</footer>
    `
}

addHtmlComponents();