function Bird() {
  this.G = 1;
  this.pos = height * 0.7;
  this.x = birdX;// + random(-10,10);
  this.vel = 0;
  this.maxVel = 18;
  this.frictCoef = this.G / this.maxVel;
  this.width = 40;
  this.color = color(random(100, 220), random(100, 220), random(100, 220), 100);
  this.score = 0;
  this.dead = false;
  this.brain = null;
  
  this.mp = 0.1;
  //this.mutationAmount = 1;


  //MAKE BIRD THINK
  this.think = function(obj) {
    var inputs = [this.pos, objective.x-this.x, objective.gapStart, objective.gapStart + objective.gapWidth];
		var output = this.brain.predict( inputs );
    //console.log(output[0]);
    if (output[0] > 0.5){
      this.jump();
    }
  }


  //UPDATE BIRD
  this.update = function() {
    this.vel -= this.G + this.frictCoef * this.vel;
    this.pos += this.vel;

    //check for bird dropping off screen
    if (this.pos - this.width <= 0) {
      if (noBottom) {
        this.dead = true;
        deadBirds++;
      } else {
        this.pos = this.width;
      }
    }
    if ( (this.pos >= height) && (!noRoof) ){
      this.pos = height;
    }
  }


  //CHECK FOR BIRD CONTACT
  this.checkCollision = function() {
    if (this.x + this.width >= objective.x) {
      var gapTop = objective.gapStart + objective.gapWidth;
      var gapBottom = objective.gapStart;
      if ((this.pos >= gapTop) || (this.pos - this.width <= gapBottom)) {
        this.dead = true;
        deadBirds++;
      }
    }
  }
  
  
  this.mutationFunction = function(val){
    //console.log(this);
    if (Math.random() < this.mutationProbability) {
      console.log("randomize");
      return 2 * Math.random() - 1;
    } else {
      console.log("no random");
      return val;
    }
  }



  //SHOW BIRD
  this.show = function() {
    fill(this.color);
    rect(this.x, height - this.pos, this.width, this.width);
  }


  //RESET BIRD
  this.reset = function() {
    this.pos = height * 0.7;
    this.objective = null;
  }


  //JUMP BIRD
  this.jump = function() {
    this.vel = this.maxVel * 0.8;
  }
}