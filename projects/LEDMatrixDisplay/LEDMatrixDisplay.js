/* 
LED Display Parameters:
- width, height
- color (fixed, random)
- content:
    - text
    - random (give threshold)
- text scroll behaviour (direction, speed)
- attributes:
    - flickering
- cursor interaction:
    - mouseenter scroll/stop scroll
    - mousemove pixels on
    - mousemove pixels change color
    - click pixels change color

- 
*/

/* VARIABLES */

const displayColors = ['orange', 'red', 'green', 'blue', 'yellow', 'purple', 'pink', 'white', 'cyan'];

const char_map = [
    ["00000000", "00000000", "00000000", "00000000", "00000000"], //space
    ["00000000", "00000000", "01111001", "00000000", "00000000"], //exclamation_mark
    ["00000000", "01110000", "00000000", "01110000", "00000000"], //double_quotes
    ["00010100", "01111111", "00010100", "01111111", "00010100"], //hash
    ["00010010", "00101010", "01111111", "00101010", "00100100"], //dollar_sign
    ["01100010", "01100100", "00001000", "00010011", "00100011"], //percent
    ["00110110", "01001001", "01010101", "00100010", "00000101"], //ampersand
    ["00000000", "01010000", "01100000", "00000000", "00000000"], //apostrophe
    ["00000000", "00011100", "00100010", "01000001", "00000000"], //left_parenthesis
    ["00000000", "01000001", "00100010", "00011100", "00000000"], //right_parenthesis
    ["00010100", "00001000", "00111110", "00001000", "00010100"], //asterisk
    ["00001000", "00001000", "00111110", "00001000", "00001000"], //plus
    ["00000000", "00000101", "00000110", "00000000", "00000000"], //comma
    ["00001000", "00001000", "00001000", "00001000", "00001000"], //minus
    ["00000000", "00000011", "00000011", "00000000", "00000000"], //full_stop
    ["00000010", "00000100", "00001000", "00010000", "00100000"], //forward_slash
    ["00111110", "01000101", "01001001", "01010001", "00111110"], //0
    ["00000000", "00100001", "01111111", "00000001", "00000000"], //1
    ["00100001", "01000011", "01000101", "01001001", "00110001"], //2
    ["01000010", "01000001", "01010001", "01101001", "01000110"], //3
    ["00001100", "00010100", "00100100", "01111111", "00000100"], //4
    ["01110010", "01010001", "01010001", "01010001", "01001110"], //5
    ["00011110", "00101001", "01001001", "01001001", "00000110"], //s6
    ["01000000", "01000111", "01001000", "01010000", "01100000"], //7
    ["00110110", "01001001", "01001001", "01001001", "00110110"], //8
    ["00110000", "01001001", "01001001", "01001010", "00111100"], //9
    ["00000000", "00110110", "00110110", "00000000", "00000000"], //colon
    ["00000000", "00110101", "00110110", "00000000", "00000000"], //semicolon
    ["00001000", "00010100", "00100010", "01000001", "00000000"], //less_than
    ["00010100", "00010100", "00010100", "00010100", "00010100"], //equals
    ["00000000", "01000001", "00100010", "00010100", "00001000"], //greater_than
    ["00100000", "01000000", "01000101", "01001000", "00110000"], //question_mark
    ["00100110", "01001001", "01001111", "01000001", "00111110"], //at
    ["00111111", "01000100", "01000100", "01000100", "00111111"], //A
    ["01111111", "01001001", "01001001", "01001001", "00110110"], //B
    ["00111110", "01000001", "01000001", "01000001", "00100010"], //C
    ["01111111", "01000001", "01000001", "00100010", "00011100"], //D
    ["01111111", "01001001", "01001001", "01001001", "01000001"], //E
    ["01111111", "01001000", "01001000", "01001000", "01000000"], //F
    ["00111110", "01000001", "01001001", "01001001", "00101111"], //G
    ["01111111", "00001000", "00001000", "00001000", "01111111"], //H
    ["00000000", "01000001", "01111111", "01000001", "00000000"], //I
    ["00000010", "00000001", "01000001", "01111110", "01000000"], //J
    ["01111111", "00001000", "00010100", "00100010", "01000001"], //K
    ["01111111", "00000001", "00000001", "00000001", "00000001"], //L
    ["01111111", "00100000", "00011000", "00100000", "01111111"], //M
    ["01111111", "00010000", "00001000", "00000100", "01111111"], //N
    ["00111110", "01000001", "01000001", "01000001", "00111110"], //O
    ["01111111", "01001000", "01001000", "01001000", "00110000"], //P
    ["00111110", "01000001", "01000101", "01000010", "00111101"], //Q
    ["01111111", "01001000", "01001100", "01001010", "00110001"], //R
    ["00110001", "01001001", "01001001", "01001001", "01000110"], //S
    ["01000000", "01000000", "01111111", "01000000", "01000000"], //T
    ["01111110", "00000001", "00000001", "00000001", "01111110"], //U
    ["01111100", "00000010", "00000001", "00000010", "01111100"], //V
    ["01111110", "00000001", "00001110", "00000001", "01111110"], //W
    ["01100011", "00010100", "00001000", "00010100", "01100011"], //X
    ["01110000", "00001000", "00000111", "00001000", "01110000"], //Y
    ["01000011", "01000101", "01001001", "01010001", "01100001"], //Z
    ["00000000", "01111111", "01000001", "01000001", "00000000"], //left_square
    ["00100000", "00010000", "00001000", "00000100", "00000010"], //back_slash
    ["00000000", "01000001", "01000001", "01111111", "00000000"], //right_square
    ["00010000", "00100000", "01000000", "00100000", "00010000"], //circumflex
    ["00000001", "00000001", "00000001", "00000001", "00000001"], //underscore
    ["00000000", "01000000", "00100000", "00010000", "00000000"], //grave_accent
    ["00000010", "00010101", "00010101", "00010101", "00001111"], //a
    ["01111111", "00001001", "00001001", "00001001", "00000110"], //b
    ["00001110", "00010001", "00010001", "00010001", "00010001"], //c
    ["00000110", "00001001", "00001001", "00001001", "01111111"], //d
    ["00001110", "00010101", "00010101", "00010101", "00001101"], //e
    ["00000000", "00001000", "00111111", "01001000", "00100000"], //f
    ["00001001", "00010101", "00010101", "00010101", "00011110"], //g
    ["01111111", "00001000", "00001000", "00001000", "00000111"], //h
    ["00000000", "00000000", "00101111", "00000000", "00000000"], //i
    ["00000010", "00000001", "00000001", "01011110", "00000000"], //j
    ["00000000", "01111111", "00000100", "00001010", "00010001"], //k
    ["00000000", "01000001", "01111111", "00000001", "00000000"], //l
    ["00011111", "00010000", "00001110", "00010000", "00011111"], //m
    ["00011111", "00001000", "00010000", "00010000", "00001111"], //n
    ["00001110", "00010001", "00010001", "00010001", "00001110"], //o
    ["00011111", "00010100", "00010100", "00010100", "00001000"], //p
    ["00001000", "00010100", "00010100", "00010100", "00011111"], //q
    ["00011111", "00001000", "00010000", "00010000", "00001000"], //r
    ["00001001", "00010101", "00010101", "00010101", "00010010"], //s
    ["00010000", "00010000", "01111110", "00010001", "00010010"], //t
    ["00011110", "00000001", "00000001", "00000001", "00011110"], //u
    ["00011100", "00000010", "00000001", "00000010", "00011100"], //v
    ["00011110", "00000001", "00000110", "00000001", "00011110"], //w
    ["00010001", "00001010", "00000100", "00001010", "00010001"], //x
    ["00010000", "00001001", "00000110", "00001000", "00010000"], //y
    ["00010001", "00010011", "00010101", "00011001", "00010001"], //z
    ["00001000", "00110110", "01000001", "01000001", "00000000"], //leftcurly
    ["00000000", "00000000", "01111111", "00000000", "00000000"], //vertline
    ["00000000", "01000001", "01000001", "00110110", "00001000"], //rightcurly
    ["00000100", "00001000", "00001000", "00001000", "00010000"], //tilde
    ["01111111", "01000001", "01000001", "01000001", "01111111"] //del
]


