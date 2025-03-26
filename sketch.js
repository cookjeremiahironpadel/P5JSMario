// P5JS Mario-like Endless Runner
let mario;
let obstacles = [];
let grounds = [];
let clouds = [];
let coins = [];
let gameSpeed = 5;
let score = 0;
let isGameOver = false;

// Preload assets
function setup() {
  createCanvas(800, 400);
  setupGame();
}

function setupGame() {
  mario = new Mario();
  obstacles = [];
  coins = [];
  clouds = [];
  grounds = [];
  score = 0;
  isGameOver = false;
  gameSpeed = 5;
  
  // Create initial ground pieces
  for (let i = 0; i < width + 100; i += 50) {
    grounds.push(new Ground(i, height - 20));
  }
  
  // Create some initial clouds
  for (let i = 0; i < 3; i++) {
    clouds.push(new Cloud(random(width), random(50, 150)));
  }
}

function draw() {
  // Sky blue background
  background(92, 148, 252);
  
  // Game logic
  if (!isGameOver) {
    // Spawn new obstacles
    if (frameCount % 100 === 0) {
      obstacles.push(new Obstacle(width, height - 70));
    }
    
    // Spawn new coins
    if (frameCount % 80 === 0) {
      coins.push(new Coin(width, random(height - 150, height - 100)));
    }
    
    // Spawn new clouds
    if (frameCount % 120 === 0) {
      clouds.push(new Cloud(width, random(50, 150)));
    }
    
    // Add new ground pieces as needed
    if (frameCount % 10 === 0) {
      grounds.push(new Ground(width, height - 20));
    }
    
    // Check for keyboard input
    handleKeyboard();
    
    // Update and remove off-screen objects
    updateObjects();
    
    // Check collisions
    checkCollisions();
    
    // Slowly increase game speed
    if (frameCount % 500 === 0) {
      gameSpeed += 0.5;
    }
  }
  
  // Draw all game elements
  drawObjects();
  
  // Draw score
  fill(255);
  textSize(24);
  textAlign(LEFT);
  text('Score: ' + score, 20, 30);
  
  // Game over screen
  if (isGameOver) {
    textAlign(CENTER);
    textSize(32);
    fill(255, 0, 0);
    text('Game Over', width/2, height/2);
    textSize(24);
    fill(255);
    text('Press SPACE to restart', width/2, height/2 + 40);
  }
}

function handleKeyboard() {
  // Left and right movement
  if (keyIsDown(LEFT_ARROW)) {
    mario.moveLeft();
  }
  if (keyIsDown(RIGHT_ARROW)) {
    mario.moveRight();
  }
}

function updateObjects() {
  // Update Mario
  mario.update();
  
  // Update and filter obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    if (obstacles[i].isOffScreen()) {
      obstacles.splice(i, 1);
    }
  }
  
  // Update and filter coins
  for (let i = coins.length - 1; i >= 0; i--) {
    coins[i].update();
    if (coins[i].isOffScreen()) {
      coins.splice(i, 1);
    }
  }
  
  // Update and filter clouds
  for (let i = clouds.length - 1; i >= 0; i--) {
    clouds[i].update();
    if (clouds[i].isOffScreen()) {
      clouds.splice(i, 1);
    }
  }
  
  // Update and filter ground pieces
  for (let i = grounds.length - 1; i >= 0; i--) {
    grounds[i].update();
    if (grounds[i].isOffScreen()) {
      grounds.splice(i, 1);
    }
  }
}

function drawObjects() {
  // Draw clouds
  clouds.forEach(cloud => cloud.display());
  
  // Draw ground
  grounds.forEach(ground => ground.display());
  
  // Draw coins
  coins.forEach(coin => coin.display());
  
  // Draw obstacles
  obstacles.forEach(obstacle => obstacle.display());
  
  // Draw Mario
  mario.display();
}

function checkCollisions() {
  // Check for coin collisions
  for (let i = coins.length - 1; i >= 0; i--) {
    if (mario.collidesWith(coins[i])) {
      score += 10;
      coins.splice(i, 1);
    }
  }
  
  // Check for obstacle collisions
  for (let i = obstacles.length - 1; i >= 0; i--) {
    if (mario.collidesWith(obstacles[i])) {
      // Only die if it's a goomba, otherwise just bump
      if (obstacles[i].isGoomba) {
        gameOver();
      } else {
        // Bump into pipe - push Mario back
        mario.bumpIntoPipe(obstacles[i]);
      }
    }
  }
}

function gameOver() {
  isGameOver = true;
}

function keyPressed() {
  if (keyCode === 32) { // SPACE key
    if (!isGameOver && mario.isOnGround) {
      mario.jump();
    } else if (isGameOver) {
      setupGame();
    }
  }
}

// Mario class
class Mario {
  constructor() {
    this.x = 80;
    this.y = height - 70;
    this.vy = 0;
    this.vx = 0;
    this.gravity = 0.6;
    this.jumpForce = -15;
    this.moveSpeed = 5;
    this.width = 50;
    this.height = 50;
    this.isOnGround = true;
    this.isBumping = false;
    this.bumpTimer = 0;
  }
  
  update() {
    // Apply gravity
    this.vy += this.gravity;
    this.y += this.vy;
    
    // Apply horizontal movement (with friction)
    this.x += this.vx;
    this.vx *= 0.9; // Add friction
    
    // Keep Mario within screen bounds
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > width - this.width) {
      this.x = width - this.width;
    }
    
