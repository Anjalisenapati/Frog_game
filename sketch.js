var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadAnimation("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
   ocean = createSprite(300,40);
  
  ocean.velocityY = 2;
  ocean.addImage("ocean",oceanImg);
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addAnimation("frog", frogImg);  
  
  //create coin group and climber group
  coinGroup = new Group();
  climbersGroup = new Group();

  
  
}

function draw(){
  background("white");

  drawSprites();

    
  if (gameState === "play") {

    
   textSize=(40);
   stroke("red");
   text("SCORE:   "+ score,250,30);
  //console.log(ocean.y);
    if(ocean.y>300){
      ocean.y=250;
    }
    //ocean.debug=true;

    if(frog.isTouching(coinGroup)){
      score ++;
      coinGroup.destroyEach();

    }

     if(frog.isTouching(climbersGroup)){
      
     frog.velocityY = 0;
      
    }



    //control using space key
    if (keyDown("space")){
      frog.y=frog.y-2;
    }else {
      frog.y=frog.y+2;
    }
    
    //control using arrow keys
    if (keyDown("right")){
      frog.x=frog.x+2;
    }
    if(keyDown("left")) {
      frog.x=frog.x-2;
    }


    if(frog.y>475){
      gameState="end";
     }

    spawnCoin();
  
    
  }
  
  if (gameState === "end"){
    textSize=(100);
    fill("yellow");
    text("GAME OVER",230,225);
    
    ocean.velocityY=0; 

    coinGroup.destroyEach();
    climbersGroup.destroyEach();
   
  }

 // drawSprites();

}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    //make the x position of the coin and climber the same

     coin = createSprite(Math.round(random(150,400)),50,30,30);
     coin.addImage("coin",coinImg);
     coin.scale=0.1;
     coin.setCollider("circle",0,0,2);
     coin.velocityY=2;
     coin.lifetime = 260;
     coinGroup.add(coin);
     coin.debug = true;


     climber = createSprite(coin.x,110,50,30);
     climber.addImage("climber",climberImg);
     climber.scale=0.5;
     climber.velocityY=2;
     climber.lifetime = 260;
     climbersGroup.add(climber);


     
       
  }
}

