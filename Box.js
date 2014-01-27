function Box(pos, size) {
	this.pos = pos;
	this.size = size;
	
	this.top 	= new Wall( pos, [pos[0]+size[0], pos[1]]); 
	this.right 	= new Wall( [pos[0]+size[0], pos[1]], [pos[0]+size[0], pos[1]+size[1]]  );
	this.bottom 	= new Wall( [pos[0]+size[0], pos[1]+size[1]], [pos[0], pos[1]+size[1]] );
	this.left 	= new Wall( [pos[0], pos[1]+size[1]], pos   );

	this.mid = [ pos[0] + size[0]/2, pos[1] + size[1]/2];
	
	// A box can have a radius if it wants to (this.top.pos[0] can be any point in the box)
	this.radius = distance(this.mid, this.top.p1); 

	this.removeMe = false;

	this.checkMe = function(ball){
		dist = distance(ball.pos, this.mid);
		return (dist - ball.size - this.radius) <= 0;
	};

	this.CheckForBoxCollision = function (ball){
		if( !this.checkMe(ball) )
			return false;

		if(    this.top.CheckForCollision(ball) 
		    || this.right.CheckForCollision(ball)
		    || this.bottom.CheckForCollision(ball)
		    || this.left.CheckForCollision(ball) ){
				this.removeMe = true;	
				return true;
			}
			
	};

	this.draw = function () {		
	ctx.beginPath();
	ctx.rect(this.pos[0],this.pos[1], this.size[0], this.size[1]);
	ctx.fillStyle = 'yellow';
	ctx.fill();
	ctx.lineWidth = 7;
	ctx.strokeStyle = 'black';
	ctx.stroke();
	};
}

