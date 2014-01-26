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

	this.CheckForBoxCollision = function (box){
		if(    this.CheckForCollision(box.top) 
		    || this.CheckForCollision(box.right)
		    || this.CheckForCollision(box.bottom)
		    || this.CheckForCollision(box.left) )
			box.removeMe = true;
	};
	
	this.CheckForCollision = function (wall) {
		// Distance between ball and the wall
		dist = dotLineLength(this.pos[0], this.pos[1], wall.p1[0], wall.p1[1], wall.p2[0], wall.p2[1], true);

		// if collision
		if(dist - this.size <= 0 ){
			if(distance(this.pos, wall.p1) <= dist) // hit an edge
				var normal = [this.pos[0] - wall.p1[0], this.pos[1] - wall.p1[1]];
			else if(distance(this.pos, wall.p2) <= dist) // hit another edge
				var normal = [this.pos[0] - wall.p2[0], this.pos[1] - wall.p2[1]];
			else{
				// Collision with wall
				dx = wall.p2[0] - wall.p1[0];
				dy = wall.p2[1] - wall.p1[1];
			
				var normal = wall.isLeft(this.pos) ? new Array(-dy, dx) : new Array(dy, -dx);
			}	

			// Normalize normal:)
			length = Math.sqrt( Math.pow(normal[0], 2) + Math.pow(normal[1], 2));
			normal[0] =  normal[0]/length;
			normal[1] =  normal[1]/length;

			// Move object out of floor=/
			var intoFloor = dist - this.size;
			//this.pos[0] -= normal[0] * intoFloor;
			//this.pos[1] -= normal[1] * intoFloor;

			var tmp = dotproduct( normal, this.vel );
			this.vel[0] = this.vel[0] - 2 * tmp * normal[0] * this.bouncy;
			this.vel[1] = this.vel[1] - 2 * tmp * normal[1] * this.bouncy;
			return true;
		}
		return false;
	};
}