/* PIXEL PATTERN FUNCTIONS */


function text_to_pixel_matrix(text, height) {
    let values = [];
    for (let char of text) {
        let ascii_number = char.charCodeAt(0);
        let column_bytes = char_map[ascii_number-32];
        for (let col_str of column_bytes) {
            let col = Array(height).fill(0);
            let col_values = col_str.split('').map(Number);
            for (let j = 0; j < col_values.length; j++) {
                if (j < height) {
                    col[j] = col_values[j];
                }
            }
            values.push(col);
        }
        values.push(Array(height).fill(0));
    }
    return values;
}


function generate_random_pixels(display) {
    let values = [];
    for (let i = 0; i < display.width; i++) {
        let col = [];
        for (let j = 0; j < display.height; j++) {
            col[j] = + (Math.random() <= display.randthresh);
        }
        values.push(col);
    }
    return values;
}

function diagonal_stripes(display) {
    let values = [];
    let col = Array(display.height).fill(0);
    let j = 0;
    for (let i = 0; i < display.height*2; i++) {
        col[j] = 1 - col[j];
        if (++j >= display.height)
            j = 0;
        values.push(col.slice());
    }
    return values;
}


/* FUNCTIONS */

function generate_pixel_values_matrix(display) {
    if (display.mode == 'text')
        return text_to_pixel_matrix(display.text, display.height);
    else if (display.mode == 'function')
        return display.pixel_pattern_function(display);
    else if (display.mode == 'random')
        return generate_random_pixels(display);
}

