/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

function Update() {
	myBall.CheckForCollision(myWall);
	for (var i = 0; i < walls.length; i++)
		myBall.CheckForCollision(walls[i]);

	for (var i = 0; i < boxes.length; i++){
		myBall.CheckForCollision(boxes[i].top);
		myBall.CheckForCollision(boxes[i].right);
		myBall.CheckForCollision(boxes[i].bottom);
		myBall.CheckForCollision(boxes[i].left);
	}
	
	myBall.Update(dt);
};

function Draw(){
	// Clean screen
	ctx.clearRect(0, 0, c.width, c.height);

	// Border
	ctx.beginPath();
	ctx.lineWidth="3";
	ctx.strokeStyle="black";
	ctx.rect(0,0, c.width, c.height);
	ctx.stroke();

	// Wall
	myWall.draw();
	for (var i = 0; i < walls.length; i++)
		walls[i].draw();

	// Boxes
	for (var i = 0; i < boxes.length; i++)
		boxes[i].draw();
	
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

var myBall = new Ball();
var myWall = new Wall( [350, 550], [450, 550] );
var walls = [	new Wall( [50, 500],  [700, 550] ), 
		new Wall( [650, 300],   [650, 600] ), 
		new Wall( [100, 100], [100, 600] )];

var boxes = [new Box([200, 200], [100, 50])];


// Start the game loop
fps = 40;
interval = 1000 / fps;
dt = 1 / interval;

setInterval(Update, interval);
setInterval(Draw, interval);

c.addEventListener("mousemove", updateMousePos, true);
c.addEventListener("mousewheel", updateMouseWheel, true);

