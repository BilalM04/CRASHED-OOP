/*
 * Crashed!
 * By: Mohammad Bilal & Youssef El Ashmawy
 */


//button variable declaration
let startBtn;
let instructionsBtn;
let customizeBtn;
let carBtn;
let backBtn2;
let backgroundBtn;
let continueBtn;

//Declaring screen variable
var activeScreen = "main screen";

//Declaring variables
var carCrashed = false;
var score = 0;
let optionA;
let optionB;
let optionC;
let optionD;
let qAndA;
let randomQ;
let questions = [];
let questionNumber = 0;
let mute = true;
let music;
let crashSound = false; //variable to play crash sound
let carCrashSound;

function preload() {
  //pre-loading images
  carBackground = loadImage("mainBackground.jpg");
  backButton = loadImage("backButton.png");
  grassBackground = loadImage("grassBackground.jpg");
  street = loadImage("road.jpg");
  carObstacleImg = loadImage("carObstacle.png");
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
  rockRoad = loadImage("rockRoad.jpeg");
  sideWalk = loadImage("sideWalk.jpeg");
  rocks = loadImage("rocks.jpeg");
  dirt = loadImage("dirt.jpeg");
  carImage = loadImage("carImage.png");
  backgroundImage = loadImage("imageIcon.png");
  background1 = loadImage("background1.png");
  background2 = loadImage("background2.png");
  background3 = loadImage("background3.png");

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
  //creating canvas and car,road, and grass objects
  createCanvas(600, 600);
  car1 = new car(redCar);
  road1 = new road(-600, street);
  road2 = new road(0, street);
  grass1 = new grass(-600, sideWalk);
  grass2 = new grass(0, sideWalk);
  //sets volume for sounds
  music.setVolume(0.1);
  mouseClick.setVolume(0.3);
  carDriving.setVolume(0.3);

  //plays music
  music.loop();
  
  //Array of questions, options and answers
  qAndA = [
    [
      "What type of inheritance does Java have?",
      "What is the keyword for a child class?",
      "What type of relationship does a child class have with the parent class?",
      "Does a subclass inherit both member variables and methods?",
      "To override a method, which condition must be met?",
      "If you want to refer to a field or method that belongs to a superclass?",
      "When you create an instance of a subclass…",
      "Why is inheritance very powerful?",
      "How many classes can a single class extend?",
      "What restriction is there on using the super reference in a constructor?",
    ],

    [
      "Single Inheritance",
      "Inherits",
      "Has a",
      "No - Only member variables are inherited",
      "The class must extend the class that defines the method you want to override",
      'You must use the keyword "Implements"',
      "The default constructor of the superclass is automatically called before it executes the constructor of the subclass.",
      "It uses more code",
      "There is no limit",
      "It can only be used in the parent's constructor",
    ],

    [
      "Double Inheritance",
      "Extends",
      "Becomes a",
      "No - only methods are inherited",
      'The keyword "super" must be used',
      'You must use the keyword "super"',
      "The constructor of the superclass is neglected",
      "It takes up more memory",
      "Four",
      "Only one child class can use it",
    ],

    [
      "Multiple inheritance",
      "Implements",
      "Is A",
      "Yes - Both are inherited",
      "The method must have exactly 2 parameters",
      'You must use the keyword "Extends"',
      "The consturctor of the subclass is called first",
      "It takes longer to excecute",
      "One",
      "It must be used in the last statement of the constructor",
    ],

    [
      "Class Inheritance",
      "Is A",
      "Pertains a",
      "Yes—but only one or the other are inherited",
      "The method must have no parameters",
      'You must use the keyword "Import"',
      "The constructor of the subclass is neglected",
      "It saves a significant amount of time and labour",
      "Two",
      "It must be used in the first statement of the constructor",
    ],

    [
      "Single Inheritance",
      "Extends",
      "Is A",
      "Yes - Both are inherited",
      "The class must extend the class that defines the method you want to override",
      'You must use the keyword "super"',
      "The default constructor of the superclass is automatically called before it executes the constructor of the subclass.",
      "It saves a significant amount of time and labour",
      "One",
      "It must be used in the first statement of the constructor",
    ],
  ];

  //creating car obstacle object
  carObstacle = new obstacleCar(
    0,
    -300,
    90,
    160,
    carObstacleImg,
    Math.floor(random(1, 4)),
    Math.floor(random(1, 4))
  );
  
  //creating cone obstacle object
  coneObstacle = new obstacleCone(0, -140, 100, 70, trafficCone, 1);
  sc = new screen();

  
  //creating the start button
  startBtn = createButton("Start");
  startBtn.position(100, 350);
  startBtn.size(100, 30);
  startBtn.style("border-color", color(0, 220, 0));
  startBtn.style("color", color(0, 220, 0));
  startBtn.mouseClicked(function changeScreen() {
    activeScreen = "game screen";
    carDriving.loop();
  });
  startBtn.hide();

  
  //creating a car button
  carBtn = createButton("Car");
  carBtn.position(150, 410);
  carBtn.size(100);
  carBtn.mouseClicked(function changeScreen() {
    activeScreen = "customize car screen";
  });
  carBtn.hide();

  
  //creating a background button
  backgroundBtn = createButton("Background");
  backgroundBtn.position(365, 410);
  backgroundBtn.size(100);
  backgroundBtn.mouseClicked(function changeScreen() {
    activeScreen = "customize background screen";
  });
  backgroundBtn.hide();

  //creating back button
  backBtn2 = createButton("Back");
  backBtn2.position(530, 20);
  backBtn2.size(50, 30);
  backBtn2.mouseClicked(function changeScreen() {
    activeScreen = "customize screen";
  });
  backBtn2.hide();

  
  //option A button
  optionA = createButton("");
  optionA.size(300, 50);
  optionA.position(150, 200);
  optionA.hide();
  //checks answer if option a is clicked
  optionA.mouseClicked(function checkAnswer() {
    if (
      questions[questionNumber].getAnswer(1) ==
      questions[questionNumber].getAnswer(0)
    ) {
      activeScreen = "correct screen";
    } else {
      activeScreen = "incorrect screen";
    }
  });

  //option A button
  optionB = createButton("");
  optionB.center("horizontal");
  optionB.size(300, 50);
  optionB.position(150, 300);
  optionB.hide();
  //checks answer if option B is clicked
  optionB.mouseClicked(function checkAnswer() {
    if (
      questions[questionNumber].getAnswer(2) ==
      questions[questionNumber].getAnswer(0)
    ) {
      activeScreen = "correct screen";
    } else {
      activeScreen = "incorrect screen";
    }
  });

  //Creates a option C button
  optionC = createButton("");
  optionC.center("horizontal");
  optionC.size(300, 50);
  optionC.position(150, 400);
  optionC.hide();
  //checks answer if option C is clicked
  optionC.mouseClicked(function checkAnswer() {
    if (
      questions[questionNumber].getAnswer(3) ==
      questions[questionNumber].getAnswer(0)
    ) {
      activeScreen = "correct screen";
    } else {
      activeScreen = "incorrect screen";
    }
  });

  //Creates an option D button
  optionD = createButton("");
  optionD.center("horizontal");
  optionD.size(300, 50);
  optionD.position(150, 500);
  optionD.hide();
  //checks answer if option D is clicked
  optionD.mouseClicked(function checkAnswer() {
    if (
      questions[questionNumber].getAnswer(4) ==
      questions[questionNumber].getAnswer(0)
    ) {
      activeScreen = "correct screen";
    } else {
      activeScreen = "incorrect screen";
    }
  });

  //Creates Instruction button
  instructionsBtn = createButton("Instructions");
  instructionsBtn.position(250, 350);
  instructionsBtn.size(100, 30);
  instructionsBtn.style("border-color", color(220, 220, 0));
  instructionsBtn.style("color", color(220, 220, 0));
  instructionsBtn.mouseClicked(function changeScreen() {
    activeScreen = "instructions screen";
  });
  instructionsBtn.hide();

  
  //Creates Customize button
  customizeBtn = createButton("Customize");
  customizeBtn.position(400, 350);
  customizeBtn.size(100, 30);
  customizeBtn.style("border-color", color(255, 0, 255));
  customizeBtn.style("color", color(255, 0, 255));
  customizeBtn.mouseClicked(function changeScreen() {
    activeScreen = "customize screen";
  });
  customizeBtn.hide();

  //Creates back button
  backBtn = createButton("Back");
  backBtn.position(530, 20);
  backBtn.size(50, 30);
  backBtn.mouseClicked(function changeScreen() {
    activeScreen = "main screen";
  });
  backBtn.hide();

  //Creates continue button
  continueBtn1 = createButton("Continue");
  continueBtn1.position(510, 550);
  continueBtn1.size(70, 30);
  continueBtn1.mouseClicked(function changeScreen() {
    continueBtn1.hide();
    car1.setX(255);
    carCrashed = false;
    activeScreen = "main screen";
    
    
  //If it runs out of questions it starts from the beginning
    if (questionNumber == 9) {
      questionNumber = 0;
    } else {
      questionNumber++;
    }
    //Makes the car driving sound
    carDriving.loop();
    //switches to the game screen
    activeScreen = "game screen";
  });
  //hides the continue button
  continueBtn1.hide();
 //Creates the second continue button
  continueBtn2 = createButton("Continue");
  continueBtn2.position(510, 550);
  continueBtn2.size(70, 30);
  continueBtn2.mouseClicked(function changeScreen() {
    continueBtn2.hide();
    //if it runs out of questions
    if (questionNumber == 9) {
      questionNumber = 0;
    } else {
      questionNumber++;
    }
    activeScreen = "game over screen";
  });
  continueBtn2.hide();

  //Fills an array of question objects
  for (let i = 0; i < 10; i++) {
    questions[i] = new question(
      qAndA[0][i],
      qAndA[1][i],
      qAndA[2][i],
      qAndA[3][i],
      qAndA[4][i],
      qAndA[5][i]
    );
  }

  //Shuffles the questions in the question object array
  for (let i = 0; i < 10; i++) {
    randomIndex = Math.floor(random(0, 10));
    temp = questions[randomIndex];
    questions[randomIndex] = questions[i];
    questions[i] = temp;
  }
}

