//Create variables here
var  sadDog, happyDog, database, foodS, foodStock,fedTime,lastFed,feed,addFood,foodObject

function preload()
{
  //load images here
  sadDog=loadImage("dogImg.png");
 happyDog=loadImage("dogImg1.png");	
}

function setup() {
  createCanvas(700, 700);
   database=firebase.database();
 dog =createSprite(100,200,20,20);
  dog.addImage(sadDog);
  dog.scale=0.25;
 
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  //buttons both
feed=createButton("Feed the dog");
feed.position(700,95);
feed=(mousePressed(feedDog));
addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  
  drawSprites();
  textSize(20);
  fill("red");
  stroke(4);
  text("NOTE:Press UP_ARROW key to feed the dog", 250, 250)
  //add styles he54
  fill(225,225,245);
  textSize(15);
if(lastFed>12){
text("Last Feed:"+lastFed%12 + "PM",350,30);
  }else if(lastFed===0){
    text("Last Feed:12 AM",350,30);
  }else {
    text("Last Feed:"+ lastFed+"AM",350,30);
  }
  

}

function readStock(data){
    foodS=data.val();
}

function writeStock(x){
if (x<=0){
  x=0;
} else{
  x=x-1;

}
 database.ref("/").update({
   Food:x
 })

}
function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}