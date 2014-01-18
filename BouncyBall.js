var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

function Ball () {
	this.x = 400;
	this.y = 300;
	this.vx = 20;
	this.vy = 0;
	
	this.Draw = function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 50, 0, Math.PI*2, true);  // Cool
		ctx.closePath();
		ctx.fill();
	};
    	
	this.Update = function () {
		this.x += this.vx * dt;
		this.y += this.vy * dt;
	}
}

function Update(dt) {
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

	// Ball
	myBall.Draw();
}

var myBall = new Ball();

// Start the game loop
fps = 30;
interval = 1000 / fps;
dt = 1 / interval;

setInterval(Update, interval);
setInterval(Draw, interval);

// To stop the game, use the following:
//clearInterval(Game._intervalId);

