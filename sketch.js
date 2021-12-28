var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var obstacle,obstaclesGroup;
var score=0

var play=1;
var end=0;
var gamestate=play;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 obstacle1=loadImage("obstacle1.png")
 obstacle2=loadImage("obstacle2.png")
 obstacle3=loadImage("obstacle3.png")
 obstacle4=loadImage("obstacle4.png")
 obstacle5=loadImage("obstacle5.png")
 obstacle6=loadImage("obstacle6.png")

}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  
console.log(random(5,100))
console.log(Math.round(random(5,100)))
  
}

function draw() {
  //to clear the screen and give it color
  background(255);    

  //displaying the score
  text("Score:"+score,500,50)

  if(gamestate===play){
   //calcuting the score
   score=score+Math.round(frameCount/240)

   //giving a moving ground towards the left
   ground.velocityX=-4

   //If key pressed trex jumps 
    if(keyDown("space") && trex.y>=140) {
      trex.velocityY = -10;
    }
   //gravity
   trex.velocityY = trex.velocityY + 0.8  
   
   //ground infinite
   if (ground.x < 0){
     ground.x = ground.width/2;
   }

    //spawn the clouds
    spawnClouds();
    spawnObstacles();
    
    if(trex.isTouching(obstaclesGroup)){
        gamestate=end
    }
  }

  else if(gamestate===end){
    //stoping the ground
    ground.velocityX=0
    //stoping th cloud
    cloudsGroup.setVelocityXEach(0)
    //stoping the obstacles
    obstaclesGroup.setVelocityXEach(0)
  }

  //so it doesnt go below ground
  trex.collide(invisibleGround);
  
  
  drawSprites();
}
           

//create function spawn clouds
function spawnClouds(){
  //creating clouds at a intervel of 60 fps
  //mod or modulus(%) is usec to find the remainder
  if(frameCount%60===0){
    cloud=createSprite(600,100)
    //add image to the cloud sprite
    cloud.addImage("cloud",cloudImage)
    cloud.velocityX= -4;
    //reduce the size of the clouds
    cloud.scale=0.5
    //make the y position random
    cloud.y=Math.round(random(5,100))
    //to make the trex ahead of the cloud
    trex.depth=cloud.depth
    trex.depth+=1
    cloud.lifetime=150

    //put in clouds together in a group
    cloudsGroup.add(cloud)
  }
}

function spawnObstacles(){
  if(frameCount%60===0){
    obstacle=createSprite(600,160)
    obstacle.velocityX= -4;
    var number= Math.round(random(1,6)) 
    obstacle.scale=0.6
    obstacle.lifetime=150

    //creating a switch to choose the obstacle image randomly
    switch(number){
      case 1:obstacle.addImage(obstacle1)
      break;
      case 2:obstacle.addImage(obstacle2)
      break;
      case 3:obstacle.addImage(obstacle3)
      break;
      case 4:obstacle.addImage(obstacle4)
      break;
      case 5:obstacle.addImage(obstacle5)
      break;
      case 6:obstacle.addImage(obstacle6)
      break;
      default:break;
    }
    obstaclesGroup.add(obstacle)
  }
}



//memory leak happens when things occupy unnecessary space computers memory

//to prevent this either destry sprite or add lifetime

//trex still running

//trex doesnt come back at the end

//clouds and obstacles disappear after a certain time