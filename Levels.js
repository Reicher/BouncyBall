function drawLevel(level){
	
	if(level.textShownFor < 20){
		ctx.font="60px Georgia";
		ctx.fillStyle="white"
		ctx.fillText(level.levelText,200,300, 200);
		ctx.font="60px Georgia";
		ctx.fillText(level.levelTagline,150,380, 300);
		ctx.font="40px Georgia";
		ctx.fillText("Click to start!",200,600, 200);
	}else if(level.textShownFor < 30){
		ctx.font="60px Georgia";
		ctx.fillStyle = "rgba(255, 255, 255, " + (30-level.textShownFor)/10 + ")";
		ctx.fillText(level.levelText,200,300, 200);
		ctx.font="60px Georgia";
		ctx.fillText(level.levelTagline,150,380, 300);
		ctx.font="40px Georgia";
		ctx.fillText("Click to start!",200,600, 200);
	}
	
	// Walls
	for (var i = 0; i < level.walls.length; i++)
		level.walls[i].draw();

	// Boxes
	for (var i = 0; i < level.boxes.length; i++)
		level.boxes[i].draw();
		
	// Balls
	for (var i = 0; i < level.myBalls.length; i++)
		level.myBalls[i].Draw();
};

function updateLevel(level){
	if(!level.started)
		return;
	
	level.textShownFor += dt;

	if(level.boxes.length == 0){
		if(levels.length > levelNr+1){
			levelNr++;
			currentLevel = levels[levelNr];
		}
		else{
			alert("You won!");
			init();
		}
	}
	else if(level.myBalls.length == 1 && level.myBalls[0].pos[1] > 800+level.ballSize){
		alert("Game over man!!");
		init();
	}

	for (var ball = 0; ball < level.myBalls.length; ball++){
		for (var i = 0; i < level.walls.length; i++)
			level.walls[i].CheckForCollision(level.myBalls[ball]);
	
		for (var i = 0; i < level.boxes.length; i++){
			if(level.boxes[i].CheckForBoxCollision(level.myBalls[ball]))
				break;
	
			if(level.boxes[i].removeMe)
				level.boxes.splice(i, 1);
		}
		
		level.myBalls[ball].Update();
	}
};

////////////////////////// LEVELS ///////////////////////////////////////////
function Level1() {
	this.walls = [	new Wall( [200, 20],  [400, 20] ), 
			new Wall( [200, 20],   [0, 800] ), 
			new Wall( [400, 20], [600, 800] )];
			
	this.ballSize = 20;
	this.myBalls = [ new Ball([300, 420], [0, 40], this.ballSize) ];
	
	this.started = false;
	
	this.textShownFor = 0;
	this.levelText = "Level 1";
	this.levelTagline = "And so it begins..";

	boxWidth = 50;
	boxHeight = 25;	
	this.boxes = [];
	for(var x = 225; x < 375; x+=50)
		for(var y = 100; y <= 200; y+=25)
			if(x != 275)
				this.boxes[this.boxes.length] = new Box([x, y], [boxWidth, boxHeight]);
}

function Level2() {
	this.walls = [	new Wall( [20, 20],  [580, 20] ), 
					new Wall( [20, 20],   [0, 800] ), 
					new Wall( [580, 20], [600, 800] )];
			
	this.ballSize = 20;
	this.myBalls = [ new Ball([300, 420], [0, 40], this.ballSize) ];
	
	this.started = false;
	
	this.textShownFor = 0;
	this.levelText = "Level 2";
	this.levelTagline = "See? More levels!";

	boxWidth = 50;
	boxHeight = 25;	
	this.boxes = [];
	for(var x = 200; x <= 400; x+=50)
		for(var y = 100; y <= 200; y+=25)
			if(x != 300 && y != 150)
				this.boxes[this.boxes.length] = new Box([x, y], [boxWidth, boxHeight]);
}

function Level3() {
	this.walls = [	new Wall( [0, 0],  [600, 0] ), 
					new Wall( [0, 0],   [0, 800] ), 
					new Wall( [600, 0], [600, 800]), 
					new Wall( [100, 600], [500, 600]),
					new Wall( [100, 600], [300, 400]),
					new Wall( [300, 400], [500, 600])];
			
	this.ballSize = 20;
	this.myBalls = [ new Ball([50, 420], [0, 40], this.ballSize) ];
	
	this.started = false;
	
	this.textShownFor = 0;
	this.levelText = "Level 3";
	this.levelTagline = "Buggy as fuck!";

	boxWidth = 50;
	boxHeight = 25;	
	this.boxes = [];
	for(var x = 200; x <= 400; x+=50)
		for(var y = 100; y <= 125; y+=25)
			if(x != 300)
				this.boxes[this.boxes.length] = new Box([x, y], [boxWidth, boxHeight]);
}


