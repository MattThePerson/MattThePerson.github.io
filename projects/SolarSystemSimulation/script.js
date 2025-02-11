var G = 0.01;

var sun;
var rocks = [];

var boundary = false;
var boundaryWidth = 2000;

var elastic = false;
var rockGravityEnabled = true;
var stickVelLimit; //rocks must be going slow enough to stick together

var totalKE;
var totalPE;
var totalEnergy;

var paused = false;

//game window variables
var Scale = 1;
var dispX = 0;
var dispY = 0;
var arenaX;
var arenaY;
var holdX;
var holdY;
var dragging = false;

var sunColor = 255;

var holdTime;
var countAmount = 30;
var countdown = countAmount;


//SETUP FUNCTION
function setup(){
    createCanvas(850,850);
    frameRate(120);

    dispX = width/2;
    dispY = height/2;

    sun = new Sun(0, 0, 1000, 40);

    var spawnRadius = boundaryWidth;
    var rockAmount = 400;
    for (let i = 0; i < rockAmount; i++){
        let ang = random(TWO_PI);
        let pos = p5.Vector.fromAngle(ang, random(spawnRadius));
        let vel = getOrbitalVelocity(sun, pos);
        vel.mult(1.8);
        //let vel = createVector(random(-1,1), random(-1,1));
        let mass = random(5, 50);
        rocks.push(new Rock(pos, vel, mass, 5));
    }
}

//DRAW FUNCTION
function draw(){
    background(30);
    push();

    scale(Scale);
    translate(dispX, dispY);

    arenaX = mouseX / Scale - dispX;
    arenaY = mouseY / Scale - dispY;

    if (dragging){
        dispX = mouseX / Scale - holdX;
        dispY = mouseY / Scale - holdY;
    }

    //updating
    if (!paused){
        totalKE = 0;
        totalPE = 0;
        holdTime = millis();

        for (let r of rocks){
            r.update();
        }
        //remove gone rocks
        for (let i = rocks.length-1; i >= 0; i--){
            if (rocks[i].gone){
                rocks.splice(i,1);
            }
        }
        if (sun){
            sun.update();
        }

        //get total energy
        for (let rock of rocks){
            totalKE += rock.getKineticEnergy();
            totalPE += rock.getPotentialEnergy(sun);
        }


        countdown--;
        if (countdown == 0){
            let t = millis() - holdTime;
            console.log("update time: "+t);
            countdown = countAmount;
        }
    }

    //showing
    for (let r of rocks){
        r.show();
    }
    if (sun){
        sun.show();
    }

    //show boundary
    if (boundary){
        strokeWeight(1);
        stroke(255);
        let p = boundaryWidth;
        line(-p, -p, p, -p);
        line(-p, -p, -p, p);
        line(-p, p, p, p);
        line(p, -p, p, p);
    }


    pop();
    textSize(17);
    fill(255);
    stroke(255);
    noStroke();
    text("rocks: "+rocks.length, 20, 30);
    //text("totalKE: "+round(totalKE), 20, 60);
    //text("totalPE: "+round(totalPE), 20, 90);
    //text("totalEnergy: "+round(totalKE+totalPE), 20, 120);
}




//KEY TYPED FUNCTION
function keyTyped(){
    if (key == "p"){
        if (paused){
            paused = false;
        } else {
            paused = true;
        }
    }
}




//GET DISTANCE FUNCTION
function getDistance(a,b){
    return dist(a.pos.x, a.pos.y, b.pos.x, b.pos.y);
}