
//DRAW ARENA FUNCTION
function drawArena() {
    stroke(150);
    strokeWeight(1);
    fill(230);
    rect(0, 0, arenaWidth, arenaHeight);

    //draw arena border
    var B = 4; //buffer
    stroke(150);
    strokeWeight(0.1);
    fill(150);
    rect(-B, -B, arenaWidth+B, B);
    rect(arenaWidth, -B, B, arenaHeight+B);
    rect(-B, 0, B, arenaHeight+B);
    rect(0, arenaHeight, arenaWidth+B, B);

    //draw grid
    stroke(150);
    strokeWeight(1);
    if (grid) {
        for (let i = 0; i < arenaWidth/gridSize; i++) {
            line(i * gridSize, 0, i * gridSize, arenaHeight);

            if (pointsDisplay) {
                noStroke();
                fill(160);
                for (var k = 0; k < arenaHeight/gridSize; k++) {
                    text(str(i * gridSize) + ", " + str(k * gridSize), i * gridSize + 5, k * gridSize + 10);
                }
                stroke(150);
            }

        }
        for (let j = 0; j < arenaHeight/gridSize; j++) {
            line(0, j * gridSize, arenaWidth, j * gridSize);
        }
    }
}


//show controls function
function showControls(){
    var C = 35;
    if (!showingControls){
        text("'c' to show controls", 20, arenaHeight+C);
    } else {
        text("'c' to hide controls", 20, arenaHeight+C);
        text("'p' to pause simulation", 50, arenaHeight+C*2);
        text("use 1 and 2 to change simulation speed", 50, arenaHeight+C*3);
        text("hold 'm' together with 1 and 2 to change speed to max or min", 50, arenaHeight+C*4);
        text("click on bleb to select. 'u' to unselect.", 50, arenaHeight+C*5);
        text("'t' to toggle Selected Bleb tracking", 50, arenaHeight+C*6);
        text("'s' to toggle showing Selected Bleb stats", 50, arenaHeight+C*7);
        text("'g' to toggle grid", 50, arenaHeight+C*8);
    }
}


//takes number of frame updates
function getFormattedTime(t){
    var seconds = round(t/FPS);
    var minutes = floor(seconds/60);
    seconds = seconds - minutes*60;

    var hours = floor(minutes/60);
    minutes = minutes - hours*60;

    var days = floor(hours/24);
    hours = hours - days*24;

    if (days > 0){
        return (days+"d "+hours+"h "+minutes+"m "+seconds+"s");
    } else if (hours > 0){
        return (hours+"h "+minutes+"m "+seconds+"s");
    } else if (minutes > 0){
        return (minutes+"m "+seconds+"s");
    } else {
        return ( seconds+"s");
    }
}