function draw() {
  //Changes between all the active screens
  if (activeScreen == "main screen") {
    sc.mainScreen(); //if main screen is active, the main screen is displayed
  }
  if (activeScreen == "instructions screen") {
    sc.instructionsScreen(); //if instructions screen is active, the insctructions screen is displayed
  }
  if (activeScreen == "customize screen") {
    sc.customizeScreen(); //if customize screen is active, the customize screen is displayed
  }
  if (activeScreen == "customize car screen") {
    sc.customizeCarScreen(); //if game screen is active, the game begins
  }
  if (activeScreen == "customize background screen") {
    sc.customizeBackgroundScreen(); //if game screen is active, the game begins
  }
  if (activeScreen == "game screen") {
    sc.gameScreen(); //if game screen is active, the game begins
  }
  if (activeScreen == "question screen") {
    sc.questionScreen(); //if game screen is active, the game begins
  }
  if (activeScreen == "correct screen") {
    sc.correctScreen(); //if game screen is active, the game begins
  }
  if (activeScreen == "incorrect screen") {
    sc.incorrectScreen(); //if game screen is active, the game begins
  }
  if (activeScreen == "game over screen") {
    sc.gameOverScreen(); //if game screen is active, the game begins
  }
}

class picture {
  //sets dimensions and spot of pictures
  constructor(x, y, width, height, img) {
    this.x = x;
    this.right = x + width;
    this.y = y;
    this.bottom = y + height;
    this.width = width;
    this.height = height;
    this.img = img;
  }

