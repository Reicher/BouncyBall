/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

function Ball (pos, vel, size) {
	this.pos = pos;
	this.vel = vel;
	this.size = size;
	this.bouncy = 1.0;
	
	this.pic = new Image();
	this.pic.src = "images/ball1.png";
	
	this.Draw = function () {
		ctx.drawImage(	this.pic, 
						(this.pos[0] - this.size), 
						(this.pos[1] - this.size), 
						this.size*2, 
						this.size*2);
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
