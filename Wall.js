/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/


function Wall (p1, p2) {
	this.p1 =  p1;
	this.p2 =  p2;

	this.rotation = 0;
	
	this.draw = function () {
		ctx.beginPath();
		ctx.moveTo(this.p1[0], this.p1[1]);
		ctx.lineTo(this.p2[0], this.p2[1]);
		ctx.closePath();
	    ctx.lineWidth = 4;
		ctx.strokeStyle="red";
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

	this.CheckForCollision = function (ball) {
		// Distance between ball and the wall
		dist = dotLineLength(ball.pos[0], ball.pos[1], this.p1[0], this.p1[1], this.p2[0], this.p2[1], true);

		// if collision
		if(dist - ball.size <= 0 ){
			if(distance(ball.pos, this.p1) <= dist) // hit an edge
				var normal = [ball.pos[0] - this.p1[0], ball.pos[1] - this.p1[1]];
			else if(distance(ball.pos, this.p2) <= dist) // hit another edge
				var normal = [ball.pos[0] - this.p2[0], ball.pos[1] - this.p2[1]];
			else{
				// Collision with wall
				dx = this.p2[0] - this.p1[0];
				dy = this.p2[1] - this.p1[1];
			
				var normal = this.isLeft(ball.pos) ? new Array(-dy, dx) : new Array(dy, -dx);
			}	

			// Normalize normal:)
			length = Math.sqrt( Math.pow(normal[0], 2) + Math.pow(normal[1], 2));
			normal[0] =  normal[0]/length;
			normal[1] =  normal[1]/length;

			// Move object out of floor=/
			// works really bad at times.
			var intoFloor = dist - ball.size;
			//ball.pos[0] -= normal[0] * intoFloor;
			//ball.pos[1] -= normal[1] * intoFloor;

			var tmp = dotproduct( normal, ball.vel );
			ball.vel[0] = ball.vel[0] - 2 * tmp * normal[0] * ball.bouncy;
			ball.vel[1] = ball.vel[1] - 2 * tmp * normal[1] * ball.bouncy;
			return true;
		}
		return false;
	};
}