  //collision check
  isTouching(other) {
    if (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    ) {
      return true;
    }
  }
}

class car extends picture {
  // constructor for the car class
  constructor(img) {
    super(255, 435, 90, 160, img);
  }

  //Move function
  move(direction) {
    if ((direction == "left" || key == "a") && this.x > 165) {
      this.x -= 130; //moves user car left
    }
    if ((direction == "right" || key == "d") && this.x < 345) {
      this.x += 130; //moves user car right
    }
  }

  //Sets the image of the car
  setCar(img) {
    this.img = img;
  }

  //Gets the car of the class
  getCar() {
    return this.img;
  }

  //Sets the x-coordinate
  setX(x) {
    this.x = x;
  }

  //Draw function of the class
  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

class obstacleCar extends picture {
  //Constructor for the car obstacles
  constructor(x, y, width, height, img, type, lane) {
    super(x, y, width, height, img);
    this.type = type;
    this.lane = lane;
  }

  //Moves the obstacle
  move(speed) {
    this.y += speed;

    if (this.y > 680) {
      this.y = -180;
      this.lane = Math.floor(random(1, 4));
      this.type = Math.floor(random(1, 4));
      score++;
    }
  }

  //Changes the lane of the car obstacles
  changeLane() {
    if (this.lane == 1) {
      this.x = 130;
    } else if (this.lane == 2) {
      this.x = 255;
    } else if (this.lane == 3) {
      this.x = 385;
    }
  }

