
//button groups
var menuButtons;
var homePageButtons;
var paramatersPageButtons;
var loadPageButtons;

var futureUseButtons;

//home page buttons
var newGenButton;
var loadLinButton;
var setParamatersButton;
var nextGenButton;
var fieldTestButton;
var fieldOptionsButton;
var addPredatorsButton;

var backButton;
var startButton;

//future use
var aboutButton;
var mainMenuButton;
var continueButton;
var yesButton;
var noButton;




//loadButtons function
function loadButtons(){

    menuButtons = new buttonGroup();

    homePageButtons = new buttonGroup();
    menuButtons.add(homePageButtons)

    loadPageButtons = new buttonGroup();
    menuButtons.add(loadPageButtons);
    loadPageButtons.hide();

    futureUseButtons = new buttonGroup();
    futureUseButtons.hide();


    // HOME PAGE BUTTONS ///////
    var TS = 18;
    textSize(TS);
    var tx;

    var buttX = 30;
    var buttY = 70;
    var buttW = 250;
    var buttH = 38;
    C = buttH*1.3;

    //CREATE NEW GENERATION
    tx = "create new generation";
    newGenButton = new Button(buttX, buttY+C*1, buttW, buttH, tx, TS);
    homePageButtons.add(newGenButton);
    newGenButton.click = function(){
        
    }


    //LOAD SAVED LINEAGE
    tx = "load saved lineage";
    loadLinButton = new Button(buttX, buttY+C*2, buttW, buttH, tx, TS);
    homePageButtons.add(loadLinButton);
    loadLinButton.deactivate();
    loadLinButton.click = function(){
        
    }

    //SET PARAMATERS BUTTON
    tx = "set evolution paramaters";
    setParamatersButton = new Button(buttX, buttY+C*3, buttW, buttH, tx, TS);
    homePageButtons.add(setParamatersButton);
    setParamatersButton.click = function(){
        
    }

    //NEXT GEN BUTTON
    tx = "create next generation";
    nextGenButton = new Button(buttX, buttY+C*4, buttW, buttH, tx, TS);
    homePageButtons.add(nextGenButton);
    nextGenButton.deactivate();
    nextGenButton.click = function(){
        
    }

    //ADD PREDATORS BUTTON
    tx = "add predators";
    addPredatorsButton = new Button(buttX, buttY+C*5, buttW, buttH, tx, TS);
    homePageButtons.add(addPredatorsButton);
    addPredatorsButton.deactivate();
    addPredatorsButton.click = function(){
        
    }

    //FIELD TEST BUTTON
    tx = "field test";
    fieldTestButton = new Button(buttX, buttY+C*6, buttW*0.6, buttH, tx, TS);
    homePageButtons.add(fieldTestButton);
    fieldTestButton.deactivate();
    fieldTestButton.click = function(){
        
    }

    //FIELD OPTIONS BUTTON
    tx = "opt";
    fieldOptionsButton = new Button(buttX+buttW*0.65, buttY+C*6, buttW*0.35, buttH, tx, TS);
    homePageButtons.add(fieldOptionsButton);
    fieldOptionsButton.deactivate();
    fieldOptionsButton.click = function(){
        
    }


    //BACK BUTTON
    tx = "back";
    backButton = new Button(20, height-50, 100, 20, tx, TS);
    menuButtons.add(backButton);
    backButton.hide();
    backButton.click = function(){
        
    }

    //PLAY BUTTON
    tx = "start simulation";
    startButton = new Button(width-200, height-70, buttW*0.7, buttH, tx, TS);
    //startButton.deactivate();
    homePageButtons.add(startButton);
    startButton.click = function(){
        loadArena();
    }
    
    
    

    

    // FUTURE USE BUTTONS//////

    //ABOUT Button
    tx = "about";
    aboutButton = new Button(buttX, buttY, buttW, buttH, tx);
    futureUseButtons.add(aboutButton);
    aboutButton.hide();

    //MAIN MENU
    tx = "main menu";
    mainMenuButton = new Button(buttX, buttY, buttW, buttH, tx);
    futureUseButtons.add(mainMenuButton);
    mainMenuButton.hide();
    
    //YES BUTTON
    tx = "yes";
    yesButton = new Button(buttX, buttY, buttW, buttH, tx);
    yesButton.hide();
    futureUseButtons.add(yesButton);
    
    //NO BUTTON
    tx = "no";
    noButton = new Button(buttX, buttY, buttW, buttH, tx);
    noButton.hide();
    futureUseButtons.add(noButton);

    //CONTINUE BUTTON
    tx = "continue";
    continueButton = new Button(buttX, buttY, buttW, buttH, tx);
    continueButton.hide();
    futureUseButtons.add(continueButton);

}

