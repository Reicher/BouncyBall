/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

function Update() {
	
	for (var i = 0; i < currentLevel.myBalls.length; i++)
		myWall.CheckForCollision(currentLevel.myBalls[i]);
		
	updateLevel(currentLevel);
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
	myWall.moveTo([ event.offsetX, 750]);
}

function updateMouseWheel(event){
	perTick = Math.PI * 2 / 360 * (event.wheelDelta / 20);
	myWall.rotation += perTick;

	myWall.rotate();
}

function mousePressed(event){
	if(!GameOn)
		setInterval(Update, dt);
		
	GameOn = true;
}

function drawSplash(){
	ctx.fillStyle = "black"
	ctx.rect(0,0,c.width,c.height);
	ctx.fill();
	
	ctx.font="70px Georgia";
	ctx.fillStyle="white"
	ctx.fillText("BOUNCY BALLS",200,300, 200);
	
	ctx.font="40px Georgia";
	ctx.fillText("by Robin Reicher",200,400, 200);
	
	ctx.font="60px Georgia";
	ctx.fillText("Click to start!",200,600, 200);
}

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
background = new Image();
background.src = "images/space.jpg";

var myWall = new Wall( [250, 750], [350, 750] );
var levels = [ new Level1(), new Level2(), Level3];
var levelNr = 0;
var currentLevel = levels[levelNr];

// Start the game loop
var GameOn = false;
fps = 40;
dt = fps/ 1000;

setInterval(Draw, dt);

c.addEventListener("mousemove", updateMousePos, true);
c.addEventListener("mousewheel", updateMouseWheel, true);
c.addEventListener("mousedown", mousePressed, true);

