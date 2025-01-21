

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
        <div class="nav-item nav-icons">
            <img class="nav-icon" src="assets/github-icon.svg"></img>
            <img class="nav-icon" src="assets/pinterest.png">
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