var player;
var bullet;
var bulletSpeed = 4;
var ang;
var running = true;
var pauseTime;
var G = 0.1;
var finalxI, finalyI;

var realTimeB = 0;
var realTimeP = 0;
var timingB = true;
var timingP = true;

function setup() {
  createCanvas(500, 500);
  frameRate(60);
  
  player = new Thing(200,200);
  
  bullet = new Thing(450, 50);
  bullet.color = color(50,200,50);
  
  setValues();
}

function draw() {
  background(220);
  
  if (running){
    player.update();
    bullet.update();
    
    if (dist(player.pos.x, player.pos.y, bullet.pos.x, bullet.pos.y) < 2*player.r){
      console.log("HIT");
      running = false;
      pauseTime = millis();
    }
  } else if ( (millis() - pauseTime) > 1000){
    setValues();
    running = true;
  }
  
  player.show();
  bullet.show();
  
  fill(200,100,200);
  //ellipse(xI, height-yI, 5);
  
  
}


function Thing(x,y){
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.color = color(200,100,100);
  this.r = 3.5;
  
  
  this.update = function(){
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    
    if (this.pos.x > width){
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x < 0){
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    }
    if (this.pos.y > height){
      this.pos.y = height;
      this.vel.y = - this.vel.y;
    } else if  (this.pos.y < 0){
      this.pos.y = 0;
      this.vel.y = - this.vel.y;
    }
  }
  
  this.show = function(){
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, height-this.pos.y, 2*this.r);
    
    if (this.acc.x != 0){
      strokeWeight(1);
      stroke(40);
      var mult = 350;
      
      line(this.pos.x, this.pos.y, this.pos.x+mult*this.acc.x, this.pos.y+mult*this.acc.y);
    } 
  }
}



function setValues(){
  player.pos.x = 0;
  player.pos.y = 0;
  player.vel.x = random(10,40)/10;
  player.vel.y = random(50,100)/10;
  player.acc.x = 0;
  player.acc.y = -G;
  
  bullet.pos.x = random(100,300);
  bullet.pos.y = 0;
  
  let bSpeed = random(20,100)/10;
  
  var ang = predictQuadratic(player.pos, player.vel, player.acc, bullet.pos, bSpeed);
  bullet.vel = p5.Vector.fromAngle(ang, bSpeed);
  
}