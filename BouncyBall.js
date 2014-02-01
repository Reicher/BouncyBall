/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

function Update() {
	if(!GameOn)
		return;
	
	for (var i = 0; i < currentLevel.myBalls.length; i++)
		myWall.CheckForCollision(currentLevel.myBalls[i]);
		
	updateLevel(currentLevel);
	
	myWall.update();
};

function Draw(){
	
	// If game have not started
	if(!GameOn){
		drawSplash();
		return;	
	}
		
	// Draw background
	ctx.drawImage(background,0, 0, c.width, c.height);

	drawLevel(currentLevel);

	// Wall
	myWall.draw();

}

function updateMousePos(event){
	if(!GameOn)
		return;
		
	myWall.moveTo([ event.offsetX, 750]);
}

function updateMouseWheel(event){
	if(!GameOn)
		return;
	
	perTick = Math.PI * 2 / 360 * (event.wheelDelta / 20);
	myWall.rotation += perTick;

	myWall.rotate();
}

function mousePressed(event){
	if(!GameOn){
		GameOn = true;
		return;	
	}
		
	if(!currentLevel.started)
		currentLevel.started = true;
}

function drawSplash(){
	ctx.fillStyle = "black"
	ctx.rect(0,0,c.width,c.height);
	ctx.fill();
	
	ctx.font="90px Georgia";
	ctx.fillStyle="red"
	ctx.fillText("BOUNCY BALLS",200,200, 200);
	
	ctx.font="35px Georgia";
	ctx.fillText("by Robin Reicher",200,300, 200);
	
	ctx.font="60px Georgia";
	ctx.fillText("Click to start!",200,600, 200);
}

function init(){
	myWall = new Wall( [250, 750], [350, 750] );
	levels = [ new Level1(), new Level2(), new Level3(), new Level4()];
 	levelNr = 0;
	currentLevel = levels[levelNr];
	GameOn = false;
}

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
background = new Image();
background.src = "images/space.jpg";

var myWall;
var levels;
var levelNr;
var currentLevel;
var gameIntervalId;

// Start the game loop
var GameOn;
fps = 40;
dt = fps/ 1000;

init();
setInterval(Draw, dt);
setInterval(Update, dt);

c.addEventListener("mousemove", updateMousePos, true);
c.addEventListener("mousewheel", updateMouseWheel, true);
c.addEventListener("mousedown", mousePressed, true);

