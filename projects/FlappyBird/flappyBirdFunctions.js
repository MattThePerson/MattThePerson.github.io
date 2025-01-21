
// mutate birds after each round
function mutateBirds(oldBirds) {
  var newBirds = [];

  //calculate total score
  var totalScore = 0;
  for (let bird of oldBirds) {
    totalScore += bird.score;
  }

  for (var n = 0; n < generationSize; n++) {

    var newBird = new Bird();
    var idealBird = selectBird(oldBirds, totalScore);

    //produce a brain for the new bird
    var newBrain = idealBird.brain.copy();
    mp = idealBird.mp;
    newBrain.mutate(mutationFunction);
    newBird.brain = newBrain;
    //newBird.mp = metaMutate( idealBird.mp );

    newBird.color = mutateColor(idealBird);
    newBirds.push(newBird);
  }

  return newBirds;
}



// function for selecting bird randomly by fitness
function selectBird(birdList, total) {
  var bird = null;
  var cumTotal = 0;
  var lower;
  var selector = random(total);
  var n = 0;

  if (total == 0) {
    return random(birdList);
  } else {
    while (bird == null) {
      lower = cumTotal;
      cumTotal += birdList[n].score;

      if ((lower <= selector) && (selector <= cumTotal)) {
        bird = birdList[n];
      }
      n++;
    }
    return bird;
  }
}


// mutation function to be applied to weights of N
function mutationFunction(val) {
  var MP = 0.05;
  if (Math.random() < MP) {
    return 2 * Math.random() - 1;
  } else {
    return val;
  }
}


//functino for mutating the mutation probability
function metaMutate(val) {
  val += 0.01 * random(1);
  if (val > 1) {
    val = 1;
  } else if (val < 0) {
    val = 0;
  }
  return val;
}


//mutate color function
function mutateColor(idealBird) {
  var R = red(idealBird.color) + random(-10, 10);
  var G = green(idealBird.color) + random(-10, 10);
  var B = blue(idealBird.color) + random(-10, 10);

  if (R > 220) {
    R = 220;
  } else if (R < 20) {
    R = 20;
  }

  if (G > 220) {
    G = 220;
  } else if (G < 20) {
    G = 20;
  }

  if (B > 220) {
    B = 220;
  } else if (B < 20) {
    B = 20;
  }

  return color(R, G, B);
}



function keyTyped() {
  if (key == "p") {
    if (paused) {
      paused = false;
    } else {
      paused = true;
    }
  } else if (key == "r") {
    resetGame();
  } else if (key == "v") {
    if (visuals) {
      visuals = false;
    } else {
      visuals = true;
      paused = true;
    }
  } else if (key == "n"){
    changeInspectionBird();
  }
}

function createNewBirds(x) {
  var newBirds = [];
  for (var i = 0; i < generationSize; i++) {
    var bird = new Bird;
    bird.brain = new NeuralNetwork(4, 4, 1);
    newBirds.push(bird);
  }

  return newBirds;
}


function resetGame() {
  paused = true;
  deadBirds = 0;
  generation = 1;
  score = 0;
  highscore = 0;
  ether = pillarSeparation;
  root.removePillars();
  root = new Pillar();
  objective = root;
  birds = createNewBirds(generationSize);

}

function nextGeneration() {
  inspectEliteBirds();
  //paused = true;
  generation++;
  ether = pillarSeparation;
  root.removePillars();
  root = new Pillar();
  objective = root;
  deadBirds = 0;
  score = 0;
  birds = mutateBirds(birds);
  //birds[0].brain.weights_ho.print();
  //console.log( birds[0].mp );
}

function inspectEliteBirds(){
  for (let bird of birds){
    if (bird.score > 100){
      elite.push(bird.brain);
      eliteScores.push(bird.score);
    }
  }
}




