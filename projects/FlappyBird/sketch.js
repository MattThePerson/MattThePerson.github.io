// unshift/push: add an element to the beginning/end of an array
// shift/pop: remove and return the first/last element of an array

var paused = false;
var generation = 1;
var noBottom = false;
var noRoof = false;
var birdX;
var gameSpeed = 1;

var pillarSpeed = 4.8;
var pillarSeparation = 300;
var ether = pillarSeparation;
var boundary = 10000;

var root;
var objective;

var birds = [];
var deadBirds = 0;
var generationSize = 100;
var highscore = 0;
var score = 0;

let mp;
let ma;


//visuals variables
var visuals = false;
var elite = [];
var eliteScores = [];

var inspectIndex = 0;
var iX = 400;
var iBrain;
var iScore;
var iGapStart = 340;
var iGapWidth = 120;
var iInputs = [];
var iOutput = [];

var toggleResetSpeedButton;
var resetSpeedOnGenReset = false;


//SETUP FUNCTION
function setup() {
  createCanvas(600, 800);
  textSize(18);
  frameRate(30);
  gameSpeed = createSlider(1, 100, 1);
  gameSpeed.position(370, 10);
  gameSpeed.style('width', '200px');
  birdX = width * 0.2;
  
  toggleResetSpeedButton = createButton('Toggle speed reset');
  toggleResetSpeedButton.position(200, 10);
  toggleResetSpeedButton.mousePressed(() => {
    resetSpeedOnGenReset = !resetSpeedOnGenReset;
    console.log("Toggled reset speed of last death to: ", resetSpeedOnGenReset);
  });


  root = new Pillar();
  objective = root;

  birds = createNewBirds(generationSize);

  //add random nn to elite list
  elite.push(new NeuralNetwork(4, 4, 1));
	eliteScores.push(0);
  
  iBrain = elite[inspectIndex];
  iScore = eliteScores[inspectIndex];

}




//DRAW FUNCTION
function draw() {
	

  // all the updating (game logic) excluding drawing
  for (var n = 0; n < gameSpeed.value(); n++) {
    if (!paused) {
      ether -= pillarSpeed;
      if (ether <= 0) {
        ether = pillarSeparation;
        root.newPillar();
      }

      root.update();
      //remove root pillar if off screen
      if (root.x + root.width < 0) {
        rootHold = root;
        root = root.next;
        rootHold = null; //hopefully allows object to be removed from memory
      }

      //check for new objective
      if (objective.x + objective.width < birdX) {
        objective = objective.next;
        score++;
        if (score > highscore) {
          highscore++;
        }
        for (let bird of birds) {
          if (!bird.dead) {
            bird.score++;
          }
        }
      }

      // update birds
      for (let bird of birds) {
        if (!bird.dead) {
          bird.update();
          bird.checkCollision();
          bird.think();
        }
      }

      //check if next generation must be created
      if ((deadBirds == generationSize) || (score == boundary)) {
        nextGeneration(birds);
        if (resetSpeedOnGenReset) {
          gameSpeed.value(1);
        }
      }
    }
  }

  // all the drawing stuff
  background(220);
  fill(20);
  noStroke();


  if (visuals) { // display visual for neural network

    rect(iX, 0, 70, height);
    fill(220);
    rect(iX, height - iGapStart - iGapWidth, 70, iGapWidth);

    strokeWeight(1);
    //cycle through each pixel
    for (let x = iX - 40; x >= iX - 230; x--) {
      for (let y = 0; y < height; y++) {
        iInputs = [y, x, iGapStart, iGapStart + iGapWidth];
        iOutput = iBrain.predict( iInputs );

        stroke(255*iOutput[0]);
        if (iOutput[0] > 0.5){
          stroke(220, 100, 100);
        } 
        point(x, y);
      }
    }
    
		
    for (let x = iX - 40; x < iX + 70; x++) {
      for (let y = height - iGapStart - iGapWidth; y < height - iGapStart - 40; y++) {
        iInputs = [y, x, iGapStart, iGapStart + iGapWidth];
        iOutput = iBrain.predict( iInputs );
				
        stroke(255*iOutput[0]);
        if (iOutput[0] > 0.5){
          stroke(220, 100, 100);
        } 
        point(x, y);
      }
    }




    fill(0, 0, 225);
    text("score: " + str(iScore), 10, 20);
    text("item: " + str(inspectIndex), 10, 40);

  } else { //normal show loop

    root.show();

    //show birds
    for (let bird of birds) {
      if (!bird.dead) {
        bird.show();
      }
    }


    //draw boundary
    fill(220, 100, 100, 150);
    if (score == boundary - 2) {
      rect(objective.x + objective.width + pillarSeparation, 0, objective.x + width, height);
    } else if (score == boundary - 1) {
      rect(objective.x + objective.width, 0, objective.x + width, height);
    }

    fill(0, 0, 225);
    text("generation: " + str(generation), 10, 20);
    text("score: " + str(score), 10, 40);
    text("highscore: " + str(highscore), 10, 60);
    text("birds left: " + str(generationSize - deadBirds) + " / " + str(generationSize), 10, 80);
    text("game speed: " + str(gameSpeed.value()), 10, 100);

    if (paused) {
      text("PAUSED", width * 0.8, 20);
    }
  }
}


function changeInspectionBird() {
  inspectIndex++;
  if (inspectIndex == elite.length) {
    inspectIndex = 0;
  }
  iBrain = elite[inspectIndex];
  iScore = eliteScores[inspectIndex];

}