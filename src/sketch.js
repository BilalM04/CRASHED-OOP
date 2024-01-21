/*
 * Crashed!
 * By: Mohammad Bilal & Youssef El Ashmawy
 */

var activeScreen = "main screen"; //variable for the current active screen

var roadY = -600; //y position of the road
var obstacleY = -300; //y position of the road obstacles
var carObstacleX = 0; //x position of the car obstacles
var carObstaclePos; //lane position of car obstacle
var obstacleCarType; //type of car obstacle
var conePos; //lane position for cone obstacle
var coneX = -200; //x position for cone obstacle
var score = 0; //tracks user score
var carType = 3; //tracks the car user selects
var carX = 300; //user car x position
var carCrashed = false; //if car is crashed
var crashSound = false; //variable to play crash sound
var mute = true; //variable to mute sound
var randomQ; //question number variable
var questions = ["What is the syntax for an ‘and’ statement?\n\n\n\na. #\n\n\nb. @\n\n\nc. ||\n\n\nd. &&","What is the syntax for an ‘or’ statement?\n\n\n\na. or\n\n\nb. ||\n\n\nc. $$\n\n\nd. &&","What is the syntax for a ‘not’ statement?\n\n\n\na. !=\n\n\nb. .notEquals\n\n\nc. #=\n\n\nd. ==","What would num have to be to satisfy this expression?\nnum >= 5 && num <= 10\n\n\na. 12\n\n\nb. 3\n\n\nc. 6\n\n\nd. 15","Which operator has the highest precedence?\n\n\n\na. +\n\n\nb. ||\n\n\nc. &&\n\n\nd. >=","Is this a valid statement?\nif (price >= 10 and quantity == 4)\n\n\nYes\n\nNo","Boolean expressions are more efficient\n than nested if statements.\n\n\nTrue\n\nFalse","Is this a valid statement?\nif (x >= 5 && x < 50)\n\n\nTrue\n\nFalse","Is this a correct statement to check\n if x is between 1 and 10 (inclusive)?\nif (x > 5 && x < 10)\n\nTrue\n\nFalse","Is this a correct statement to check if x is\n between 1 and 10 (inclusive)?\nif (x >= 1 || x <= 10)\n\nTrue\n\nFalse", "Is this a valid statement?\nif (x = 5 && y <= 9)\n\n\nYes\n\nNo", "Which types of operators have the greatest precedence?\n\n\n\na. Arithmetic\n\n\nb. Comparison\n\n\nc. Logical\n\n\nd. Boolean", "Is this a valid statement?\n if (x == 9 && y > 4)\n\n\nYes\n\nNo", "What would num have to be to satisfy this expression?\nnum < 10 || num == 23\n\n\na. 13\n\n\nb. 14\n\n\nc. 23\n\n\nd. 10", "Which of the following is NOT a comparison operator?\n\n\n\na. &&\n\n\nb. ==\n\n\nc. ||\n\n\nd. ++"]; //array holds all the questions

//variables for images
var carBackground;
var backButton;
var grassBackground;
var road;
var carObstacle;
var trafficCone;
var lamborghini;
var f1;
var redCar;
var policeCar;
var ambulance;
var crash;
var continueButton;
var gameOverImage;
var soundIcon;
var muteIcon;

//Variables for Font
var headingFont;
var textF;

//variables for sound
var music;
var mouseCLick;
var carCrashSound
var carDriving;

