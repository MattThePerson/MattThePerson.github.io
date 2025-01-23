
let springConst = 0.005;
let dampeningConst = 0.2;
const dampeningConstMax = 0.01;

let points = [];
let pointAmount = 80;

let x1;
let y1;
let x2;
let y2;

let lineColor;

let springConstSlider;
let dampeningConstSlider;

const updatesPerFrame = 20;

// setup function
function setup() {
    createCanvas(1000, 600);
    frameRate(60);

    lineColor = color(200, 100, 100);

    //define string start and end points
    x1 = 50;
    y1 = height / 2;
    x2 = width - x1;
    y2 = y1;

    //create points
    let stringWidth = width - 2 * x1;

    for (let i = 0; i < pointAmount; i++) {
        let x = x1 + i * stringWidth / (pointAmount - 1);
        let y = y1;

        let newPoint = new Point(x, y);
        points.push(newPoint);

        if (i > 0) {
            newPoint.leftPoint = points[i - 1];
            points[i - 1].rightPoint = newPoint;
        }

        if ((i == 0) || (i == pointAmount - 1)) {
            newPoint.endPoint = true;
        }
    }

    springConstSlider = createSlider(0.0001, 0.4, springConst, 0.0001);
    springConstSlider.position(10, 10);
    springConstSlider.size(200);

    dampeningConstSlider = createSlider(0, 1, dampeningConst, 0.01);
    dampeningConstSlider.position(10, 30);
    dampeningConstSlider.size(200);

}

// draw function
function draw() {
    background(220);
    springConst  = springConstSlider.value();
    dampeningConst = 1 - dampeningConstSlider.value()*dampeningConstMax;

    for (let i = 0; i < updatesPerFrame; i++) {

        // update forces on points
        for (let point of points) {
            point.calculateForces();
        }

        // update points position
        for (let point of points) {
            point.update();
        }
    }

    // draw points
    for (let point of points) {
        point.draw();
    }
}


function mousePressed() {
    for (let point of points) {
        if (dist(point.pos.x, point.pos.y, mouseX, mouseY) < 40) {
            if (true) {
                point.held = true;
                break;
            }
        }
    }
}

function mouseReleased() {
    for (let p of points) {
        if (p.held) {
            p.held = false;
        }
    }
}







