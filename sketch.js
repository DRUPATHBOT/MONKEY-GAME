//please note the following things:

// 1. The bananas are spawning in random positions within the 80 frames.
// 2. When you collide with the stones in this game the game is over.
// Have fun!
var monkey,monkey_running,moving;
var ground,groundImage;
var banana,bananaImage,bananaGroup;
var obstacle,obstacleImage,obstacleGroup, invisibleGround;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var restart,restartImg;
var gameOver,gameOverImg;
var jump,die;

function preload(){
 monkey_running =          loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  bananaImage = loadImage("banana.png");  
  obstacleImage = loadImage("obstacle.png");  
  groundImage = loadImage("ground2.png");
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  
 
}


function setup() {
  createCanvas(600,600);
  
  
     //this is to help display the survival time text on the canvas. 
  
//creating ground
  ground=createSprite(400,550,900,10);
  ground.x=ground.width/2;
   ground.addImage("ground",groundImage);
  console.log(ground.x);
  
 //creating monkey
  monkey = createSprite(80,545,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating banana & obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  invisibleGround = createSprite(400,555,900,10);
  invisibleGround.visible = false;
  
  restart = createSprite(300,350)
  restart.addImage("restart",restartImg)
  
  gameOver = createSprite(300,250)
  gameOver.addImage("gameOver",gameOverImg)
}


function draw() {
  background("white");
  

  //when we press space the monkey will jump upwards.
  if(keyDown("space")&& monkey.y >= 510)
     {
     monkey.velocityY=-10;
     jump.play();
     }
   
  
  //to help pull the monkey down by gravity so it doesn't stay up.
  monkey.velocityY = monkey.velocityY+0.4;
  //resetting the ground to half it's width.
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
// we are calling our functions up here.
  food();
  spawnRocks();

  if(gamestate===PLAY){
    restart .visible=false;
    gameOver .visible=false;
    
  //scoring
  score = score + Math.round(getFrameRate()/60);
    
  ground.velocityX = -(5 + 3* score/100)
  
    
  
  stroke("white");
  textSize(20);
  fill("black");
  text("score: " +score,350,50);
  
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Banana collected : " + survivalTime,10,50);
  

  if(bananaGroup.isTouching(monkey)){
      
    bananaGroup.destroyEach();
    survivalTime = survivalTime+2;
  }
}
    if (obstacleGroup.isTouching(monkey)) {
     gamestate=END
     jump.play();
     die.play();
     obstacleGroup.destroyEach();
  }
  
  else if(gamestate===END){
   
    ground.velocityX = 0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    restart.visible= true;
    gameOver.visible= true;
    if(keyDown("space")&& monkey.y >= 510)
     {    
     monkey.velocityY=0;
     }}  
  
  if(mousePressedOver(restart)){
    reset(); 
  }
     
// this is used so the monkey can collide with the ground
  monkey.collide( invisibleGround);
  
      

  

  drawSprites();
   
}

function reset(){
  
  gamestate = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;        
  ground.velocityX = -5;
  score = 0;
  survivalTime = 0;
  
}

     
function food(){
  //this is to make sure the banana appears for every 80 frames.
   if(World.frameCount%100==0){
 
  banana = createSprite(600,5,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.1;
  banana.x = Math.round(random(400,500));
  banana.velocityX=-5;
  banana.velocityY= 5
  banana.lifetime=400;

  bananaGroup.add(banana);  
      
  }
}
function spawnRocks(){
  // this is to make sure the obstacle appears after every 300 frames.
  if(World.frameCount%90==0){
    obstacle = createSprite(600,530,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.setCollider("circle",0,0,20)
    obstacle.scale=0.1;
    obstacle.velocityX = -(5 + 3* score/100)
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);

  }
}

