


const terminalElement = document.querySelector('.terminal');


async function writeTerminalText() {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const text = terminalElement.dataset.text;
    let idx = 0;
    const initialDelay = 500;
    const timeBetweenChars = 60;
    const timeVariance = 13;

    await sleep(initialDelay);
    
    while (idx < text.length) {
        const char = text[idx++];
        terminalElement.textContent += char;
        const random = (Math.random()-0.5)*timeVariance;
        const adder = (char === ' ') ? -25 : 0;
        await sleep(timeBetweenChars + random + adder);
    }

    const terminalCursor = document.querySelector('.terminal-window .cursor');

    const intervalId = setInterval(() => {
        // Toggle the visibility
        terminalCursor.style.visibility = terminalCursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 700);
}

writeTerminalText();

