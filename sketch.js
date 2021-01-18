var PLAY;
var END;
var gameState="play";
var towerImg;
var tower;
var door;
var doorImg;
var climber;
var climberImg;
var ghost;
var ghostImg;
var  invisibleBlock;

function preload(){
  
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600)
 tower = createSprite(300,300)
 tower.addImage(towerImg);
 tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  
  
  
  
//groups
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
}
function draw(){
  background(0);
  if (gameState==="play"){
    
    
  
  drawSprites();
  
  if(keyDown("left_arrow")){
     ghost.x = ghost.x-3;

     }
  if(keyDown("right_arrow")){
     ghost.x = ghost.x+3;

     }
  
  if(keyDown("space")){
    
    ghost.velocityY=-5;
     }
  
  ghost.velocityY=ghost.velocityY+0.7;
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  

  if(tower.y>400){
     tower.y=300;
      }
   spawnDoors();
  }
  if(gameState==="end"){
    stroke("yellow");
    fill("red")
    textSize(30)
    text("GAME OVER",201,251);
  }
  spookySound.play();

}


  function spawnDoors(){
    
    if(frameCount % 200 === 0){
       
    door=createSprite(200,-50)
    door.addImage(doorImg);
    door.velocityY=1;
    door.x=Math.round(random(120,400));
    door.lifetime=400;
    door.depth=ghost.depth;
    ghost.depth+=1;
    doorGroup.add(door);
      
    climber=createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY=1;
    climber.x=door.x;
    climber.lifetime=400;
    climberGroup.add(climber);
      
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug=true;
    }
  }
  
  
