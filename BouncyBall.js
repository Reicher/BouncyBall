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

function dotproduct(a,b) {
	var n = 0, lim = Math.min(a.length,b.length);
	for (var i = 0; i < lim; i++) n += a[i] * b[i];
	return n;
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
	this.pos = new Array(400, 200);
	this.vel = new Array(70, 50);
	this.size = 50;
	this.bouncy = 0.75;
	
	this.Draw = function () {
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI*2, true);  // Cool
		ctx.closePath();
		ctx.stroke();
	};
    	
	this.Update = function () {
		this.pos[0] += this.vel[0] * dt;
		this.pos[1] += this.vel[1] * dt;
		this.Gravity();
	};
	
	this.Gravity = function ()
	{
		gravConst = 110;
		this.vel[1] += gravConst * dt;
	};
	
	this.CheckForCollision = function (wall) {
		if( dotLineLength(this.pos[0], this.pos[1], wall.p1x, wall.p1y, wall.p2x, wall.p2y, true) < this.size + 1){
			dx = wall.p2x - wall.p1x;
			dy = wall.p2y - wall.p1y;
			
			var normal1 = new Array(dy, -dx);
			var normal2 = new Array(-dy, dx);
			
			// Normalize normals:)
			length = Math.sqrt( Math.pow(normal1[0], 2) + Math.pow(normal1[1], 2));
			normal1[0] =  normal1[0]/length;
			normal1[1] =  normal1[1]/length;

			length = Math.sqrt( Math.pow(normal2[0], 2) + Math.pow(normal2[1], 2));
			normal2[0] =  normal2[0]/length;
			normal2[1] =  normal2[1]/length;

			var tmp = dotproduct( normal2, this.vel );
			this.vel[0] = this.vel[0] - 2 * tmp * normal2[0]; // * this.bouncy;
			this.vel[1] = this.vel[1] - 2 * tmp * normal2[1]; // * this.bouncy;

		}
	};
}

function Update() {
	for (var i = 0; i < walls.length; i++)
		myBall.CheckForCollision(walls[i]);
	

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
	for (var i = 0; i < walls.length; i++)
		walls[i].Draw();
	

	// Ball
	myBall.Draw();
	
}

var myBall = new Ball();
var walls = [	new Wall(50, 500, 700, 500), 
		new Wall(700, 0, 650, 600), 
		new Wall(100, 100, 300, 600)];

// Start the game loop
fps = 30;
interval = 1000 / fps;
dt = 1 / interval;

setInterval(Update, interval);
setInterval(Draw, interval);

// To stop the game, use the following:
//clearInterval(Game._intervalId);