  //Changes the type of obstacle
  changeType() {
    if (this.type == 1) {
      this.img = carObstacleImg;
    } else if (this.type == 2) {
      this.img = policeCar;
    } else if (this.type == 3) {
      this.img = ambulance;
    }
  }

  //Sets the y coord
  setY(y) {
    this.y = y;
  }

  //Finds out which lane it is in
  getLane() {
    return this.lane;
  }

  //Draws the object
  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

class obstacleCone extends picture {
  //Constructor for the con obstacles
  constructor(x, y, width, height, img, lane) {
    super(x, y, width, height, img);
    this.lane = lane;
  }

  //Moves the cone
  move(speed) {
    this.y += speed;

    if (this.y - 40 > 680) {
      this.y = -140;
    }
  }

  //Determines the lane of the cone
  determineLane() {
    if (this.y <= -100) {
      if (carObstacle.getLane() == 1) {
        this.lane = Math.floor(random(2, 4));
      } else if (carObstacle.getLane() == 2) {
        if (Math.floor(random(1, 3)) == 1) {
          this.lane = 1;
        } else {
          this.lane = 3;
        }
      } else if (carObstacle.getLane() == 3) {
        this.lane = Math.floor(random(1, 3));
      }
    }
  }
  //Sets the y coord
  setY(y) {
    this.y = y;
  }
  //Changes the lane of the cone
  changeLane() {
    if (this.lane == 1) {
      this.x = 130;
    } else if (this.lane == 2) {
      this.x = 255;
    } else if (this.lane == 3) {
      this.x = 385;
    }
  }
  //draws the cone
  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

class road extends picture {
  //Constructor for the road
  constructor(y, img) {
    super(105, y, 390, 600, img);
  }

  //Moves the road up the screen
  move(speed) {
    this.y += speed;

    if (this.y > 600) {
      this.y = -600;
    }
  }

  //Sets the image of the road
  setImage(img) {
    this.img = img;
  }

  //Getter of the image
  getImage() {
    return this.img;
  }

  //Draw function of the road
  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

class grass extends picture {
  //Grass constructor
  constructor(y, img) {
    super(0, y, 600, 600, img);
  }

  //Moves with the rest of the background
  move(speed) {
    this.y += speed;

    if (this.y > 600) {
      this.y = -600;
    }
  }

  //Image setter
  setImage(img) {
    this.img = img;
  }

  //image getter
  getImage() {
    return this.img;
  }

  //Draw function of the grass
  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

class question {
  //constructor for the question class
  constructor(q, a1, a2, a3, a4, correct) {
    this.q = q;
    this.a1 = a1;
    this.a2 = a2;
    this.a3 = a3;
    this.a4 = a4;
    this.correct = correct;
  }

  //Gets the question
  getQuestion() {
    return this.q;
  }

  //Gets the answer to the question
  getAnswer(num) {
    if (num == 1) {
      return this.a1;
    } else if (num == 2) {
      return this.a2;
    } else if (num == 3) {
      return this.a3;
    } else if (num == 4) {
      return this.a4;
    } else if (num == 0) {
      return this.correct;
    }
  }
}

class screen {
  //When the active screen is the main screen
  mainScreen() {
    backBtn.hide();
    startBtn.show();
    instructionsBtn.show();
    customizeBtn.show();
    carBtn.hide();
    backgroundBtn.hide();

    //background
    image(carBackground, 0, 0, 600, 600);
    rectMode(CENTER);
    noStroke();
    fill(100, 150, 150, 230);
    rect(300, 300, 500, 250);

    textAlign(CENTER);
    textFont(headingFont);
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
    } else if (mute == false) {
      image(soundIcon, 540, 540, 50, 50); //unmuted icon
      masterVolume(1); //turns sound back on
    }
  }

  //When the active screen is the instructions screen
  instructionsScreen() {
    startBtn.hide();
    instructionsBtn.hide();
    customizeBtn.hide();
    backBtn.show();

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
    text(
      "1. Control the car using the left and right arrow keys or the\n   'a' and 'd' keys.\n\n2. You can change your car & background in the customize\n    menu.\n\n3. Your objective is to avoid the obstacles on the road.\n\n4. If you hit an obstacle, you have to answer a question.\n\n5. If you answer correctly, you get to continue the game.\n\n6. If you answer incorrectly, your progress resets and the\n    game ends.\n\n7. Click 'Start' to begin the game. Have Fun!",
      30,
      180
    );
  }

