var back, backImage;
var Ghost, ghostImage;
var Door, doorImage;
var invisibleC, climber, climberImage;
var doorGroup, invisibleCGroup, climberGroup, Sound;
var gameState = "play";

function preload(){
  backImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadAnimation("ghost-standing.png","ghost-jumping.png");
  Sound = loadSound("spooky.wav");
}

function setup (){
  createCanvas(600,600);
  
  back = createSprite(300,300);
  back.addImage (backImage);
  back.velocityY = 1;
  Ghost = createSprite(200,200,50,50);
  Ghost.addAnimation("ghost",ghostImage);
  Ghost.scale = 0.45;
  doorGroup = new Group();
  invisibleCGroup = new Group();
  climberGroup = new Group();
  
}

function draw(){
  background(0);

if (gameState==="play"){
  
  if (back.y>400){
    back.y = 300;
  }   
  
  if (keyDown("space")){
    Ghost.velocityY = -4;
  }
  
  if (keyDown("left")){
    Ghost.x -= 4;
  }
  
  if (keyDown("right")){
    Ghost.x += 4;
  }
  
  SpawnDoor();
  
  if (invisibleCGroup.isTouching(Ghost)||Ghost.y>600){
    gameState = "end";
    Ghost.destroy();
  }
  
  if (climberGroup.isTouching(Ghost)){
    Ghost.velocityY=0;
  }
  
  
  drawSprites();
 }
  else if (gameState==="end"){
    stroke("yellow")
    fill("pink");
    textSize(30);
    text("GAME OVER", 200,300);
  }
}

function SpawnDoor(){
  if (frameCount%240===0){
    Door = createSprite(Math.round(random(100,400)),-50);
    Door.addImage(doorImage);
    Door.velocityY = 1;
    Door.lifetime=800;
    doorGroup.add(Door);
    Door.depth=Ghost.depth;
    Ghost.depth+=1;
    
    climber= createSprite(200,10);
    climber.addImage(climberImage);
    climber.x= Door.x;
    climber.velocityY = 1;
    climber.lifetime=800;
    climberGroup.add(climber);
    
    invisibleC = createSprite(200,15);
    invisibleC.width=climber.width
    invisibleC.height=2;
    invisibleC.x = Door.x;
    invisibleC.velocityY = 1;
    invisibleC.lifetime=800;
    invisibleCGroup.add(invisibleC);
    invisibleC.visible=false;
    
  }
  
}