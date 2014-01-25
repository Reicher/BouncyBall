function Box(pos, size) {
	this.top 	= new Wall( pos, [pos[0]+size[0], pos[1]]); 
	this.right 	= new Wall( [pos[0]+size[0], pos[1]], [pos[0]+size[0], pos[1]+size[1]]  );
	this.bottom 	= new Wall( [pos[0]+size[0], pos[1]+size[1]], [pos[0], pos[1]+size[1]] );
	this.left 	= new Wall( [pos[0], pos[1]+size[1]], pos   );

	this.removeMe = false;

	this.draw = function () {
		this.top.draw();
		this.right.draw();
		this.bottom.draw();
		this.left.draw();
	};
}

