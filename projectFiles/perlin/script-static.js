// tried to render only each new part (failed)

let currentPoint;
let lastPoint;
let dataLength = 150; // amount of points
let amountOfLines = 1;
let offsetX = 6; // amount by which each line is offset
let offsetY = -6;

let grainX = 100;
let grainY = 100;
let ground = 0; // the value put into nosie()

let spacing = 3;
let translateXAmount = 0;
let headX = 0.75; // percent of canvas width, adjusted in setup()
let headY = 0;

/* SETUP */
function setup() {
    createCanvas(800,450);
    colorMode(HSB, 100);
    frameRate(30);

    headX = headX * width;
    headY = headY * height;
    background(90);
}

/* DRAW */
function draw() {

    // get new points
    let i = 0;
    lastPoint = currentPoint;
    currentPoint = newPoint(ground, i, grainY);
    ground += 1 / grainX;

    // render update
    translate(translateXAmount, 0);
    translateXAmount -= spacing;
    //console.log(translateXAmount);

    let addX = 0;
    let addY = 0;
    drawLine(headX-spacing, headY+currentPoint, headX, headY+lastPoint, addX, addY);


    // remove points
    
}


///// HELPER FUNCTIONS /////

// get new point via perlin noise
function newPoint(x, y, grainY) {
    return height * noise(x, y / grainY);
}

//
function drawShape(x1, y1, x2, y2, addX, addY) {
    //
}

// draws a line with x and y offset
function drawLine(x1, y1, x2, y2, offX, offY) {
    line(x1+offX, y1+offY, x2+offX, y2+offY);
}