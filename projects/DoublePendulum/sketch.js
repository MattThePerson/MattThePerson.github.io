// Double Pendulum Sketch! Based on Coding Train video by Dan Shiffman done in Processing.

const pendulum_y_disp = 200;

// simulation variables
const length1 = 200, length2 = 200; // length of pendulum

let mass1 = 20, mass2 = 15; // mass of pendulums
let angle1 = 3, angle2 = 0; // starting angle (radians)
let a1_vel = 0, a2_vel = 0; // first derivatives
let a1_acc, a2_acc; //,  second derivatives

let gravity = 0.13; // gravity

// 
let gravitySlider, mass1Slider, mass2Slider;

// 
let ball1_history = [], ball2_history = [];
const max_history = 280;


// SETUP
function setup() {
    createCanvas(700, 700);
    frameRate(120);

    gravitySlider = createSlider(0.1, 3, gravity, 0.1);
    gravitySlider.position(10, 10);
    gravitySlider.size(400);
}


// DRAW
function draw() {

    gravity = gravitySlider.value();
    
    // get angle accelerations
    [a1_acc, a2_acc] = pendulumEquations(gravity, length1, length2, mass1, mass2, angle1, angle2, a1_vel, a2_vel);

    // get pendulum angles
    [angle1, angle2, a1_vel, a2_vel] = applyAccelerations(a1_acc, a2_acc);

    // get ball positions
    let [ball1, ball2] = getBallPositions(angle1, angle2, length1, length2);
    pushToStart(ball1_history, ball1, max_history);
    pushToStart(ball2_history, ball2, max_history);
    
    // render
    background(40);
    translate(width / 2, pendulum_y_disp);
    renderPendulumContours(ball1_history, ball2_history);
    renderPendulums(ball1, ball2, mass1, mass2);
}



// render Pendulums
function renderPendulums(ball1, ball2, m1, m2) {
    strokeWeight(2);
    stroke(220);
    fill(220);
    x1 = ball1.x;
    y1 = ball1.y;
    x2 = ball2.x;
    y2 = ball2.y;

    line(0, 0, x1, y1);
    ellipse(x1, y1, m1, m1);

    line(x1, y1, x2, y2);
    ellipse(x2, y2, m2, m2);
}


// 
function renderPendulumContours(history1, history2) {
    let alpha;
    let count = history1.length;
    for (let i = 0; i < count-1; i++) {
        p1 = history2[i];
        p2 = history2[i+1];
        alpha = map(i, 0, max_history-1, 180, 0);
        stroke(50, 150, 50, alpha);
        strokeWeight(map(i, 0, max_history-1, 4, 1));
        line(p1.x, p1.y, p2.x, p2.y);
    }
    for (let i = 0; i < count-1; i++) {
        p1 = history1[i];
        p2 = history1[i+1];
        alpha = map(i, 0, max_history-1, 180, 0);
        stroke(150, 50, 50, alpha);
        line(p1.x, p1.y, p2.x, p2.y);
    }
}


// implementing complicated pendulum equations
function pendulumEquations(g, r1, r2, m1, m2, a1, a2, a1_v, a2_v) {

    // acc1
    let num1 = -g * (2 * m1 + m2) * sin(a1);
    let num2 = -m2 * g * sin(a1 - 2 * a2);
    let num3 = -2 * sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    const acc1 = (num1 + num2 + num3 * num4) / den;

    // acc2
    num1 = 2 * sin(a1 - a2);
    num2 = (a1_v * a1_v * r1 * (m1 + m2));
    num3 = g * (m1 + m2) * cos(a1);
    num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    const acc2 = (num1 * (num2 + num3 + num4)) / den;

    return [acc1, acc2];
}

function applyAccelerations(a1_acc, a2_acc) {
    a1_vel += a1_acc;
    a2_vel += a2_acc;

    angle1 += a1_vel;
    angle2 += a2_vel;
    return [angle1, angle2, a1_vel, a2_vel];
}

function getBallPositions(a1, a2, r1, r2) {
    const x1 = r1 * sin(a1);
    const y1 = r1 * cos(a1);

    const x2 = x1 + r2 * sin(a2);
    const y2 = y1 + r2 * cos(a2);

    return [createVector(x1, y1), createVector(x2, y2)]
}

/* UTILITY FUNCTIONS */

function pushToStart(arr, element, max_len=100) {
    arr.unshift(element); // Add element to the start
    if (arr.length > max_len) {
        arr.length = max_len;
    }
    return arr;
}