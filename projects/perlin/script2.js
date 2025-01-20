
var points = [];
var dataLength = 100;
var spacing = 5;
var c = 0;
var grain = 40;


function setup() {
    createCanvas(700, 300);
}

function draw() {
    background(220);
    p = height * noise(c / grain);
    c++;
    points.push(p);

    for (i = points.length; i > 1; i--) {
        var y1 = points[i];
        var x1 = dataLength * spacing - (points.length - i) * spacing;
        var y2 = points[i - 1];
        var x2 = dataLength * spacing - (points.length - i + 1) * spacing;

        stroke(255, 100, 100);
        strokeWeight(2);
        line(x1, y1, x2, y2);
    }

    if (points.length > 100) {
        points.shift;
    }

}