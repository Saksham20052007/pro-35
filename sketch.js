var database;
var position;
var balloon, balloonAnimation;
var bagImg; 

function preload(){
  balloonAnimation = loadAnimation("para.png");
  bagImg = loadImage("city.png");


}

function setup() {
  database = firebase.database();
  createCanvas(1600, 800);

  balloon = createSprite(300, 300, 100, 80);
  balloon.scale = 0.5;
  balloon.addAnimation("parachute", balloonAnimation );
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(bagImg);

  if(balloon.scale>0){
  if(keyDown(UP_ARROW)){
    updateHeight(0, -10);
    balloon.scale = balloon.scale - 0.005;
  } 
  if(keyDown(DOWN_ARROW)){
    updateHeight(0, +10);
    balloon.scale = balloon.scale + 0.005;
  }  
     if(keyDown(DOWN_ARROW)){
    updateHeight(-10, 0);
  }   
    if(keyDown(DOWN_ARROW)){
    updateHeight(+10, 0);
  } 
  }
 
  drawSprites();

}

function updateHeight(x, y) {
  database.ref('balloon/height').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError() {
  console.log("error in the code");
}