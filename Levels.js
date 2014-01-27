function drawLevel(level){
	// Walls
	for (var i = 0; i < level.walls.length; i++)
		level.walls[i].draw();

	// Boxes
	for (var i = 0; i < level.boxes.length; i++)
		level.boxes[i].draw();
};

function updateLevel(level, ball){
	if(level.completed || level.gameOver)
		return;

	if(level.boxes.length == 0){
		level.completed = true;
		ball.vel = [0, 0];
		alert("You won!");
	}
	else if(ball.pos[1] > 800+ball.size){
		level.gameOver = true;
		alert("Game over man!!");
	}

	for (var i = 0; i < level.walls.length; i++)
		level.walls[i].CheckForCollision(ball);

	for (var i = 0; i < level.boxes.length; i++){
		if(level.boxes[i].CheckForBoxCollision(ball))
			break;

		if(level.boxes[i].removeMe)
			level.boxes.splice(i, 1);
	}
};

////////////////////////// LEVELS ///////////////////////////////////////////
function Level1() {
	this.walls = [	new Wall( [20, 20],  [580, 20] ), 
			new Wall( [20, 20],   [0, 800] ), 
			new Wall( [580, 20], [600, 800] )];

	this.gameOver = false;
	this.completed = false;

	boxWidth = 50;
	boxHeight = 25;	
	this.boxes = [];
	for(var x = 125; x <= 425; x+=50)
		for(var y = 100; y <= 200; y+=25)
			this.boxes[this.boxes.length] = new Box([x, y], [boxWidth, boxHeight]);
}