function preload() {
  //pre-loading images
  carBackground = loadImage("mainBackground.jpg");
  backButton = loadImage("backButton.png");
  grassBackground = loadImage("grassBackground.jpg");
  road = loadImage("road.jpg");
  carObstacle = loadImage("carObstacle.png");
  trafficCone = loadImage("trafficCone.png");
  lamborghini = loadImage("lamborghini.png");
  f1 = loadImage("f1Car.png");
  redCar = loadImage("redCar.png");
  policeCar = loadImage("policeCar.png");
  ambulance = loadImage("ambulance.png");
  crash = loadImage("crashed.png");
  continueButton = loadImage("continue.png");
  gameOverImage = loadImage("gameOver.jpg");
  soundIcon = loadImage("sound.png");
  muteIcon = loadImage("muted.png");

  //pre-loading fonts
  headingFont = loadFont("Brightly.otf");
  textF = loadFont("Stanberry.ttf");
  
  //pre-loading sound files
  music = loadSound("menuMusic.mp3");
  mouseClick = loadSound("mouseClick.m4a");
  carCrashSound = loadSound("carCrash.m4a");
  carDriving = loadSound("carDriving.m4a");
}

function setup() {
  createCanvas(600, 600); //sets canvas size

  carObstaclePos = Math.floor(random(1, 4)); //lane position of car obstacle
  obstacleCarType = Math.floor(random(1, 4)); //determines obstacle type
  randomQ = Math.floor(random(0,15)); //first quetsion is random
  
  //sets volume for sounds
  music.setVolume(0.1);
  mouseClick.setVolume(0.3);
  carDriving.setVolume(0.3);
  
  //plays music
  music.loop();
}

//function for the main screen
function mainScreen() {
  //variable for button strokes
  var instructionsStroke = 1;
  var startStroke = 1;
  var customizeStroke = 1;

  if (mouseX >= 100 && mouseX <= 200 && mouseY >= 350 && mouseY <= 400) {
    startStroke = 4; //if mouse hovers over start button, it becomes highlighted
  }
  if (mouseX >= 250 && mouseX <= 350 && mouseY >= 350 && mouseY <= 400) {
    instructionsStroke = 4; //if mouse hovers over instructions button, it becomes highlighted
  }
  if (mouseX >= 400 && mouseX <= 500 && mouseY >= 350 && mouseY <= 400) {
    customizeStroke = 4; //if mouse hovers over customize button, it becomes highlighted
  }

  //background
  image(carBackground, 0, 0, 600, 600);
  rectMode(CENTER);
  noStroke();
  fill(100, 150, 150, 230);
  rect(300, 300, 500, 250);

  //button and text formatting
  textAlign(CENTER);
  rectMode(CORNER);
  fill(200, 255, 255);

  //start button
  strokeWeight(startStroke);
  stroke(0, 255, 0);
  rect(100, 350, 100, 50);

  //instructions button
  strokeWeight(instructionsStroke);
  stroke(255, 255, 0);
  rect(250, 350, 100, 50);

  //customize button
  strokeWeight(customizeStroke);
  stroke(255, 0, 255);
  rect(400, 350, 100, 50);

  //button text
  textSize(15);
  textFont(headingFont);
  fill(0, 255, 0);
  noStroke();
  text("Start", 150, 380);
  fill(204, 204, 0);
  text("Instructions", 300, 380);
  fill(255, 0, 255);
  text("Customize", 450, 380);

  //game title and names of creators
  fill(200, 255, 255);
  textSize(100);
  text("Crashed!", 300, 290);
  textSize(15);
  text("Mohammad Bilal & Youssef El Ashmawy", 300, 320);
  
  //how to mute instructions
  fill(255);
  textSize(15);
  text("Press 'm' to mute or unmute sound", 300, 570);
  
  if (mute == true) {
    image(muteIcon, 540, 540, 50, 50); //mute icon
    masterVolume(0); //mutes sound
  }else if (mute == false) {
    image(soundIcon, 540, 540, 50, 50); //unmuted icon
    masterVolume(1); //turns sound back on
  }
}

