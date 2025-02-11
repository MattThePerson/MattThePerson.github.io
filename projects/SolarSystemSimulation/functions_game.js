
// zooming in and out
function mouseWheel(event) {
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
    //limit Scale size
    if (Scale < 0.02) {
        Scale = 0.02;
        scaleFactor = 1;
        //console.log("enough");
    }

    if (Scale != scaleHold) {
        alterDisp(scaleFactor);
    }
}


//function for moving canvas corner to ensure proper zoom 
//towards mouse location
function alterDisp(m) {
    var canvasX = mouseX;//-width/2/Scale;
    var canvasY = mouseY;//-height/2/Scale;

    dispX = dispX + (1 - m) * canvasX / Scale;
    dispY = dispY + (1 - m) * canvasY / Scale;
}



function mousePressed(){
    holdX = mouseX / Scale - dispX;
    holdY = mouseY / Scale - dispY;
    dragging = true;
}

function mouseReleased(){
    dragging = false;
}