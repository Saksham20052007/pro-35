var database;
var position;
var balloon, balloonAnimation;
var bagImg; 

function preload(){
  balloonAnimation = loadAnimation("parachute.png");
  bagImg = loadImage("city.png");


}

function setup() {
  database = firebase.database();
  createCanvas(800, 400);

  balloon = createSprite(200, 200, 50, 50);
  balloon.addAnimation("parachute", balloonAnimation );
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(bagImg);

  if(keyDown(UP_ARROW)){
    updateHeight(0, -10);
    balloon.scale = balloon.scale - 0.1;
  } 
  if(keyDown(DOWN_ARROW)){
    updateHeight(0, +10);
    balloon.scale = balloon.scale + 0.1;
  }  
     if(keyDown(DOWN_ARROW)){
    updateHeight(-10, 0);
  }   
    if(keyDown(DOWN_ARROW)){
    updateHeight(+10, 0);
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