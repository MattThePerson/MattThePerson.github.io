


// change root highlight color
const rootHighlightColorInput = document.getElementById('root-highlight-color-input');
const rootStyles = getComputedStyle(document.documentElement);
rootHighlightColorInput.value = rootStyles.getPropertyValue('--highlight').trim().substring(1,);

rootHighlightColorInput.addEventListener('keydown', event => {
    if (event.key == 'Enter') {
        const input = event.target.value;
        console.log(input);
        document.documentElement.style.setProperty('--highlight', '#' + input);
    }
});

// logo fly off

document.getElementById('nav-logo').addEventListener('click', e => {
    console.log("timid");
    e.target.classList.add('timid');
});

