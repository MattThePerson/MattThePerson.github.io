
//KEYTYPED FUNCTION
function keyTyped() {

    if (key == "p") { //pause
        if (currentLoop == arenaLoop){
            if (paused) {
                paused = false;
            } else {
                paused = true;
            }
        }

    } else if (key == "c"){
        if (showingControls){
            showingControls = false;
        } else {
            showingControls = true;
        }

    } else if (key == "r") { //reset window to fit arena
        Scale = defScale;
        cornerX = defCornerX;
        cornerY = defCornerY;

    } else if (key == "g") { //show and hide grid
        if (grid) {
            grid = false;
        } else {
            grid = true;
        }

    } else if (key == "s"){ //stats on
        if (showBlebStats){
            showBlebStats = false;
            console.log("showing stats on");
        } else {
            showBlebStats = true;
            console.log("showing stats off");
        }

    } else if (key == "t"){ //turn bleb tracking on or off
        if (trackBleb){
            trackBleb = false;
        } else {
            trackBleb = true;
        }

    } else if (key == "u"){ //unselect bleb
        selectedBleb = null;
    
    } else if (key == "2"){
        if (keyIsDown(77)){ //max out speed
            speed = maxSpeed;
        } else {
            speed = speed*2;
            if (speed > maxSpeed){
                speed = maxSpeed;
            }
        }
    } else if (key == "1"){
        if (keyIsDown(77)){ //minimize speed
            speed = 1;
        } else {
            speed = speed*0.5;
            if (speed < 1){
                speed = 1;
            }
        }
    }
}



//mouse clicked function
function mouseClicked() {
    if (currentLoop == arenaLoop){
        if ((millis() - millisHolder) < 200) {
            arenaX = cornerX + mouseX / Scale;
            arenaY = cornerY + mouseY / Scale;
            
            // if cursor in arena
            if ( (arenaX > 0) && (arenaX < arenaWidth) && (arenaY > 0) && (arenaY < arenaHeight) ){
                var noBlebFound = true;
                for (let bleb of blebs) {
                    if (dist(arenaX, arenaY, bleb.pos.x, bleb.pos.y) < bleb.r) {
                        if (selectedBleb == bleb){
                            selectedBleb = null;
                        } else {
                            selectedBleb = bleb;
                            noBlebFound = false;
                        }
                        break;
                    }
                }
            } else {
                selectedBleb = null;
            }
        }

    }
}