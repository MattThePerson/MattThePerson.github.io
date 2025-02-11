class Bleb{
    constructor(pos, gen, col, linCol){
        this.pos = pos;
        if (gen == undefined){
            gen = 1;
        }
        this.gen = gen;

        if (col == undefined){
            col = color(random(50, 180), random(50, 180), random(50, 220), 180);
            linCol = color(random(50, 180), random(50, 180), random(50, 220), 220);
        }
        this.color = col;
        this.liningColor = linCol;
        
        this.mana = blebStartingMana;
        this.r = 12;
        this.dead = false;

        this.ang = random(TWO_PI);
        this.vel;

        //NETURAL NETWORK STUFF
        //neural network controlled variables
        this.angChange = 0; //between -1 and 1
        this.speed = 0;

        //making sensor vectors
        this.sensorVectors = [];
        var sensorLen = 80;
        var sensorAng;
        var sensorVect;
        for (let i = 0; i < 5; i++){
            sensorAng = -HALF_PI + PI*i/4;
            sensorVect = p5.Vector.fromAngle(sensorAng, sensorLen);
            this.sensorVectors.push(sensorVect);
        }

        //sensors
        this.sensorVertices = [];
        this.sensorInputs = [];
    }

    //UPDATE METHOD
    update(thisIndex){
        
        //this.vel = p5.Vector.fromAngle(this.ang, this.speed);
        var velAdder = createVector(random(-0.1,0.1),random(-0.1,0.1));
        this.vel = p5.Vector.add(velAdder, this.vel);
        this.pos = p5.Vector.add(this.vel, this.pos);

        this.ang = this.vel.heading();



        //check for bleb collision
        for (let i = thisIndex+1; i < blebs.length; i++){
            var bleb = blebs[i];
            if (!bleb.dead){
                if ( abs(bleb.pos.x-this.pos.x) < (this.r+bleb.r) ){
                    if ( abs(bleb.pos.y-this.pos.y) < (this.r+bleb.r) ){
                        //pythagoras
                        let d = dist(this.pos.x, this.pos.y, bleb.pos.x, bleb.pos.y);
                        if (d < (this.r+bleb.r) ){
                            this.collide(bleb);
                        }
                    }
                }
            }
        }

        //check for food collision
        //all corners must be in bleb to be eaten. Initially check only one corner
        for (let item of food){
            if (!item.eaten){
                if ( abs(item.pos.x-this.pos.x) < (this.r+item.sideLn) ){
                    if ( abs(item.pos.y-this.pos.y) < (this.r+item.sideLn) ){
                        let d = dist(this.pos.x, this.pos.y, item.pos.x, item.pos.y);
                        if ( d < this.r ){
                            this.checkFoodOverlap(item);
                        }
                    }
                }
            }
        }

        this.checkForWallCollision();

        //mana depletion
        if (manaDepletionEnabled){
            this.mana--;
            this.mana -= 0.5*this.vel.mag();
            if (this.mana <= 0){
                this.mana = 0;
                //this.dead = true;
            }
        }
    }


    //SHOW METHOD
    show(){
        var liningTh = 2;
        noStroke();
        if (!this.dead){
            fill(this.color);
        } else {
            fill(100,60);
        }
        ellipse(this.pos.x, this.pos.y, 2*this.r-liningTh*2 + 0.2);

        //show lining
        strokeWeight(liningTh);
        if (!this.dead){
            stroke(this.liningColor);
        } else {
            stroke(100, 100);
        }
        noFill();
        ellipse(this.pos.x, this.pos.y,  2*this.r-liningTh)

        var pointerVect = p5.Vector.fromAngle(this.ang, this.r);
        line(this.pos.x, this.pos.y, this.pos.x+pointerVect.x, this.pos.y+pointerVect.y);

        //show sensors
        if (showBlebSensors && (selectedBleb == this)){
            stroke(100);
            strokeWeight(1);
            var head = p5.Vector.add(this.pos, p5.Vector.fromAngle(this.ang, this.r));
            var end, vHold;
            for (let sv of this.sensorVectors){
                vHold = createVector(sv.x, sv.y);
                vHold.rotate(this.ang);
                end = p5.Vector.add(head, vHold);
                line(head.x, head.y, end.x, end.y);
            }
        }
    }


    //COLLIDE METHOD - for colliding with other blebs
    collide(other){
        var distVect = p5.Vector.sub(other.pos, this.pos);
        var overlap = (this.r + other.r) - distVect.mag();
        distVect.normalize().mult(overlap/2);
        other.pos = p5.Vector.add(other.pos, distVect);
        distVect.rotate(PI);
        this.pos = p5.Vector.add(this.pos, distVect);
    }



    //CHECK FOR WALL COLLISION METHOD
    checkForWallCollision(){
        if (this.pos.x < this.r) {
            this.pos.x = this.r;
            this.vel.x = 0;
        } else if (this.pos.x > arenaWidth - this.r) {
            this.pos.x = arenaWidth - this.r;
            this.vel.x = 0;
        }
        if (this.pos.y < this.r) {
            this.pos.y = this.r;
            this.vel.y = 0;
        } else if (this.pos.y > arenaHeight - this.r) {
            this.pos.y = arenaHeight - this.r;
            this.vel.y = 0;
        }
    }

    //CHECK FOOD OVERLAP METHOD
    checkFoodOverlap(item){
        var allIn = true;
        for (let c of item.corners){
            let d = dist(this.pos.x, this.pos.y, c.x, c.y);
            if (d > this.r){
                allIn = false;
                break;
            }
        }
        if (allIn){
            this.mana += item.mana;
            item.eaten = true;
        }
    }

    //SHOW STATS METHOD
    showStats(){
        //draw box
        fill(120,140);
        strokeWeight(1);
        stroke(120,200);
        var x = this.pos.x + 2*this.r;
        var y = this.pos.y - this.r;
        rect(x, y, 150, 100);

        var barTh = 6;
        var fact = 40/blebStartingMana;
        line(x+70, y+3, x+70, y+6+barTh);

        //text
        stroke(80);
        strokeWeight(0.5);
        fill(80);
        textSize(6);
        text("mana", x+5, y+5+barTh/2);
        text("rate", x+5, y+15+barTh/2);
        text("GEN: "+this.gen, x+10, y-5);

        //stats
        noStroke();
        fill( 183, 29, 80 , 220);
        rect(x+30, y+5, this.mana*fact, barTh);
    }
}




