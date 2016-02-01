// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    //KZ Enemy starting position based on x,y coordinates passed in
    this.x = x;
    this.y = y;
    this.enemySpeed = Math.floor(Math.random() * 120 + 2 );
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //this.x = 100 * dt; - KZ bugs are stationary, 
    // KZ needs loop or conditional statement
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < rightBoundary) {
        this.x += dt * this.enemySpeed;
    }
    else {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.x = 205;
    this.y = 401;
    this.sprite = 'images/char-boy.png';

};
// KZ player movement criteria, 
// KZ how far can the player go, what are boundaries?
// KZ how much can the player move per keystroke?
var rightBoundary = 505;
// KZ leftBoundary is 0 in cartesian plane, only need right
var bottomBoundary = 490;
// KZ topBoundary is 0 in cartesian plane, only need bottom
var reachedWater = function() {
    this.y === 0;
};
// KZ game should reset when player reaches water

var columnWidth = 101;
// KZ player should move across tiles one column at a time
var rowHeight = 83;
// KZ player should move across tiles one row at a time

// KZ Code to make overlay visible when not using alert method
// to notify player that they have won
// for simplicity - used alert method 
//function overlay() {
    //el = document.getElementById("win-overlay");
    //el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
//}



// Citation needed - Method for Collision detection between entities
//Used the axis-aligned collision detection logic
Player.prototype.hasCollided = function(){
    for(var i = 0; i < allEnemies.length; i++){
        if( !(this.x > allEnemies[i].x + 50
                 || this.x+50 < allEnemies[i].x
                 || this.y > allEnemies[i].y + 50
                 || this.y+50 < allEnemies[i].y) ){ 
            break;
        }
        else
            return false;
    }
    return true;
}


Player.prototype.gameReset = function() {
    this.x = 205;
    this.y = 401;
    this.hasCollided = false;
};

Player.prototype.update = function(dt) {
    // KZ when to update player for resetting game
    // KZ https://discussions.udacity.com/t/best-way-to-reset-game/40603/5
    // KZ call hasCollided function to check for collision with enemies
   

    if (this.y < -21) {
        this.gameReset();
        // KZ "you win" modal when player reaches water
        alert("You Win!");
    }
    if(this.hasCollided()  )
        this.gameReset();
        
    
    else {}


};




Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// KZ player can move only within the canvas, one row or column at a time
// Use switch/case, instead of 4 if/else statements
// Switch documentation here: http://www.w3schools.com/js/js_switch.asp
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
        if(this.x - columnWidth < 0){
            this.x = 0;
        }
        else {
            this.x -= columnWidth;
        }

        break;

        case 'right':
        if(this.x += columnWidth >= rightBoundary){
            this.x = 400;
        }
        else {
            this.x += columnWidth;
        }

        break;

        case 'up':
        if(this.y - rowHeight < -19){
            this.y = -22;
            //reachedWater = true;
        }
        else {
            this.y -= rowHeight;
        }

        break;

        case 'down':
        if(this.y + rowHeight >= bottomBoundary){
            this.y = 410;
        }
        else {
            this.y += rowHeight;
        }

        break;
    }
};

// KZ game reset function replaced with code above
//var resetGame = function() {
 //if (reachedWater = true) {
    //Player.x = 205;
    //Player.y = 430;
 //} 
 
//};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// KZ allEnemies sets 3 enemy positions and randomizes 2 more 
//for a total of 5 bugs at all times
var allEnemies = [ new Enemy(10, 65), new Enemy(62, 142) , new Enemy(30, 228)];
for(var i = 0; i < 2; i++){
    var enemyX = (Math.floor(Math.random() * (5 - 1)) + 1) * 99;
    var enemyY = (Math.floor(Math.random() * (4 - 1)) + 1) * 78;
    var enemy = new Enemy(enemyX, enemyY);
    allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();


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