    // Ground collision
    if (this.y > height - 70) {
      this.y = height - 70;
      this.vy = 0;
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }
    
    // Handle bumping animation
    if (this.isBumping) {
      this.bumpTimer--;
      if (this.bumpTimer <= 0) {
        this.isBumping = false;
      }
    }
  }
  
  moveLeft() {
    this.vx = -this.moveSpeed;
  }
  
  moveRight() {
    this.vx = this.moveSpeed;
  }
  
  jump() {
    if (this.isOnGround) {
      this.vy = this.jumpForce;
      this.isOnGround = false;
    }
  }
  
  bumpIntoPipe(pipe) {
    // Push Mario back from pipe
    if (this.x + this.width > pipe.x) {
      this.vx = -5; // Push back
      this.isBumping = true;
      this.bumpTimer = 10;
    }
  }
  
  display() {
    // Tint red if bumping into pipe
    if (this.isBumping) {
      tint(255, 100, 100);
    } else {
      noTint();
    }
    
    if (this.isOnGround) {
      // Draw standing Mario
      fill(255, 0, 0); // Red for Mario's cap/shirt
      rect(this.x, this.y, this.width, this.height/2);
      
      // Blue overalls
      fill(0, 0, 255);
      rect(this.x + 10, this.y + this.height/2, this.width - 20, this.height/2);
      
      // Face
      fill(255, 200, 150);
      rect(this.x + 15, this.y + 5, this.width - 30, this.height/3);
    } else {
      // Draw jumping Mario
      fill(255, 0, 0); // Red for Mario's cap/shirt
      rect(this.x, this.y, this.width, this.height/2);
      
      // Arms out in jump position
      rect(this.x - 10, this.y + 15, 10, 5);
      rect(this.x + this.width, this.y + 15, 10, 5);
      
      // Blue overalls
      fill(0, 0, 255);
      rect(this.x + 10, this.y + this.height/2, this.width - 20, this.height/2);
      
      // Face
      fill(255, 200, 150);
      rect(this.x + 15, this.y + 5, this.width - 30, this.height/3);
    }
  }
  
  collidesWith(object) {
    return (
      this.x < object.x + object.width &&
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y
    );
  }
}

// Obstacle class (for pipes and goombas)
class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.isGoomba = random() > 0.5;
    this.frameCount = 0;
  }
  
  update() {
    this.x -= gameSpeed;
    this.frameCount++;
  }
  
  display() {
    if (this.isGoomba) {
      // Draw goomba
      fill(139, 69, 19); // Brown for goomba
      ellipse(this.x + this.width/2, this.y + this.height/2, this.width, this.height);
      
      // Feet
      fill(0);
      rect(this.x + 10, this.y + 45, 15, 5);
      rect(this.x + 25, this.y + 45, 15, 5);
      
      // Eyes
      fill(255);
      ellipse(this.x + 15, this.y + 25, 10, 10);
      ellipse(this.x + 35, this.y + 25, 10, 10);
      
      fill(0);
      ellipse(this.x + 15, this.y + 25, 4, 4);
      ellipse(this.x + 35, this.y + 25, 4, 4);
    } else {
      // Draw pipe
      fill(0, 150, 0); // Green for pipe
      rect(this.x, this.y, this.width, this.height);
      
      // Highlight
      fill(0, 200, 0);
      rect(this.x + 5, this.y, 10, this.height);
      
      // Top rim
      fill(0, 100, 0);
      rect(this.x, this.y, this.width, 5);
    }
  }
  
  isOffScreen() {
    return this.x < -this.width;
  }
}

// Coin class
class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.frameCount = 0;
  }
  
  update() {
    this.x -= gameSpeed;
    this.frameCount++;
    // Make coin "shine" by oscillating size
    let oscillation = sin(frameCount * 0.1) * 3;
    this.width = 30 + oscillation;
    this.height = 30 + oscillation;
  }
  
  display() {
    // Gold coin
    fill(255, 215, 0);
    ellipse(this.x + this.width/2, this.y + this.height/2, this.width, this.height);
    
    // Inner circle for depth
    fill(255, 165, 0);
    ellipse(this.x + this.width/2, this.y + this.height/2, this.width * 0.7, this.height * 0.7);
  }
  
  isOffScreen() {
    return this.x < -this.width;
  }
}

// Cloud class
class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 40;
  }
  
  update() {
    this.x -= gameSpeed * 0.5; // Clouds move slower
  }
  
  display() {
    // Draw cloud with multiple circles
    fill(255);
    noStroke();
    ellipse(this.x + 20, this.y + 20, 40, 30);
    ellipse(this.x + 40, this.y + 15, 50, 40);
    ellipse(this.x + 60, this.y + 20, 30, 30);
  }
  
  isOffScreen() {
    return this.x < -this.width;
  }
}

// Ground class
class Ground {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 20;
  }
  
  update() {
    this.x -= gameSpeed;
  }
  
  display() {
    // Brown base
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height);
    
    // Top edge
    fill(160, 82, 45);
    rect(this.x, this.y, this.width, 5);
    
    // Pattern
    fill(101, 67, 33);
    rect(this.x + 10, this.y + 5, 5, 5);
    rect(this.x + 30, this.y + 5, 5, 5);
    rect(this.x, this.y + 15, 5, 5);
    rect(this.x + 20, this.y + 15, 5, 5);
    rect(this.x + 40, this.y + 15, 5, 5);
  }
  
  isOffScreen() {
    return this.x < -this.width;
  }
} 