//function for the instructions screen
function instructionsScreen() {
  //background
  background(100, 150, 150);

  //instructions title
  textAlign(CENTER);
  fill(255);
  textFont(headingFont);
  textSize(70);
  text("Instructions", 300, 130);

  //instructions text
  textFont(textF);
  textAlign(LEFT);
  textSize(20);
  text("1. Control the car using the left and right arrow keys or the\n   'a' and 'd' keys.\n\n2. You can change your car in the customize menu.\n\n3. Your objective is to avoid the obstacles on the road.\n\n4. If you hit an obstacle, you have 30s to answer a \n    question.\n\n5. If you answer correctly, you get to continue the game.\n\n6. If you answer incorrectly, your progress resets and the\n    game ends.\n\n7. Click 'Start' to begin the game. Have Fun!", 50, 190);

  //back button
  if (mouseX >= 510 && mouseX <= 580 && mouseY >= 20 && mouseY <= 60) {
    image(backButton, 505, 15, 80, 50); //if user hovers over button it appears larger
  } else {
    image(backButton, 510, 20, 70, 40); //normal button size
  }
}

//function for the customize screen
function customizeScreen() {
  background(100, 150, 150);

  //customize title
  textAlign(CENTER);
  textFont(headingFont);
  textSize(80);
  fill(255);
  text("Customize", 300, 130);
  textFont(textF);
  textSize(30);
  fill(230, 230, 0);
  text("Choose Your Vehicle", 300, 170);

  //back button
  if (mouseX >= 510 && mouseX <= 580 && mouseY >= 20 && mouseY <= 60) {
    image(backButton, 505, 15, 80, 50); //if user hovers over button it appears larger
  } else {
    image(backButton, 510, 20, 70, 40); //normal button size
  }

  if (mouseX >= 100 && mouseX <= 200 && mouseY >= 250 && mouseY <= 470) {
    image(lamborghini, 90, 240, 120, 240); //if user hovers over lamborghini it appears larger
  } else {
    image(lamborghini, 100, 250, 100, 220); //normal lamborghini size
  }
  if (mouseX >= 250 && mouseX <= 350 && mouseY >= 250 && mouseY <= 470) {
    image(f1, 240, 240, 120, 240); //if user hovers over f1 car it appears larger
  } else {
    image(f1, 250, 250, 100, 220); //normal f1 car size
  }
  if (mouseX >= 400 && mouseX <= 500 && mouseY >= 250 && mouseY <= 470) {
    image(redCar, 390, 240, 120, 240); //if user hovers over red car it appears larger
  } else {
    image(redCar, 400, 250, 100, 220); //normal red car size
  }

  // depending on which car the user select, the car gets marked with an indicator
  if (carType == 1) {
    noStroke();
    fill(230, 230, 0);
    circle(150, 510, 20);
  } else if (carType == 2) {
    noStroke();
    fill(230, 230, 0);
    circle(300, 510, 20);
  } else if (carType == 3) {
    noStroke();
    fill(230, 230, 0);
    circle(450, 510, 20);
  }
}

