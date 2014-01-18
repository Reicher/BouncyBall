var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

var dotLineLength = function(x, y, x0, y0, x1, y1, o) {
  function lineLength(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
  }
  if(o && !(o = function(x, y, x0, y0, x1, y1){
    if(!(x1 - x0)) return {x: x0, y: y};
    else if(!(y1 - y0)) return {x: x, y: y0};
    var left, tg = -1 / ((y1 - y0) / (x1 - x0));
    return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * - tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
  }(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))){
    var l1 = lineLength(x, y, x0, y0), l2 = lineLength(x, y, x1, y1);
    return l1 > l2 ? l2 : l1;
  }
  else {
    var a = y0 - y1, b = x1 - x0, c = x0 * y1 - y0 * x1;
    return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
  }
};

function Wall (p1x, p1y, p2x, p2y) {
	this.p1 =  new Array();
	this.p2 =  new Array();

	this.p1x = p1x;
	this.p1y = p1y;
	this.p2x = p2x;
	this.p2y = p2y;	
	
	this.Draw = function () {
		ctx.beginPath();
		ctx.moveTo(this.p1x, this.p1y);
		ctx.lineTo(this.p2x, this.p2y);
		ctx.closePath();
		ctx.stroke();
	};
}

function Ball () {
	this.x = 50;
	this.y = 100;
	this.vx = 70;
	this.vy = 0;
	this.size = 50;
	this.bouncy = 0.75;
	
	this.Draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);  // Cool
		ctx.closePath();
		ctx.stroke();
	};
    	
	this.Update = function () {
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		this.Gravity();
	};
	
	this.Gravity = function ()
	{
		gravConst = 80;
		this.vy += gravConst * dt;
	};
	
	this.CheckForCollision = function (wall) {
		if( dotLineLength(this.x, this.y, wall.p1x, wall.p1y, wall.p2x, wall.p2y, true) < this.size + 1){
			dx = wall.p2x - wall.p1x;
			dy = wall.p2y - wall.p1y;
			
			nx = dy;
			ny = -dx;
			
			// Normalize normals:)
			nx = dy == 0 ? 0 : nx / dy;
			ny = dx == 0 ? 0 : ny / dx;

			this.vx = (this.vx - 2 * (nx * this.vx) * nx) * this.bouncy;
			this.vy = (this.vy - 2 * (ny * this.vy) * ny) * this.bouncy;
		}
	};
}

function Update() {
	myBall.CheckForCollision(aWall);
	myBall.CheckForCollision(anotherWall);
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
	aWall.Draw();
	anotherWall.Draw();

	// Ball
	myBall.Draw();
	
}

var myBall = new Ball();

var aWall = new Wall(50, 500, 700, 500);
var anotherWall = new Wall(700, 500, 800, 300);

// Start the game loop
fps = 30;
interval = 1000 / fps;
dt = 1 / interval;

setInterval(Update, interval);
setInterval(Draw, interval);

// To stop the game, use the following:
//clearInterval(Game._intervalId);

