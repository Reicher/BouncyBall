/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

function Update() {
	
	for (var i = 0; i < currentLevel.myBalls.length; i++)
		myWall.CheckForCollision(currentLevel.myBalls[i]);
		
	updateLevel(currentLevel);
};

function Draw(){
	// Draw background
	ctx.drawImage(background,0, 0, c.width, c.height);

	drawLevel(currentLevel);

	// Wall
	myWall.draw();

}

function updateMousePos(event)
{
	myWall.moveTo([ event.offsetX, 750]);
}

function updateMouseWheel(event)
{
	perTick = Math.PI * 2 / 360 * (event.wheelDelta / 20);
	myWall.rotation += perTick;

	myWall.rotate();
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
fps = 40;
dt = fps/ 1000;

setInterval(Update, dt);
setInterval(Draw, dt);

c.addEventListener("mousemove", updateMousePos, true);
c.addEventListener("mousewheel", updateMouseWheel, true);

