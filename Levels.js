function drawLevel(level){
	
	if(level.textShownFor < 20){
		ctx.font="60px Georgia";
		ctx.fillStyle="white"
		ctx.fillText(level.levelText,200,300, 200);
		ctx.font="60px Georgia";
		ctx.fillText(level.levelTagline,150,380, 300);
	}else if(level.textShownFor < 30){
		ctx.font="60px Georgia";
		ctx.fillStyle = "rgba(255, 255, 255, " + (30-level.textShownFor)/10 + ")";
		ctx.fillText(level.levelText,200,300, 200);
		ctx.font="60px Georgia";
		ctx.fillText(level.levelTagline,150,380, 300);
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
	level.textShownFor += dt;
	
	if(level.completed || level.gameOver)
		return;

	if(level.boxes.length == 0){
		level.completed = true;
		alert("You won!");
		
		if(levels.length > levelNr+1){
			levelNr++;
			currentLevel = levels[levelNr];
		}
	}
	else if(level.myBalls.length == 1 && level.myBalls[0].pos[1] > 800+level.ballSize){
		level.gameOver = true;
		alert("Game over man!!");
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
	this.myBalls = [ new Ball([300, 400], [0, 30], this.ballSize) ];
	
	this.gameOver = false;
	this.completed = false;
	
	this.textShownFor = 0;
	this.levelText = "Level 1";
	this.levelTagline = "And so it begins..";

	boxWidth = 50;
	boxHeight = 25;	
	this.boxes = [];
	for(var x = 250; x < 350; x+=50)
		for(var y = 100; y <= 200; y+=25)
			this.boxes[this.boxes.length] = new Box([x, y], [boxWidth, boxHeight]);
}

function Level2() {
	this.walls = [	new Wall( [20, 20],  [580, 20] ), 
					new Wall( [20, 20],   [0, 800] ), 
					new Wall( [580, 20], [600, 800] )];
			
	this.ballSize = 20;
	this.myBalls = [ new Ball([300, 400], [0, 30], this.ballSize) ];
	
	this.gameOver = false;
	this.completed = false;
	
	this.textShownFor = 0;
	this.levelText = "Level 2";
	this.levelTagline = "See? More levels!";

	boxWidth = 50;
	boxHeight = 25;	
	this.boxes = [];
	for(var x = 225; x <= 325; x+=50)
		for(var y = 100; y <= 125; y+=25)
			this.boxes[this.boxes.length] = new Box([x, y], [boxWidth, boxHeight]);
}




