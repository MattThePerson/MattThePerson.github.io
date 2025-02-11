//README:
//hopefully this file will be one that can be easily applied to any game. 

//VARIABLES:

var Scale = 1;

// the x,y values of the top right corner of the
// canvas on the arena
var cornerX;
var cornerY;

// coordinates on the canvas
var canvasX;
var canvasY;

var arenaX = 0; //arena coordinates of the cursor
var arenaY = 0;

var pointsDisplay = false; //dislay coordinates
var grid = true; // display grid

var grabX; //mouseX position when grabbing screen
var grabY;
var mouseHolding = false;

var millisHolder;

////////////////////////
//FUNCTIONS:

//mouseDragged function
function mouseDragged() {
    if (mouseHolding && (millis() - millisHolder > 120)) {
        cornerX = grabX - mouseX / Scale;
        cornerY = grabY - mouseY / Scale;
    }
}

//For dragging the arena. Use mouseClicked() in sketch.js
//for interacting with your game. To that function add:
//  if ((millis() - millisHolder) < 200) {
//    arenaX = cornerX + mouseX / Scale;
//    arenaY = cornerY + mouseY / Scale;
function mousePressed() {
    if (currentLoop == arenaLoop){
        if ((mouseX < width) && (mouseX > 0) && (mouseY < height) && (mouseY > 0)) {
            grabX = cornerX + mouseX / Scale;
            grabY = cornerY + mouseY / Scale;
            mouseHolding = true;
            millisHolder = millis();
        }
    } else {
        for (let button of menuButtons.buttons){
            button.checkForClick(mouseX, mouseY);
        }
        for (let slider of sliders){
            slider.checkForClick(mouseX, mouseY);
        }
    }
}


function mouseReleased() {
    if (currentLoop == arenaLoop){
        mouseHolding = false;

        canvasX = mouseX;
        canvasY = mouseY;

        arenaX = cornerX + canvasX / Scale;
        arenaY = cornerY + canvasY / Scale;
    } else {
        for (let button of menuButtons.buttons){
            button.checkForRelease(mouseX, mouseY);
        }
        for (let slider of sliders){
            slider.held = false;
        }
    }
}


// zooming in and out
function mouseWheel(event) {
    if (currentLoop == arenaLoop){
        var scaleAmount = 0.1;
        var scaleFactor;
        var scaleHold = Scale;

        //determine scaleFactor
        if (event.delta > 0) { //zoom out
            scaleFactor = (1 - scaleAmount);
        } else { //zoom in
            scaleFactor = 1 / (1 - scaleAmount);
        }

        Scale = Scale * scaleFactor;
        //round scale
        Scale = Math.round(Scale * 100) / 100;
        //reset to 1 if near
        if (abs(Scale - 1) < 0.05) {
            Scale = 1;
        }
        //limit scale size
        if (Scale < 0.5) {
            Scale = 0.5;
        }
        //console.log(Scale);

        if (Scale != scaleHold) {
            alterCorner(scaleFactor);
        }
    }
}


//function for moving canvas corner to ensure proper zoom 
//towards mouse location
function alterCorner(m) {
    canvasX = mouseX;
    canvasY = mouseY;

    cornerX = cornerX - (1 - m) * canvasX / Scale;
    cornerY = cornerY - (1 - m) * canvasY / Scale;
}


