/* By Robin Reicher!
May or may not work in firefox and older ie broswers
*/


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

