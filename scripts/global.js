

/* FUNCTIONS */

const pageAccessedByReload = (
    (window.performance.navigation && window.performance.navigation.type === 1) ||
        window.performance
            .getEntriesByType('navigation')
            .map((nav) => nav.type)
            .includes('reload')
);


/* MAIN */

// change root highlight color
const rootHighlightColorInput = document.getElementById('root-highlight-color-input');
const rootStyles = getComputedStyle(document.documentElement);
rootHighlightColorInput.value = rootStyles.getPropertyValue('--highlight').trim().substring(1,);


if (pageAccessedByReload) {
    localStorage.removeItem('mattisSanctum-highlightColor');
}

const color = localStorage.getItem('mattisSanctum-highlightColor');
if (color) {
    rootHighlightColorInput.value = color;
    document.documentElement.style.setProperty('--highlight', '#' + color);
}

rootHighlightColorInput.addEventListener('keydown', event => {
    if (event.key !== 'Backspace') {
        setTimeout(() => {

            const highlightColor = event.target.value;
            // const highlightColor = rootHighlightColorInput.value;
            console.log(rootHighlightColorInput.value);
            localStorage.setItem('mattisSanctum-highlightColor', highlightColor);
            document.documentElement.style.setProperty('--highlight', '#' + highlightColor);
        }, 10);
    }
});

// logo fly off

document.getElementById('nav-logo').addEventListener('click', e => {
    console.log("timid");
    e.target.classList.add('timid');
});