//function for the screen where user plays the game
function gameScreen() {
  //grass
  imageMode(CORNER);
  image(grassBackground, 0, roadY, 600, 600);
  image(grassBackground, 0, roadY + 600, 600, 600);

  //road
  image(road, 105, roadY, 390, 600);
  image(road, 105, roadY + 600, 390, 600);

  if (carCrashed == false) {
    if (roadY >= 0) {
      roadY = -600; //loops the road back around
    }

    if (score >= 0 && score < 100) {
      obstacleY += 5; //moves the obstacles along the y axis
      roadY += 5; //moves the road along the y axis
    } else if (score >= 100 && score < 200) {
      obstacleY += 7; //increases obstacle speed as game progresses
      roadY += 7; //increases road speed as game progresses
    } else if (score >= 200 && score < 300) {
      obstacleY += 9; //increases obstacle speed as game progresses
      roadY += 9; //increases road speed as game progresses
    } else if (score >= 300) {
      obstacleY += 11; //increases obstacle speed as game progresses
      roadY += 11; //increases road speed as game progresses
    }

    if (obstacleY >= 680) {
      carObstaclePos = Math.floor(random(1, 4)); //determines a random lane position for the car obstacle
      obstacleCarType = Math.floor(random(1, 4)); //dtermines a random car obstacle type
      score += 10; //increases user score each time
      obstacleY = -80; //resets car obstacle position once it goes beyond the screem
    }

    if (carObstaclePos == 1 && obstacleY <= -70) {
      carObstacleX = 170; //sets car obstacle in lane 1
      conePos = Math.floor(random(2, 4)); //determines random lane position of the traffic cone depending on car obstacle position
    } else if (carObstaclePos == 2 && obstacleY <= -70) {
      carObstacleX = 300; //sets car obstacle in lane 2
      //determines random lane position of the traffic cone depending on car obstacle position
      if (Math.floor(random(1, 3)) == 1) {
        conePos = 1;
      } else {
        conePos = 3;
      }
    } else if (carObstaclePos == 3 && obstacleY <= -70) {
      carObstacleX = 430; //sets car obstacle in lane 3
      conePos = Math.floor(random(1, 3)); //determines random lane position of the traffic cone depending on car obstacle position
    }

    if (obstacleCarType == 1) {
      imageMode(CENTER);
      image(carObstacle, carObstacleX, obstacleY, 90, 160); //displays car obstacle on the road
    } else if (obstacleCarType == 2) {
      imageMode(CENTER);
      image(policeCar, carObstacleX, obstacleY, 90, 160); //displays police car obstacle on the road
    } else if (obstacleCarType == 3) {
      imageMode(CENTER);
      image(ambulance, carObstacleX, obstacleY, 90, 160); //displays ambulance obstacle on the road
    }

    //traffic cones begin to appear once user gets to score 50
    if (score >= 50) {
      if (conePos == 1) {
        coneX = 170; //sets cone in lane 1
      } else if (conePos == 2) {
        coneX = 300; //sets cone in lane 2
      } else if (conePos == 3) {
        coneX = 430; //sets cone in lane 3
      }
    }
    image(trafficCone, coneX, obstacleY, 100, 70); //displays traffic cone
  }

  if (carType == 1) {
    imageMode(CENTER);
    image(lamborghini, carX, 515, 90, 160); //if car type is 1, lamborghini is displayed
  } else if (carType == 2) {
    imageMode(CENTER);
    image(f1, carX, 515, 90, 160); //if car type is 2, f1 car is displayed
  } else if (carType == 3) {
    imageMode(CENTER);
    image(redCar, carX, 515, 90, 160); //if car type is 3, red car is displayed
  }
  
  //displays the score
  textFont(headingFont);
  textAlign(CENTER);
  textSize(25);
  fill(0);
  text("Score:\n" + score, 550, 550);
  
  collisionCheck(carObstacleX, obstacleY, 45, 80); //checks if user car has hit obstacle car
  collisionCheck(coneX, obstacleY, 50, 35); //checks if user car has hit traffic cone
  
  if (carCrashed == true) {
    carDriving.stop(); //stops the driving sound
    obstacleY = -700;
    imageMode(CENTER);
    image(crash, 300, 300); //displays crashed image 
    textFont(headingFont);
    textAlign(CENTER);
    fill(255);
    if (mouseX >= 130 && mouseX <= 460 && mouseY >= 0 && mouseY <= 60) {
      textSize(30); //if user hovers over text it enlarges
    } else {
      textSize(25); //normal text size
    }
    text("Click here to continue.", 300, 50); //user prompt to go to next screen
  }
  
  if (crashSound == true) {
    carCrashSound.play(); //plays car crash noise
    crashSound = false; 
  }
}

//function to display the question
function askQuestion(questionNumber) {
  timer = 0; //initializes timer
  while (timer <= 30) {
    background(100, 150, 150);
    textFont(textF);
    textSize(20);
    textAlign(CENTER);
    fill(0);
    text(questions[questionNumber],300,100); //diplays question and options
    timer = millis() - timeLapse; //keeps track of timer
    textFont(headingFont);
    textSize(30);
    fill(255);
    text(round(timer/1000, 0), 50, 50); //displays timer
    if (timer > 30000) {
      activeScreen = "incorrect screen"; //if user reaches over time limit, the question is incorrect
    }
  }
}

