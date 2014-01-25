/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

function Update() {
	myBall.CheckForCollision(myWall);
	updateLevel(currentLevel, myBall);
	myBall.Update(dt);
};

function Draw(){
	// Clean screen
	ctx.clearRect(0, 0, c.width, c.height);

	drawLevel(currentLevel);

	// Wall
	myWall.draw();

	// Ball
	myBall.Draw();
}

function updateMousePos(event)
{
	myWall.moveTo([ event.offsetX, 650]);
}

function updateMouseWheel(event)
{
	perTick = Math.PI * 2 / 360 * (event.wheelDelta / 20);
	myWall.rotation += perTick;

	myWall.rotate();
}

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

var myBall = new Ball([300, 400], [0, 30]);
var myWall = new Wall( [350, 550], [450, 550] );
var currentLevel = new Level1();

// Start the game loop
fps = 40;
dt = fps/ 1000;

setInterval(Update, dt);
setInterval(Draw, dt);

c.addEventListener("mousemove", updateMousePos, true);
c.addEventListener("mousewheel", updateMouseWheel, true);

