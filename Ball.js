/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/

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