//function for correct answer screen
function answerFeedback(feedback, red, green) {
  //displays correct or incorrect answer
  background(red, green, 0);
  textAlign(CENTER);
  textSize(100);
  fill(255);
  textFont(headingFont);
  text(feedback, 300, 300);
  imageMode(CORNER);
  if (mouseX >= 430 && mouseX <= 580 && mouseY >= 530 && mouseY <= 580) {
    image(continueButton, 425, 527.5, 160, 55); //if user hovers over button it appears larger
  } else {
    image(continueButton, 430, 530, 150, 50); //normal button size
  }
}

//function for game over screen
function gameOver() {
  //game over screen
  imageMode(CORNER);
  image(gameOverImage, 0, 0, 600, 600);
  textAlign(CENTER);
  textFont(headingFont);
  fill(255); 
  if (mouseX >= 180 && mouseX <= 420 && mouseY >= 520 && mouseY <= 600) {
      textSize(30); //if user hovers over text it enlarges
    } else {
      textSize(25); //normal text size
    }
  text("Click here to continue.", 300, 550); //user prompt to continue
}

function collisionCheck(other_x, other_y, other_width, other_height) {
  if ((carX - 45 < other_x + other_width) && (435 < other_y + other_height) && (carX + 45 > other_x) && (595 + 15 > other_y)) {
    carCrashed = true; //if car crashes, the variable become true
    crashSound = true; //if car crashes, the variable become true
  }
}

function keyPressed() {
  if (activeScreen == "game screen" && carCrashed == false) {
    if ((keyCode == LEFT_ARROW || key =='a') && carX > 170) {
      carX -= 130; //moves user car left
    }
    if ((keyCode == RIGHT_ARROW || key == 'd') && carX < 430) {
      carX += 130; //moves user car right
    }
  }
  if (activeScreen == "main screen" && key == 'm') {
    if (mute) {
      mute = false; //unmutes sound
    } else {
      mute = true; //mutes sound
    }
  }
}

