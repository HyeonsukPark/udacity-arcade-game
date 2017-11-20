// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one  you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 100 + 50; // 50 is minimum speed.

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;
    if (this.x > 500) {
        this.x = 0;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.lives = 5;
};



// lives
var livesboard = document.getElementById("livesboard");
var lives = document.getElementById("lives");

// scores
var scoreboard = document.getElementById("scoreboard");
var score = document.getElementById("score");

// New player
var player = new Player(200, 400);


// player update
Player.prototype.update = function(dt) {

    if(this.x > 500 || this.x < -20) {
        this.reset();
    }; 

    if(this.y > 480) {
        this.reset();
    };

    document.getElementById("score").innerHTML = this.score;
      if ( this.y <= -10) {
            this.score += 50;
            alert("You got points");
            this.reset();
            document.getElementById("score").innerHTML = this.score;
    } else {
        this.collision();
    };

    if (this.score === 300 || this.lives === 0) {
        document.getElementById("end").innerHTML = 'You got ' + this.score + ' !';
        this.gameEnd();
    };


};


// player render 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// player reset 
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;

    document.getElementById("end").innerHTML = '';
};


// player handleinput 
Player.prototype.handleInput = function(e) {
    switch (e) {
        case "left":
            this.x -= 101;
            break;

        case "right":
            this.x += 101;
            break;

        case "up":
            this.y -= 83;
            break;

        case "down":
            this.y += 83;
            break;
   };
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyOne = new Enemy(1, 60, 20);
var enemyTwo = new Enemy(1, 140, 30);
var enemyThree = new Enemy(1, 220, 20);
var enemyFour = new Enemy(1, 140, 50);

var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];
enemyOne.update(3);
enemyTwo.update(4);
enemyThree.update(2);
enemyFour.update(6);



// player collision 
Player.prototype.collision = function() {

    document.getElementById("lives").innerHTML = this.lives;
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 30 && 30 + this.y > allEnemies[i].y) {

            // collision 
            this.lives -= 1;
            this.score -= 50;
            document.getElementById("lives").innerHTML = this.lives;
            this.reset();
        };
    };
};


// start button 
var startbutton = document.getElementById("startbutton");

startbutton.addEventListener("click", function(e) {
    player.start();
});


// player start 
Player.prototype.start = function() {
    this.score = 0;
    this.lives = 5;
    this.reset();
};


// player stop 
Player.prototype.stop = function() {
    document.getElementById("end").innerHTML = 'GAME OVER Try next time!';
};


// player gameEnd 
Player.prototype.gameEnd = function() {

    if (confirm("GAME OVER! Do you want to play again?") === true) {
        this.start();

    } else {
        this.stop();
    } 

};





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});