function update_display_element(display, element) {
    element.querySelectorAll('.display-col').forEach((col, i) => {
        col.querySelectorAll('.display-pixel').forEach((pixel, j) => {
            pixel.classList.remove('on-pixel');
            if (display.switched_on) {
                let x = i-display.pixel_displacement_x;
                if (x < 0) x += display.pixel_values.length;
                if (x >= display.pixel_values.length) x -= (display.pixel_values.length * Math.floor(x/display.pixel_values.length));
                let y = j-display.pixel_displacement_y;
                if (y < 0) y += display.height;
                if (y >= display.height) y -= display.height;
                if (display.pixel_values[x][y])
                    pixel.classList.add('on-pixel');
            }
        });
    });
}

function update_pixel_displacement(display) {
    if (display.direction == 'left') {
        display.pixel_displacement_x--;
    } else if (display.direction == 'right') {
        display.pixel_displacement_x++;
    } else if (display.direction == 'up') {
        display.pixel_displacement_y--;
    } else if (display.direction == 'down') {
        display.pixel_displacement_y++;
    }
    if (display.pixel_displacement_x <= -display.pixel_values.length || display.pixel_displacement_x >= display.pixel_values.length)
        display.pixel_displacement_x = 0;
    if (display.pixel_displacement_y <= -display.height || display.pixel_displacement_y >= display.height)
        display.pixel_displacement_y = 0;
}

function setDisplayPixelsColor(displayElement, color) {
    if (typeof color === 'string') {
        displayElement.querySelectorAll('.display-pixel').forEach(pixel => {
            displayColors.forEach(color => pixel.classList.remove(color));
            pixel.classList.add(color)
        });
    } else {
        // pixel color map option
    }
}


/* UTILITY FUNCTIONS */

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

function getRandomItem(array) {
    return array[ Math.floor(Math.random()*array.length) ];
}

function getRandomItemDiff(array, compare) {
    for (let i = 0; i < 100; i++) {
        let item = getRandomItem(array, compare);
        if (item != compare)
            return item;
    }
}

/* ADD STYLE */