function mousePressed() {
  mouseClick.play(); //sound when user clicks
  if (activeScreen == "main screen") {
    if (mouseX >= 100 && mouseX <= 200 && mouseY >= 350 && mouseY <= 400) {
      carDriving.loop(); //plays the driving sound
      activeScreen = "game screen"; //if user presses start button, the game screen become active
    }
    if (mouseX >= 250 && mouseX <= 350 && mouseY >= 350 && mouseY <= 400) {
      activeScreen = "instructions screen"; //if user presses the instructions button, the instructions screen becomes active
    }
    if (mouseX >= 400 && mouseX <= 500 && mouseY >= 350 && mouseY <= 400) {
      activeScreen = "customize screen"; //if user presses the customize button, the customize screen becomes active
    }
  }
  if ((activeScreen == "instructions screen" || activeScreen == "customize screen") && mouseX >= 510 && mouseX <= 580 && mouseY >= 20 && mouseY <= 60) { 
    activeScreen = "main screen"; //if user presses the back button, main screen becomes active
  }
  if (activeScreen == "customize screen") {
    //changes car appearance based on which car the user selects
    if (mouseX >= 100 && mouseX <= 200 && mouseY >= 250 && mouseY <= 470) {
      carType = 1;
    }
    if (mouseX >= 250 && mouseX <= 350 && mouseY >= 250 && mouseY <= 470) {
      carType = 2;
    }
    if (mouseX >= 400 && mouseX <= 500 && mouseY >= 250 && mouseY <= 470) {
      carType = 3;
    }
  }
  if (activeScreen == "game screen" && carCrashed == true && mouseX >= 130 && mouseX <= 460 && mouseY >= 0 && mouseY <= 60) {
    timeLapse = millis(); //sets a variable for the timer
    activeScreen = "question screen"; //question screen become active if user clicks after crash
  }
  if (activeScreen == "correct screen" && mouseX >= 430 && mouseX <= 580 && mouseY >= 530 && mouseY <= 580) {
    carDriving.loop(); //plays car driving sound
    obstacleY = -700;
    carCrashed = false;
    activeScreen = "game screen"; //returns back to game when user presses continue after correct answer
  }
  if (activeScreen == "incorrect screen" && mouseX >= 430 && mouseX <= 580 && mouseY >= 530 && mouseY <= 580) {
    activeScreen = "game over screen"; //game ends when user continues after incorrect answer
  }
  if (activeScreen == "game over screen" && mouseX >= 180 && mouseX <= 420 && mouseY >= 520 && mouseY <= 600) {
    //resets the game
    carX = 300;
    coneX = -200;
    obstacleY = -300;
    score = 0;
    carObstaclePos = Math.floor(random(1, 4)); //lane position of car obstacle
    obstacleCarType = Math.floor(random(1, 4)); //determines obstacle type
    randomQ = Math.floor(random(0,10)); //first quetsion is random
    carCrashed = false;
    activeScreen = "main screen"; //goes back to main screen
  }
  //determines if user's answer is correct or incorrect for each question
  if (activeScreen == "question screen" && randomQ == 0) {
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 180 && mouseY <= 200) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 255 && mouseY <= 280) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 330 && mouseY <= 350) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 405 && mouseY <= 425) {
      activeScreen = "correct screen";
      randomQ++;
    }
  }
  if (activeScreen == "question screen" && randomQ == 1) {
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 180 && mouseY <= 200) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 255 && mouseY <= 280) {
      activeScreen = "correct screen";
      randomQ++;
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 330 && mouseY <= 350) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 405 && mouseY <= 425) {
      activeScreen = "incorrect screen";
    }
  }
  if (activeScreen == "question screen" && randomQ == 2) {
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 180 && mouseY <= 200) {
      activeScreen = "correct screen";
      randomQ++;
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 255 && mouseY <= 280) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 330 && mouseY <= 350) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 405 && mouseY <= 425) {
      activeScreen = "incorrect screen";
    }
  }
  if (activeScreen == "question screen" && randomQ == 3) {
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 180 && mouseY <= 200) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 255 && mouseY <= 280) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 330 && mouseY <= 350) {
      activeScreen = "correct screen";
      randomQ++;
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 405 && mouseY <= 425) {
      activeScreen = "incorrect screen";
    }
  }
  if (activeScreen == "question screen" && randomQ == 4) {
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 180 && mouseY <= 200) {
      activeScreen = "correct screen";
      randomQ++;
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 255 && mouseY <= 280) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 330 && mouseY <= 350) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 405 && mouseY <= 425) {
      activeScreen = "incorrect screen";
    }
  }
  if (activeScreen == "question screen" && randomQ == 5) {
    if (mouseY >= 185 && mouseY <= 200 && mouseX >=280 && mouseX <=320) {
      activeScreen = "incorrect screen";
    }
    if (mouseY >= 230 && mouseY <= 255 && mouseX >=275 && mouseX <=320) {
      activeScreen = "correct screen";
      randomQ++;
    }
  }
  if (activeScreen == "question screen" && randomQ == 6) {
    if (mouseY >= 185 && mouseY <= 200 && mouseX >=280 && mouseX <=320) {
      activeScreen = "correct screen";
      randomQ++;
    }
    if (mouseY >= 230 && mouseY <= 255 && mouseX >=275 && mouseX <=320) {
      activeScreen = "incorrect screen";
    }
  }
  if (activeScreen == "question screen" && randomQ == 7) {
    if (mouseY >= 185 && mouseY <= 200 && mouseX >=280 && mouseX <=320) {
      activeScreen = "correct screen";
      randomQ++;
    }
    if (mouseY >= 230 && mouseY <= 255 && mouseX >=275 && mouseX <=320) {
      activeScreen = "incorrect screen";
    }
  }
  if (activeScreen == "question screen" && randomQ == 8) {
    if (mouseY >= 185 && mouseY <= 200 && mouseX >=280 && mouseX <=320) {
      activeScreen = "incorrect screen";
    }
    if (mouseY >= 230 && mouseY <= 255 && mouseX >=275 && mouseX <=320) {
      activeScreen = "correct screen";
      randomQ++;
    }
  }
  if (activeScreen == "question screen" && randomQ == 9) {
    if (mouseY >= 185 && mouseY <= 200 && mouseX >=280 && mouseX <=320) {
      activeScreen = "incorrect screen";
    }
    if (mouseY >= 230 && mouseY <= 255 && mouseX >=275 && mouseX <=320) {
      activeScreen = "correct screen";
      randomQ++;
    }
  }
  if (activeScreen == "question screen" && randomQ == 10) {
    if (mouseY >= 185 && mouseY <= 200 && mouseX >=280 && mouseX <=320) {
      activeScreen = "incorrect screen";
    }
    if (mouseY >= 230 && mouseY <= 255 && mouseX >=275 && mouseX <=320) {
      activeScreen = "correct screen";
      randomQ++;
    }
  }
  if (activeScreen == "question screen" && randomQ == 11) {
    if(mouseX >= 236 && mouseX <= 364 && mouseY >= 180 && mouseY <= 205) {
      activeScreen = "correct screen";
      randomQ++;
    }
    if(mouseX >= 232 && mouseX <= 370 && mouseY >= 255 && mouseY <= 287) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 252 && mouseX <= 345 && mouseY >= 330 && mouseY <= 360) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 250 && mouseX <= 350 && mouseY >= 405 && mouseY <= 425) {
      activeScreen = "incorrect screen";
    }
  }
  if (activeScreen == "question screen" && randomQ == 12) {
    if (mouseY >= 185 && mouseY <= 200 && mouseX >=280 && mouseX <=320) {
      activeScreen = "correct screen";
      randomQ++;
    }
    if (mouseY >= 230 && mouseY <= 255 && mouseX >=275 && mouseX <=320) {
      activeScreen = "incorrect screen";
    }
  }
  if (activeScreen == "question screen" && randomQ == 13) {
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 180 && mouseY <= 200) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 255 && mouseY <= 280) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 330 && mouseY <= 350) {
      activeScreen = "correct screen";
      randomQ++;
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 405 && mouseY <= 425) {
      activeScreen = "incorrect screen";
    }
  }
  if (activeScreen == "question screen" && randomQ == 14) {
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 180 && mouseY <= 200) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 255 && mouseY <= 280) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 330 && mouseY <= 350) {
      activeScreen = "incorrect screen";
    }
    if(mouseX >= 285 && mouseX <= 325 && mouseY >= 405 && mouseY <= 425) {
      activeScreen = "correct screen";
      randomQ = 0;
    }
  }
}

function draw() {
  if (activeScreen == "main screen") {
    mainScreen(); //if main screen is active, the main screen is displayed
  }
  if (activeScreen == "instructions screen") {
    instructionsScreen(); //if instructions screen is active, the insctructions screen is displayed
  }
  if (activeScreen == "customize screen") {
    customizeScreen(); //if customize screen is active, the customize screen is displayed
  }
  if (activeScreen == "game screen") {
    gameScreen(); //if game screen is active, the game begins
  }
  if (activeScreen == "question screen") {
    askQuestion(randomQ); //if question screen is active, a question pops up
  }
  if (activeScreen == "correct screen") {
    answerFeedback("Correct!", 0, 255); //displays correct if user selects the right answer
  }
  if (activeScreen == "incorrect screen") {
    answerFeedback("Incorrect!", 255, 0); //displays incorrect if user selects the wrong answer
  }
  if (activeScreen == "game over screen") {
    gameOver(); //if game over screen is active, then the game ends
  }
}
