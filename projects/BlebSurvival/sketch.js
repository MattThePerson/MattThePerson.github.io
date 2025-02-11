// BLEB SURVIVAL

//arena variables
var gridSize = 50;
var arenaWidth = gridSize*16;
var arenaHeight = gridSize*16;

var paused = false;
var speed = 1;
var maxSpeed = 2**10;
var FPS = 25;
var timer = 0;
var currentLoop;
var showingControls = false;

var defScale = 0.9;
var defCornerX = -35;
var defCornerY = -35;

//bled variables
var blebs = [];
var selectedBleb;
var trackBleb = false;
var blebStartingMana = 1000;
var showBlebStats = true;
var showBlebSensors = false;
var manaDepletionEnabled = true;
var blebsAlive;
var totalBlebMana;

//food variables
var food = [];
var foodSideLen = 8;
var foodManaAmount = 500;

var totalFoodMana;
var foodManaLimit = 200000;
var zeroFoodProb = (1/FPS); /*prob of making food when no food*/

//menu variables
var pageHeader;
var genSlider;
var sliders = [];

//overall variables
var currentGen = 1;
var training = false; //whether simulation is testing gen or field testing
var trainingUpdates = FPS*40;
var trainingComplete = false;
var bufferTimer = FPS*2; //time for menu to appear after training complete

//SETUP FUNCTION
function setup() {
    createCanvas(1050, 800);
    frameRate(FPS);

    textAlign(LEFT, CENTER);

    //center window on arena
    Scale = defScale;
    cornerX = defCornerX;
    cornerY = defCornerY;
    
    //create blebs
    var blebAmount = 20;
    for (let i = 0; i < blebAmount; i++) {
        let pos = createVector(random(arenaWidth), random(arenaHeight))
        blebs.push(new Bleb(pos));
    }

    //create food
    var initialFoodAmount = int(random(5,15));
    for (let i = 0; i < 0; i++){
        food.push(new Food());
    }

    loadButtons();
    currentLoop = menuLoop;
    //constructor( pos, limits, len, startValue, increments, orientation )
    genSlider = new Slider([400, 500], [1, 10], 500, 1, 1);
    sliders.push(genSlider);


    //TESTING ROUNDING TO NEAREST INCREMENT
    //var inc = 0.2;
    //var value = 3.49;
    //var roundedValue = value - (value%inc);
    //console.log(roundedValue);
}


//DRAW FUNCTION
function draw() {
    currentLoop();
}


//MENU LOOP
function menuLoop(){
    background(255);

    //title
    fill(230);
    stroke(50);
    strokeWeight(7);
    textSize(70);
    textAlign(LEFT, BOTTOM);
    var y = 70;
    var tx = "BLEB";
    var x1 = 20;
    text(tx, x1, y+10);

    var x = textWidth(tx);
    textSize(28);
    fill(50);
    strokeWeight(1.5);
    tx = "survival";
    textAlign(LEFT, BOTTOM);
    text(tx, x1 + x + 5, y);
    textAlign(LEFT, CENTER);


    // line separating buttons from data
    stroke(170);
    strokeWeight(2);
    line(300, 100, 300, height-100);

    menuButtons.update(mouseX, mouseY);
    menuButtons.draw();

    //generation data
    genSlider.update(mouseX, mouseY);
    genSlider.show();

    //draw page outline
    noFill()
    stroke(50);
    strokeWeight(4);
    rect(0, 0, width, height);
}