  //When in the customize menu
  customizeScreen() {
    backBtn.show();
    backBtn2.hide();
    startBtn.hide();
    instructionsBtn.hide();
    customizeBtn.hide();
    carBtn.show();
    backgroundBtn.show();

    background(100, 150, 150);

    //Title
    textAlign(CENTER);
    textFont(headingFont);
    textSize(80);
    fill(255);
    text("Customize", 300, 130);

    //The two option
    image(carImage, 100, 250, 200, 150);
    image(backgroundImage, 330, 260, 170, 130);
  }

  //Customizing the car
  customizeCarScreen() {
    backBtn.hide();
    startBtn.hide();
    instructionsBtn.hide();
    customizeBtn.hide();
    backBtn2.show();
    carBtn.hide();
    backgroundBtn.hide();

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

    if (car1.getCar() == lamborghini) {
      noStroke();
      fill(230, 230, 0);
      circle(150, 510, 20);
    } else if (car1.getCar() == f1) {
      noStroke();
      fill(230, 230, 0);
      circle(300, 510, 20);
    } else if (car1.getCar() == redCar) {
      noStroke();
      fill(230, 230, 0);
      circle(450, 510, 20);
    }
  }

  //Background customize
  customizeBackgroundScreen() {
    backBtn.hide();
    startBtn.hide();
    instructionsBtn.hide();
    customizeBtn.hide();
    backBtn2.show();
    carBtn.hide();
    backgroundBtn.hide();

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
    text("Choose Your Background", 300, 170);

    //changing background based on user selection
    if (mouseX >= 100 && mouseX <= 200 && mouseY >= 250 && mouseY <= 400) {
      image(background1, 90, 240, 120, 170); 
    } else {
      image(background1, 100, 250, 100, 150); 
    }
    if (mouseX >= 250 && mouseX <= 350 && mouseY >= 250 && mouseY <= 400) {
      image(background2, 240, 240, 120, 170); 
    } else {
      image(background2, 250, 250, 100, 150); 
    }
    if (mouseX >= 400 && mouseX <= 500 && mouseY >= 250 && mouseY <= 400) {
      image(background3, 390, 240, 120, 170); 
    } else {
      image(background3, 400, 250, 100, 150); 
    }

    //The three types of roads
    if (road1.getImage() == street) {
      noStroke();
      fill(230, 230, 0);
      circle(150, 440, 20);
    } else if (road1.getImage() == rockRoad) {
      noStroke();
      fill(230, 230, 0);
      circle(300, 440, 20);
    } else if (road1.getImage() == dirt) {
      noStroke();
      fill(230, 230, 0);
      circle(450, 440, 20);
    }
  }

