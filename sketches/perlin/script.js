// Renders every frame


/* Variables */
let points = [];
let lines = 15; // amount of lines
let offsetX = 8;
let offsetY = -13;

let dataLength = 150;
let spacing = 10;
let grainX = 1500; // 50 -> 1500
let grainY = 10;
let ground = 0;
let headX = 0.75; // percent of width to have head at

let grainXSlider;
let offsetYSlider;
let offsetXSlider;
let resetButton;

/* SETUP */
function setup() {
    createCanvas(800,500);
    colorMode(HSL, 100);
    frameRate(30);
    textSize(32);

    grainXSlider = createSlider(0,50);
    grainXSlider.position(10, height - 30);
    
    offsetYSlider = createSlider(0,20);
    offsetYSlider.position(200, height - 30);
    
    offsetXSlider = createSlider(-15,15);
    offsetXSlider.position(400, height - 30);

    for (let i = 0; i < lines; i++) {
        points.push([]);
    }

    headX = headX * width;

    textSize(24);
    textAlign(LEFT);

    resetButton = createButton('reset');
    resetButton.position(10, 10);
    resetButton.mousePressed(resetValues);
    resetValues();
}

/* DRAW */
function draw() {
    background(90);
    push();
    translate(0, height*0.35);
    getNewPoints();

    grainX = getGrainX(grainXSlider.value());
    offsetY = -1 * offsetYSlider.value();
    offsetX = offsetXSlider.value();

    for (let line_i = lines-1; line_i >= 0; line_i--) {
        for (let i = 0; i < points[line_i].length; i++) {
            let [x1, y1, x2, y2] = getLinePoints(points[line_i], i);
            //let fillColor = color(0, 100 - (100/lines)*line_i, 100);
            let colorStart = 2;
            let colorEnd = 95;
            let fillColor = color( colorStart+( (colorEnd-colorStart) /lines)*line_i , 80, 50);
            drawShape(x1, y1, x2, y2, offsetX*line_i, offsetY*line_i, fillColor);
        }
    }

    if (points[0].length > 2*dataLength) {
        for (let line_i = 0; line_i < lines; line_i++) {
            points[line_i].pop();
        }
    }

    // render text
    pop();
    fill(20);
    text('speed', 40, height-40);
    text('y offset', 240, height-40);
    text('x offset', 440, height-40);
}

// drawLines()
function getLinePoints(points, i) {
    let x1, y1, x2, y2;

    y1 = points[i];
    x1 = headX - i * spacing;
    y2 = points[i + 1];
    x2 = headX - (i+1) * spacing;


    //y1 = points[i];
    //x1 = ( dataLength - points.length + i ) * spacing;
    //y2 = points[i + 1];
    //x2 = ( dataLength - points.length + i + 1 ) * spacing;

    return [x1, y1, x2, y2];
}

// getNewPoints()
// uses perlin noise to get an array of new points
function getNewPoints() {
    let point;
    for (let i = 0; i < lines; i++) {
        point = height / 2 * noise(ground, i / grainY);
        points[i].unshift(point);
    }
    ground += spacing / grainX;
}

// draws a vertical rectangle bounded by the line given on top
function drawShape(x1, y1, x2, y2, offX, offY, fillColor) {
    fill(fillColor);
    strokeWeight(0);
    beginShape();
    vertex(x1+offX, y1+offY);
    vertex(x2+offX, y2+offY);
    vertex(x2+offX, height+offY);
    vertex(x1+offX, height+offY);
    endShape()
}


// draws a line with x and y offset
function drawLine(x1, y1, x2, y2, offX, offY) {
    line(x1+offX, y1+offY, x2+offX, y2+offY);
}


// 
function getGrainX(v) {
    v = 50 - v;
    let n = 1.06;
    let low = 100;
    let high = 1500
    return (low + (high-low) * ( (pow(n, v)-1) / pow(n, 50) ));
}

// resets values and point array
function resetValues() {
    grainXSlider.value(24);
    offsetYSlider.value(13);
    offsetXSlider.value(8);

    for (let i = 0; i < lines; i++) {
        points[i] = [];
    }
}