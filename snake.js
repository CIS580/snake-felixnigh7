/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();

var snake = [];
snake[0] = {x: 30, y: 30};
var score = 0;
var foodX;
var foodY;
var ateFood = false;
var spawnFood = false;
var i;
var gameOver = false;




var input = {
  up: false,
  down: false,
  left: false,
  right: true
}

window.onkeydown = function(event) {
  event.preventDefault();
  console.log(event);
  switch(event.keyCode) {
     //up
    case 38:
    case 87:
      if(input.down == false) {
        input.up = true;
        input.left = false;
        input.right = false;
        input.down = false;
      }
      break;
    //left
    case 37:
    case 65:
    if(input.right == false) {
      input.up = false;
      input.left = true;
      input.right = false;
      input.down = false;
    }
    break;
    //right
    case 39:
    case 68:
    if(input.left == false) {
      input.up = false;
      input.left = false;
      input.right = true;
      input.down = false;
    }
      break;
    //down
    case 40:
    case 83:
    if(input.up == false) {
      input.up = false;
      input.left = false;
      input.right = false;
      input.down = true;
    }
      break;
  }
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  if(gameOver == false) {
    var elapsedTime = newTime - oldTime;
    oldTime = newTime;
    update(elapsedTime);
    render(elapsedTime);

    // Flip the back buffer
    frontCtx.drawImage(backBuffer, 0, 0);

    // Run the next loop
    window.requestAnimationFrame(loop);
  }
  //else game's over.
}

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {

  // TODO: Spawn an apple periodically
  if(spawnFood == false) {
    foodX = Math.floor(Math.random() * (backBuffer.width - 30));
    foodY = Math.floor(Math.random() * (backBuffer.height - 30));
    
    spawnFood = true;
    ateFood = false;

  }
  // TODO: Grow the snake periodically
  if(ateFood) {
	spawnFood = false;
	score += 10;
	
	snake[snake.length] = {x: snake[snake.length - 1].x, y: snake[snake.length - 1].y}
  }
  // TODO: Move the snake
  if(input.up || input.down || input.right || input.left) {
    for(i = snake.length - 1; i > 0; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    }
    
    if(input.up) {
      snake[0].y -= 4;
    }
    
    else if(input.left) {
      snake[0].x -= 4;
    }
	
    else if(input.right) {
      snake[0].x += 4;
    }
	
	else if(input.down) {
      snake[0].y += 4;
    }
  }
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  if(snake[0].x < 0 || (snake[0].x + 30) > backBuffer.width || snake[0].y < 0 || (snake[0].y + 30) > backBuffer.height) {
    gameOver = true;
  }
  // TODO: Determine if the snake has eaten an apple
  if(snake[0].x < foodX + 30 && snake[0].x + 30 > foodX && snake[0].y < foodY + 30 && 30 + snake[0].y > foodY) {
    ateFood = true;
  }
  // TODO: Determine if the snake has eaten its tail
  for(i = 1; i < snake.length; i++) {
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      gameOver = true;
    }
  }
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle

}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
	console.log(event);
  //backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  backCtx.fillStyle = "White";
  backCtx.fillRect(0, 0, backBuffer.width, backBuffer.height);
  backCtx.fillStyle = "Black";
  backCtx.font = "30px Arial";
  backCtx.fillText("Score: " + score, backBuffer.width/2, 20);

  if(gameOver) {
	
	
	backCtx.fillStyle = "Black";
    backCtx.font = "bold 100px Arial";
    backCtx.fillText("Game Over!", backBuffer.width/2, backBuffer.height/2);
  }
  backCtx.fillStyle = "Green";
  for(i = 0; i < snake.length; i++) {
    backCtx.fillRect(snake[i].x, snake[i].y, 30, 30);
  }

  if(spawnFood  == true && ateFood == false) {
    backCtx.fillStyle = "Red";
    backCtx.fillRect(foodX, foodY, 30, 30);
  }

  
}

/* Launch the game */
window.requestAnimationFrame(loop);