const style = document.createElement('style');
style.innerHTML = `
.led-matrix-display {
    min-height: 25px;
    width: fit-content;
}
.display-background {
    background: rgb(5, 5, 5);
    display: flex;
    width: fit-content;
    padding: 2px;
    border-radius: 2px;
    border: 2px solid black;
}
.display-col {
    display: flex;
    flex-direction: column;
}

.display-pixel {
    height: 0.3em;
    width:  0.3em;
    margin: 0.2em;
    border-radius: 30%;
    background: rgb(43, 43, 43);
    box-shadow: 0 0 0.1em 0.1em rgba(39, 39, 39, 0.514);
    opacity: 1;
    animation: none;
}

@keyframes flicker {
    0%,  { opacity: 1; }
    10%  {opacity: 0.4}
    20%  {opacity: 1}
    30%  {opacity: 0.4}
    40%  {opacity: 1}
    50%  {opacity: 0.6}
    80%  {opacity: 0.6}
    90%  {opacity: 1}
    100% {opacity: 1}
}

.display-pixel.flicker {
    animation: flicker 0.4s infinite;
}


/* ON PIXEL COLORS */

.display-pixel.on-pixel.orange {
    background: rgb(255, 191, 73);
    box-shadow: 0 0 0.1em 0.1em rgba(255, 196, 86, 0.466),
                0 0 0.05em 0.05em orangered,
                0 0 0.2em 0.2em rgba(255, 166, 0, 0.104),
                0 0 0.7em 0.7em rgba(255, 177, 33, 0.05),
                0 0 12px 12px rgba(255, 177, 33, 0.05);
}

.display-pixel.on-pixel.red {
    background: rgb(255, 94, 121);
    box-shadow: 0 0 0.1em 0.1em rgba(255, 86, 114, 0.466),
                0 0 0.05em 0.05em rgb(255, 0, 149),
                0 0 0.2em 0.2em rgba(255, 0, 98, 0.104),
                0 0 0.7em 0.7em rgba(255, 33, 100, 0.05),
                0 0 12px 12px rgba(255, 33, 100, 0.05);
}
.display-pixel.on-pixel.green {
    background: rgb(111, 255, 118);
    box-shadow: 0 0 0.1em 0.1em rgba(86, 255, 86, 0.466),
                0 0 0.05em 0.05em rgb(0, 255, 42),
                0 0 0.2em 0.2em rgba(0, 255, 0, 0.104),
                0 0 0.7em 0.7em rgba(33, 255, 100, 0.05),
                0 0 12px 12px rgba(33, 255, 100, 0.05);
}
.display-pixel.on-pixel.blue {
    background: rgb(143, 154, 255);
    box-shadow: 0 0 0.1em 0.1em rgba(86, 97, 255, 0.466),
                0 0 0.05em 0.05em rgb(0, 26, 255),
                0 0 0.2em 0.2em rgba(0, 38, 255, 0.104),
                0 0 0.7em 0.7em rgba(37, 33, 255, 0.05),
                0 0 15px 15px rgba(37, 33, 255, 0.05);
}
.display-pixel.on-pixel.purple {
    background: rgb(223, 143, 255);
    box-shadow: 0 0 0.1em 0.1em rgba(201, 86, 255, 0.466),
                0 0 0.05em 0.05em rgb(162, 0, 255),
                0 0 0.2em 0.2em rgba(212, 0, 255, 0.104),
                0 0 0.7em 0.7em rgba(211, 33, 255, 0.05),
                0 0 15px 15px rgba(218, 33, 255, 0.05);
}
.display-pixel.on-pixel.yellow {
    background: rgb(244, 255, 143);
    box-shadow: 0 0 0.1em 0.1em rgba(252, 255, 86, 0.466),
                0 0 0.05em 0.05em rgb(251, 255, 0),
                0 0 0.2em 0.2em rgba(251, 255, 0, 0.104),
                0 0 0.7em 0.7em rgba(255, 251, 33, 0.05),
                0 0 15px 15px rgba(255, 240, 33, 0.05);
}
.display-pixel.on-pixel.cyan {
    background: rgb(143, 251, 255);
    box-shadow: 0 0 0.1em 0.1em rgba(86, 221, 255, 0.466),
                0 0 0.05em 0.05em rgb(0, 225, 255),
                0 0 0.2em 0.2em rgba(0, 225, 255, 0.104),
                0 0 0.7em 0.7em rgba(33, 222, 255, 0.05),
                0 0 15px 15px rgba(33, 203, 255, 0.05);
}
.display-pixel.on-pixel.pink {
    background: rgb(255, 143, 246);
    box-shadow: 0 0 0.1em 0.1em rgba(255, 86, 255, 0.466),
                0 0 0.05em 0.05em rgb(255, 0, 170),
                0 0 0.2em 0.2em rgba(255, 0, 221, 0.104),
                0 0 0.7em 0.7em rgba(255, 33, 207, 0.05),
                0 0 15px 15px rgba(255, 33, 207, 0.05);
}
.display-pixel.on-pixel.white {
    background: rgb(255, 255, 255);
    box-shadow: 0 0 0.1em 0.1em rgba(252, 255, 216, 0.466),
                0 0 0.05em 0.05em rgb(255, 255, 255),
                0 0 0.2em 0.2em rgba(255, 255, 255, 0.104),
                0 0 0.7em 0.7em rgba(255, 255, 255, 0.05),
                0 0 15px 15px rgba(255, 255, 255, 0.05);
}
`
document.head.appendChild(style);


