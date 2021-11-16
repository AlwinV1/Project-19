var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var spookySound;
var distance = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  spookySound.loop();

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  //invisibleBlock.debug = true;
}

function draw() {
  background("tower");
  
//Adding score/getFrameRate()
textSize(20);
  text("Distance: "+ distance,400,30);
    
   distance = distance + Math.round(getFrameRate()/60);
   tower.velocityY = -(6 + 2*distance/150);


if(keyDown("left_arrow")) {
  ghost.x = ghost.x - 3;
}

if(keyDown("right_arrow")) {
  ghost.x = ghost.x + 3;
}

if(keyDown("space")) {
  ghost.velocityY = -4;
}

ghost.velocityY = ghost.velocityY+0.8;

if(climbersGroup.isTouching(ghost)) {
  ghost.velocityY = 0;
}

spawnDoors();

if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
  ghost.destroy();
  gameState = "end";
}

}

   if(gameState === "end") {
    textSize(30);
    text("GAME OVER", 230,250);
  }

  drawSprites();


function spawnDoors() {

if(frameCount % 350 === 0) {
  door = createSprite(200,-50);
  door.addImage("door", doorImg);
  door.velocityY = 1;

  climber = createSprite(200,10);
  climber.addImage("climber", climberImg);
  climber.velocityY = 1;

  invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 3;
  invisibleBlock.velocityY = 1;

  door.x = Math.round(random(110,450));
  climber.x = door.x;

  invisibleBlock.x = door.x;

  door.lifetime = 800;
  climber.lifetime = 800;

  doorsGroup.add(door);
  climbersGroup.add(climber);
  invisibleBlockGroup.add(invisibleBlock);

  ghost.depth = door.depth;
  ghost.depth = ghost.depth+1;
}

}