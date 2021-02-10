var bg,bgImg;
var bob, bobImg;
var eyebob,eyebobImg;
var Ground;
var bubblebass,bubblebassImg;
var dirtybubble,dirtybubbleImg;
var dutchman,dutchmanImg;
var gameover, gameoverImg;
var jelly,jellyImg;
var karen,karenImg;
var logo, logoImg;
var plankton, planktonImg;
var reset, resetImg;
var squid, squidImg;
var start,startImg;
var gameState=PLAY;
var PLAY=1;
var END=0;
var score=0;
var villainsGroup;


function preload (){
  bgImg=loadImage("background.png");
  eyebobImg=loadImage("bob4.png");
  bobImg=loadImage("bob3.png");
  bubblebassImg=loadImage("bubblebass.png");
  dirtybubbleImg=loadImage("dirtybubble.png");
  dutchmanImg=loadImage("dutchman.png");
  gameoverImg=loadImage("gameover.jpeg");
  jellyImg=loadImage("jellyfish.png");
  karenImg=loadImage("karen.png");
  logoImg=loadImage("logo.png");
  planktonImg=loadImage("plankton.png");
  resetImg=loadImage("reset.png");
  squidImg=loadImage("squidward.png");
  startImg=loadImage("start.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);
bg=createSprite(30,350,windowWidth*2,windowHeight);
bg.addImage(bgImg);
bg.scale=2;
bg.x=bg.width/2;
bgvelocityX=-9;

bob=createSprite(150,580,30,60);
bob.addImage("RUNNING",bobImg);
bob.scale=0.4;
bob.setCollider("circle",0,40,200);
bob.debug=true;

Ground=createSprite(150,700,windowWidth,10);
Ground.visible= true;
Ground.x=Ground.width/2;
Ground.debug= true;
//Ground.velocityX=-5;

logo=createSprite(680,250,80,80);
logo.addImage(logoImg);
logo.scale=0.4;

start=createSprite(700,460,60,60);
start.addImage(startImg);
start.scale=0.4;

gameover=createSprite(680,250,40,40);
gameover.addImage(gameoverImg)
gameover.scale=0.2;
gameover.visible=false;

reset=createSprite(700,450,60,60);
reset.addImage(resetImg);
reset.scale=0.3;
reset.visible=false;
villainsGroup=new Group();
score=0;

}

function draw(){
 //background("black");

 
  if (mousePressedOver(start)){
    gameState=PLAY;
    start.visible=false;
    logo.visible=false;
    bob.velocityY=-20;
  }
  

if (gameState===PLAY){
  
  score=score+Math.round(getFrameRate()/60);
  Ground.velocityX=-3;
  
  if(bg.x<0){  
    bg.x=bg.width/2;
    }
  bg.velocityX=-9;
  
  if(Ground.x<0){  
    Ground.x=Ground.width/2;
    }
 
if (touches.length>0||keyDown("space") && bob.y>=250){
bob.velocityY=-20;
touches=[];
}
bob.velocityY=bob.velocityY+1.5;

bob.collide(Ground);
if (villainsGroup.isTouching(bob)|| bob.isTouching(Ground)){
  gameState=END;
}

villains();

}

else if (gameState===END){
  bob.x=150;
  bob.y=580;
  gameover.visible=true;
  reset.visible=true;
  bob.velocityX=0;
  bob.velocityY=0;
  Ground.velocityX=0;
  bg.velocityX=0;
  villainsGroup.setVelocityXEach(0);
  villainsGroup.setVelocityYEach(0);
  villainsGroup.destroyEach();
}
if (touches.length>0 || mousePressedOver(reset)){
  restart()
  touches=[];

}
bob.collide(Ground);

drawSprites();

textSize(25);
 fill("black");
 text("SCORE: "+score,windowWidth-280,40);

}
function restart(){
  gameState=PLAY;
  gameover.visible=false;
  reset.visible=false;
  score=0;
  bob.x=150;
  bob.y=580;
  

}
function villains(){
  if (frameCount%100 === 0)
  {
    var villain=createSprite(1150,600,30,30);
    villain.velocityX=-6
    rand=Math.round(random(1,7));

    switch (rand){
      case 1: villain.addImage(bubblebassImg);
      villain.scale=0.3;
      break;;
      case 2: villain.addImage(dirtybubbleImg);
      villain.scale=0.3;
      break;
      case 3: villain.addImage(dutchmanImg);
      villain.scale=0.6;
      break;
      case 4: villain.addImage(jellyImg);
      villain.scale=0.4;
      break;
      case 5: villain.addImage(karenImg);
      villain.scale=0.6;
      break;
      case 6: villain.addImage(planktonImg);
      villain.scale=0.2;
      break;
      case 7: villain.addImage(squidImg);
      villain.scale=0.3;
      break;
    }
  villainsGroup.add(villain);

  }

}