/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

// YUK, not my work
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

function rotate_point( around, angle, point)
{
	s_thing = Math.sin(angle);
	c_thing = Math.cos(angle);

	// translate point back to origin:
	point[0] -= around[0];
	point[1] -= around[1];

	// rotate point
	xnew = point[0] * c_thing + point[1] * s_thing;
	ynew = point[0] * s_thing - point[1] * c_thing;

	// translate point back:
	point[0] = xnew + around[0];
	point[1] = ynew + around[1];

	return point;
};

function Wall (p1, p2) {
	this.p1 =  p1;
	this.p2 =  p2;

	this.rotation = 0;
	
	this.Draw = function () {
		ctx.beginPath();
		ctx.moveTo(this.p1[0], this.p1[1]);
		ctx.lineTo(this.p2[0], this.p2[1]);
		ctx.closePath();
		ctx.stroke();
	};

	this.rotate = function(){
		var mid = [ (this.p1[0] + this.p2[0]) / 2, (this.p1[1] + this.p2[1]) / 2 ];
		this.p1 = [ mid[0] - 50, mid[1] ];
		this.p2 = [ mid[0] + 50, mid[1] ];
		this.p1 = rotate_point(mid, this.rotation, this.p1);
		this.p2 = rotate_point(mid, this.rotation, this.p2);
	};

	this.moveTo = function(pos){
		this.p1 = [ pos[0] - 50, pos[1] ];
		this.p2 = [ pos[0] + 50, pos[1] ];

		this.rotate();
	};

	this.isLeft = function(p){
     		return ((p2[0] - p1[0]) * (p[1] - p1[1]) - (p2[1] - p1[1]) * (p[0] - p1[0])) > 0;
	};
}

function Ball () {
	this.pos = new Array(400, 200);
	this.vel = new Array(100, -70);
	this.size = 50;
	this.bouncy = 0.8;
	
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
		gravConst = 160;
		this.vel[1] += gravConst * dt;
	};
	
	this.CheckForCollision = function (wall) {
		dist = dotLineLength(this.pos[0], this.pos[1], wall.p1[0], wall.p1[1], wall.p2[0], wall.p2[1], true) 
			- this.size;
		if(dist <= 0 ){
			dx = wall.p2[0] - wall.p1[0];
			dy = wall.p2[1] - wall.p1[1];
			
			var normal = wall.isLeft(this.pos) ? new Array(-dy, dx) : new Array(dy, -dx);
			
			// Normalize normal:)
			length = Math.sqrt( Math.pow(normal[0], 2) + Math.pow(normal[1], 2));
			normal[0] =  normal[0]/length;
			normal[1] =  normal[1]/length;

			// Correct position
			this.pos[0] += normal[0] * Math.abs(dist);
			this.pos[1] += normal[1] * Math.abs(dist);

			var tmp = dotproduct( normal, this.vel );
			this.vel[0] = this.vel[0] - 2 * tmp * normal[0] * this.bouncy;
			this.vel[1] = this.vel[1] - 2 * tmp * normal[1] * this.bouncy;

		}
	};
}

function Update() {
	myBall.CheckForCollision(myWall);
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
	myWall.Draw();
	for (var i = 0; i < walls.length; i++)
		walls[i].Draw();
	
	// Ball
	myBall.Draw();
}

function updateMousePos(event)
{
	myWall.moveTo([event.x, event.y -50]);
}

function updateMouseWheel(event)
{
	perTick = Math.PI * 2 / 360 * (event.wheelDelta / 20);
	myWall.rotation += perTick;

	myWall.rotate();
}

var c=document.getElementById("myCanvas");
document.body.style.overflowY = "hidden";​
var ctx=c.getContext("2d");

var myBall = new Ball();
var myWall = new Wall( [350, 550], [450, 550] );
var walls = [	new Wall( [50, 500],  [700, 550] ), 
		new Wall( [700, 0],   [650, 600] ), 
		new Wall( [100, 100], [100, 600] )];

// Start the game loop
fps = 30;
interval = 1000 / fps;
dt = 1 / interval;

setInterval(Update, interval);
setInterval(Draw, interval);

c.addEventListener("mousemove", updateMousePos, true);
c.addEventListener("mousewheel", updateMouseWheel, true);


// To stop the game, use the following:
//clearInterval(Game._intervalId);

