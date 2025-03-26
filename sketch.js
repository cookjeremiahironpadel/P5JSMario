// P5JS Mario-like Endless Runner
let mario;
let obstacles = [];
let grounds = [];
let clouds = [];
let coins = [];
let gameSpeed = 5;
let score = 0;
let isGameOver = false;
let jumpSound, coinSound, dieSound;
let bgImg, marioImg, marioJumpImg, groundImg, pipeImg, cloudImg, coinImg, goombaImg;
let assetsLoaded = false;

// Preload assets
function preload() {
  // Use try/catch to handle missing assets
  try {
    marioImg = loadImage('assets/mario.png');
    marioJumpImg = loadImage('assets/mario_jump.png');
    groundImg = loadImage('assets/ground.png');
    pipeImg = loadImage('assets/pipe.png');
    cloudImg = loadImage('assets/cloud.png');
    coinImg = loadImage('assets/coin.png');
    goombaImg = loadImage('assets/goomba.png');
    
    // Try to load sounds if available
    soundFormats('mp3');
    jumpSound = loadSound('assets/jump.mp3');
    coinSound = loadSound('assets/coin.mp3');
    dieSound = loadSound('assets/die.mp3');
    
    assetsLoaded = true;
  } catch (e) {
    console.log('Some assets failed to load. Using fallback graphics.');
    assetsLoaded = false;
  }
}

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
      if (assetsLoaded && coinSound) {
        coinSound.play();
      }
    }
  }
  
  // Check for obstacle collisions
  for (let i = obstacles.length - 1; i >= 0; i--) {
    if (mario.collidesWith(obstacles[i])) {
      gameOver();
    }
  }
}

function gameOver() {
  isGameOver = true;
  if (assetsLoaded && dieSound) {
    dieSound.play();
  }
}

function keyPressed() {
  if (keyCode === 32) { // SPACE key
    if (!isGameOver && mario.isOnGround) {
      mario.jump();
      if (assetsLoaded && jumpSound) {
        jumpSound.play();
      }
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
    this.gravity = 0.6;
    this.jumpForce = -15;
    this.width = 50;
    this.height = 50;
    this.isOnGround = true;
  }
  
  update() {
    // Apply gravity
    this.vy += this.gravity;
    this.y += this.vy;
    
    // Ground collision
    if (this.y > height - 70) {
      this.y = height - 70;
      this.vy = 0;
      this.isOnGround = true;
    } else {
      this.isOnGround = false;
    }
  }
  
  jump() {
    if (this.isOnGround) {
      this.vy = this.jumpForce;
      this.isOnGround = false;
    }
  }
  
  display() {
    if (assetsLoaded) {
      if (this.isOnGround) {
        image(marioImg, this.x, this.y, this.width, this.height);
      } else {
        image(marioJumpImg, this.x, this.y, this.width, this.height);
      }
    } else {
      // Fallback rendering with rectangles if assets aren't loaded
      fill(255, 0, 0); // Red for Mario's cap/shirt
      rect(this.x, this.y, this.width, this.height);
      fill(0, 0, 255); // Blue for overalls
      rect(this.x + 10, this.y + 25, this.width - 20, this.height - 25);
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
    if (assetsLoaded) {
      if (this.isGoomba) {
        image(goombaImg, this.x, this.y, this.width, this.height);
      } else {
        image(pipeImg, this.x, this.y, this.width, this.height);
      }
    } else {
      // Fallback rendering
      if (this.isGoomba) {
        fill(139, 69, 19); // Brown for goomba
        ellipse(this.x + this.width/2, this.y + this.height/2, this.width, this.height);
      } else {
        fill(0, 150, 0); // Green for pipe
        rect(this.x, this.y, this.width, this.height);
      }
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
  }
  
  display() {
    if (assetsLoaded) {
      image(coinImg, this.x, this.y, this.width, this.height);
    } else {
      // Fallback rendering
      fill(255, 215, 0); // Gold color
      ellipse(this.x + this.width/2, this.y + this.height/2, this.width, this.height);
    }
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
    if (assetsLoaded) {
      image(cloudImg, this.x, this.y, this.width, this.height);
    } else {
      // Fallback rendering
      fill(255);
      noStroke();
      ellipse(this.x + 20, this.y + 20, 40, 30);
      ellipse(this.x + 40, this.y + 20, 40, 40);
      ellipse(this.x + 60, this.y + 20, 30, 30);
    }
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
    if (assetsLoaded) {
      image(groundImg, this.x, this.y, this.width, this.height);
    } else {
      // Fallback rendering
      fill(139, 69, 19); // Brown for ground
      rect(this.x, this.y, this.width, this.height);
    }
  }
  
  isOffScreen() {
    return this.x < -this.width;
  }
} 