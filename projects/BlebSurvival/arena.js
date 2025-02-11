//ARENA LOOP FUNCTION
function arenaLoop(){
    background(200);

    push();
    scale(Scale);

    if (selectedBleb && trackBleb){
        cornerX = selectedBleb.pos.x - width/2/Scale;
        cornerY = selectedBleb.pos.y - height/2/Scale;
    }
    translate(-cornerX, -cornerY);

    //update
    if ( (!paused) && (!trainingComplete) ){
        for (let i = 0; i < speed; i++){

            //update food and mana
            totalFoodMana = food.length*foodManaAmount;
            var P = zeroFoodProb - (zeroFoodProb/foodManaLimit)*totalFoodMana;
            var C = random(100);
            if (C < P*100){
                food.push(new Food());
            }

            //update blebs
            blebsAlive = 0;
            totalBlebMana = 0;
            for (let i = 0; i < blebs.length; i++){
                if (!blebs[i].dead){
                    blebs[i].update(i);
                    blebsAlive++;
                    totalBlebMana += blebs[i].mana;
                }
            }

            //remove food
            if (food.length > 0){
                for (let i = food.length-1; i >= 0; i--){
                    if (food[i].eaten){
                        food.splice(i,1);
                    }
                }
            }
            timer++;
            if (timer >= trainingUpdates){
                trainingComplete = true;
            }
        }
    }

    //training complete buffer
    if (trainingComplete){
        bufferTimer--;
        if (bufferTimer == 0){
            loadMenu();
        }
    }

    //SHOW STUFFS
    drawArena();

    //show food
    for (let item of food){
        item.show();
    }
    
    //show blebs
    for (let bleb of blebs) {
        bleb.show();
    }

    //show selected bleb halo and stats
    if (selectedBleb){
        noFill();
        strokeWeight(3);
        stroke(200,50,50,100);
        ellipse(selectedBleb.pos.x, selectedBleb.pos.y, 3*selectedBleb.r);

        if (showBlebStats){
            selectedBleb.showStats();
        }
    }

    //arena text
    fill(150);
    stroke(150);
    textSize(24);
    strokeWeight(1);
    var C = 35;
    text("timer: "+getFormattedTime(timer),  (arenaWidth + 20), C);
    text("updates: "+timer,  (arenaWidth + 20), C*2);
    text("simulation speed: "+speed,  (arenaWidth + 20), C*3);
    text("Blebs left alive: " + blebsAlive, (arenaWidth + 20), C*4);
    text("total Bleb mana: " + round(totalBlebMana), (arenaWidth + 20), C*5);
    text("amount of Food: " + food.length, (arenaWidth + 20), C*6);
    text("totalFoodMana: " + totalFoodMana, (arenaWidth + 20), C*7);

    text("generation: " + currentGen, 20, -17);

    showControls();

    //arena text
    strokeWeight(4);
    textSize(90);
    let txt = "ARENA";
    text(txt, 50, -80);

    //non moving text
    pop();

}