  //The game screen is the active screen
  gameScreen() {
    startBtn.hide();
    instructionsBtn.hide();
    customizeBtn.hide();

    //Draws grass and road
    grass1.draw();
    grass2.draw();
    road1.draw();
    road2.draw();

    //When the car is not crashed
    if (carCrashed == false) {
      carObstacle.changeLane();
      carObstacle.changeType();
      carObstacle.draw();

      //Speeds according to score
      if (score >= 0 && score < 5) {
        grass1.move(5);
        grass2.move(5);
        road1.move(5);
        road2.move(5);
        carObstacle.move(5);
      } else if (score >= 5 && score < 20) {
        grass1.move(7);
        grass2.move(7);
        road1.move(7);
        road2.move(7);
        carObstacle.move(7);
        coneObstacle.move(7);
      } else if (score >= 20 && score < 30) {
        grass1.move(9);
        grass2.move(9);
        road1.move(9);
        road2.move(9);
        carObstacle.move(9);
        coneObstacle.move(9);
      } else if (score >= 30 && score < 40) {
        grass1.move(11);
        grass2.move(11);
        road1.move(11);
        road2.move(11);
        carObstacle.move(11);
        coneObstacle.move(11);
      } else if (score >= 40) {
        grass1.move(13);
        grass2.move(13);
        road1.move(13);
        road2.move(13);
        carObstacle.move(13);
        coneObstacle.move(13);
      }

      if (score >= 5) {
        coneObstacle.determineLane();
        coneObstacle.changeLane();
        coneObstacle.draw();
      }
    }

    car1.draw();

    textFont(headingFont);
    textAlign(CENTER);
    textSize(25);
    fill(0);
    text("Score:\n" + score, 550, 550);
    
    //If the car collides with an obstacle
    if (car1.isTouching(carObstacle) || car1.isTouching(coneObstacle)) {
      carCrashed = true;
      crashSound = true;
    }
    //If the car collides with an obstacle
    if (carCrashed == true) {
      carDriving.stop();
      image(crash, 0, 90); //displays crashed image
      carObstacle.setY(-800);
      if (score >= 5) {
        coneObstacle.setY(-750);
      }
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
    //Plays the crash sound
    if (crashSound == true) {
      carCrashSound.play(); //plays car crash noise
      crashSound = false;
    }
  }

  //Question screen
  questionScreen() {
    background(100, 150, 150);
    textFont(textF);
    textSize(15);
    textAlign(CENTER);
    fill(0);
    //Outputs all the questions and options
    text(questions[questionNumber].getQuestion(), 300, 100);
    optionA.html(questions[questionNumber].getAnswer(1));
    optionB.html(questions[questionNumber].getAnswer(2));
    optionC.html(questions[questionNumber].getAnswer(3));
    optionD.html(questions[questionNumber].getAnswer(4));
    //shows the option buttons
    optionA.show();
    optionB.show();
    optionC.show();
    optionD.show();
  }

  correctScreen() {
    //displays correct or incorrect answer
    background(0, 255, 0);
    textAlign(CENTER);
    textSize(100);
    fill(255);
    textFont(headingFont);
    text("Correct!", 300, 300);
    optionA.hide();
    optionB.hide();
    optionC.hide();
    optionD.hide();
    continueBtn1.show();
  }

  incorrectScreen() {
    //displays correct or incorrect answer
    background(255, 0, 0);
    textAlign(CENTER);
    textSize(100);
    fill(255);
    textFont(headingFont);
    text("Incorrect!", 300, 300);
    optionA.hide();
    optionB.hide();
    optionC.hide();
    optionD.hide();
    continueBtn2.show();
  }

  gameOverScreen() {
    //game over screen
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
}

function keyPressed() {
  if (activeScreen == "game screen" && carCrashed == false) {
    if (keyCode == LEFT_ARROW || key == "a") {
      car1.move("left");
    }
    if (keyCode == RIGHT_ARROW || key == "d") {
      car1.move("right");
    }
  }
  if (activeScreen == "main screen" && key == "m") {
    if (mute) {
      mute = false; //unmutes sound
    } else {
      mute = true; //mutes sound
    }
  }
}

function mousePressed() {
  mouseClick.play(); //sound when user clicks
  if (activeScreen == "customize car screen") {
    //changes car appearance based on which car the user selects
    if (mouseX >= 100 && mouseX <= 200 && mouseY >= 250 && mouseY <= 470) {
      car1.setCar(lamborghini);
    }
    if (mouseX >= 250 && mouseX <= 350 && mouseY >= 250 && mouseY <= 470) {
      car1.setCar(f1);
    }
    if (mouseX >= 400 && mouseX <= 500 && mouseY >= 250 && mouseY <= 470) {
      car1.setCar(redCar);
    }
  }
  if (activeScreen == "customize background screen") {
    //changes background appearance based on which car the user selects
    if (mouseX >= 100 && mouseX <= 200 && mouseY >= 250 && mouseY <= 400) {
      road1.setImage(street);
      road2.setImage(street);
      grass1.setImage(sideWalk);
      grass2.setImage(sideWalk);
    }
    if (mouseX >= 250 && mouseX <= 350 && mouseY >= 250 && mouseY <= 400) {
      road1.setImage(rockRoad);
      road2.setImage(rockRoad);
      grass1.setImage(rocks);
      grass2.setImage(rocks);
    }
    if (mouseX >= 400 && mouseX <= 500 && mouseY >= 250 && mouseY <= 400) {
      road1.setImage(dirt);
      road2.setImage(dirt);
      grass1.setImage(grassBackground);
      grass2.setImage(grassBackground);
    }
  }
  if (
    activeScreen == "game screen" &&
    carCrashed == true &&
    mouseX >= 130 &&
    mouseX <= 460 &&
    mouseY >= 0 &&
    mouseY <= 60
  ) {
    activeScreen = "question screen"; //question screen become active if user clicks after crash
  }
  if (
    activeScreen == "game over screen" &&
    mouseX >= 180 &&
    mouseX <= 420 &&
    mouseY >= 520 &&
    mouseY <= 600
  ) {
    //resets the game
    car1.setX(255);
    carObstacle.setY(-300);
    coneObstacle.setY(-140);
    score = 0;
    carCrashed = false;
    activeScreen = "main screen"; //goes back to main screen
  }
}
