/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

function Ball (pos, vel) {
	this.pos = pos;
	this.vel = vel;
	this.size = 20;
	this.bouncy = 1.0;
	
	this.Draw = function () {
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI*2, true);  // Cool
		ctx.closePath();
		ctx.stroke();
	};
    	
	this.Update = function () {
		this.pos[0] += this.vel[0] * dt;
		this.pos[1] += this.vel[1] * dt;
		//this.Gravity();
	};
	
	this.Gravity = function ()
	{
		gravConst = 160;
		this.vel[1] += gravConst * dt;
	};
}
