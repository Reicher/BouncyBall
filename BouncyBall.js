/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

function Update() {
	myBall.CheckForCollision(myWall);
	for (var i = 0; i < level.walls.length; i++)
		myBall.CheckForCollision(level.walls[i]);

	for (var i = 0; i < level.boxes.length; i++){
		myBall.CheckForCollision(level.boxes[i].top);
		myBall.CheckForCollision(level.boxes[i].right);
		myBall.CheckForCollision(level.boxes[i].bottom);
		myBall.CheckForCollision(level.boxes[i].left);
	}
	
	myBall.Update(dt);
};

function Draw(){
	// Clean screen
	ctx.clearRect(0, 0, c.width, c.height);

	// Wall
	myWall.draw();
	for (var i = 0; i < level.walls.length; i++)
		level.walls[i].draw();

	// Boxes
	for (var i = 0; i < level.boxes.length; i++)
		level.boxes[i].draw();
	
	// Ball
	myBall.Draw();
}

function updateMousePos(event)
{
	myWall.moveTo([ event.offsetX, event.offsetY]);
}

function updateMouseWheel(event)
{
	perTick = Math.PI * 2 / 360 * (event.wheelDelta / 20);
	myWall.rotation += perTick;

	myWall.rotate();
}

var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

var myBall = new Ball([300, 400], [0, 150]);
var myWall = new Wall( [350, 550], [450, 550] );

var level = new Level1();

// Start the game loop
fps = 30;
interval = 1000 / fps;
dt = 1 / interval;

setInterval(Update, interval);
setInterval(Draw, interval);

c.addEventListener("mousemove", updateMousePos, true);
c.addEventListener("mousewheel", updateMouseWheel, true);