/* CREATE DISPLAYS */

const displays = [];

document.querySelectorAll('.led-matrix-display').forEach(displayElement => {
    /* console.log("Creating LED Matrix Display"); */

    let display = {
        width : parseInt(displayElement.dataset.width) || 36,
        height : parseInt(displayElement.dataset.height) || 8,
        text : displayElement.dataset.text || null,
        pixel_displacement_x : 0,
        pixel_displacement_y : 0,
        pixel_pattern_function : diagonal_stripes,
        mode : 'random',
        randthresh : displayElement.dataset.randthresh || 0.5,
        updatems : parseInt(displayElement.dataset.updatems) || 500,
        vertical_mode : displayElement.classList.contains('vertical'),
        paused : false,
        switched_on : !displayElement.classList.contains('off'),
    };
    display.direction = ['left', 'right', 'up', 'down'].find(direction => displayElement.classList.contains(direction));
    if (!display.text) display.mode = 'random';
    for (let mode of ['random', 'function', 'text'])
        if (displayElement.classList.contains(mode))
            display.mode = mode;
    display.pixel_values = generate_pixel_values_matrix(display);
    
    // Create display elements
    const pixelMargin = displayElement.dataset.pixelmargin || "0.2em";
    const background = document.createElement('div');
    background.className = 'display-background';
    for (let i = 0; i < display.width; i++) {
        let col = document.createElement('div');
        col.className = 'display-col';
        for (let j = 0; j < display.height; j++) {
            let pixel = document.createElement('div');
            pixel.classList.add('display-pixel');
            pixel.style.margin = pixelMargin;
            col.appendChild(pixel);
        }
        background.appendChild(col);
    }
    displayElement.appendChild(background);
    displayElement.style['font-size'] = displayElement.dataset.size || '18px';
    if (displayElement.classList.contains('vertical')) {
        background.style['flex-direction'] = 'column';
        background.querySelectorAll('.display-col').forEach(col => col.style['flex-direction'] = 'row');
    }
    if (displayElement.classList.contains('pointer'))
        displayElement.style.cursor = 'pointer';

    // add color class to each pixel
    let pixelColor = displayColors.find(color => displayElement.classList.contains(color));
    // console.log(pixelColor);
    if (pixelColor == null)
        pixelColor = 'orange';
    if (displayElement.classList.contains('random-color'))
        pixelColor = getRandomItem(displayColors);
    setDisplayPixelsColor(displayElement, pixelColor);

    for (let color of displayColors) {
        if (displayElement.classList.contains(color)) {
            setDisplayPixelsColor(displayElement, color)
        }
    }

    // EVENR LISTENERS
    if (displayElement.classList.contains('mousepause')) {
        displayElement.addEventListener('mouseenter', arg => {
            display.paused = true;
        });
        displayElement.addEventListener('mouseleave', arg => {
            display.paused = false;
        });
    }
    if (displayElement.classList.contains('change-color-on-click')) {
        displayElement.addEventListener('click', arg => {
            let color = getRandomItem(displayColors);
            console.log(color);
            setDisplayPixelsColor(displayElement, color);
        });
    }
    else if (!displayElement.classList.contains('noclick')) {
        displayElement.addEventListener('click', arg => {
            display.switched_on = !display.switched_on;
        });
    }

    
    /* SET IN MOTION! */
    setInterval(arg => {
        if (display.switched_on)
            update_pixel_displacement(display, displayElement);
        if (!display.paused)
            update_display_element(display, displayElement);
        if (!displayElement.classList.contains('still') && display.mode == 'random' && display.direction == null)
            display.pixel_values = generate_pixel_values_matrix(display);
    }, display.updatems);

    

    // flicker
    if (displayElement.classList.contains('flicker')) {
        setInterval(() => {
            /* console.log("Adding flicked"); */
            displayElement.querySelectorAll('.display-pixel').forEach(pixel => pixel.classList.add('flicker') );
            setTimeout(() => {
                /* console.log("Removing flicker"); */
                displayElement.querySelectorAll('.display-pixel').forEach(pixel => pixel.classList.remove('flicker') );
            }, Math.random()*300);
        }, /* (Math.random()**2)*3000 +  */ Math.random()*4000 + 1000);
    }
    displays.push(display);
});


