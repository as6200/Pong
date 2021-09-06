var canvas = document.getElementById("canvas"); // Gets canvas
const ctx = canvas.getContext("2d"); // Gets context
// Sets Width and Height
const WIDTH = 600;
const HEIGHT = 400;
var scores = [0, 0]; // Player 1 and 2's score

// Constructor for player
class Player {
    constructor (x, y, width, height, color, speed, keyUp, keyDown) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;

        this.keyUp = keyUp;
        this.keyDown = keyDown;

        // Draws player
        this.draw = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };

        // Updates position of player
        this.update = function () {
            for (let i = 0; i < keyStates.length; i++) {
                if (keyStates[i] === this.keyUp) {
                    this.y -= this.speed;
                } else if (keyStates[i] === this.keyDown) {
                    this.y += this.speed;
                }
            }
            
        };
    }
}

// Ball object
ball = {
    x: WIDTH/2,
    y: HEIGHT/2,
    direction: -1,
    radius: 5,
    color: 'white',

    //Draws circular ball
    draw: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    },

    // Updates position of ball
    update: function () {}
}

// Main function
function main () {

    // Creates 2 player instances
    player1 = new Player(50, HEIGHT/2 + 25/2, 10, 50, 'white', 7, 'w', 's');
    player2 = new Player(550, HEIGHT/2 + 25/2, 10, 50, 'white', 7, 'ArrowUp', 'ArrowDown');

    // Records current keys being pressed and stores in keyStates.
    keyStates = [];
    document.addEventListener("keydown", function(evt) {
        if (evt.repeat) { return }
        keyStates.push(evt.key);
    });
    document.addEventListener("keyup", function(evt) {
        delete keyStates[keyStates.indexOf(evt.key)];
    });

    // Main loop
    function gameLoop () {
        update();
        draw();

        window.requestAnimationFrame(gameLoop, canvas); // Loops it
    }

    window.requestAnimationFrame(gameLoop, canvas); // Starts loop
}

// Updates all 3 objects
function update() {
    player1.update();
    player2.update();
    // ball.update();
}

// Draws to canvas
function draw () {
    // Sets Background
    ctx.fillStyle = 'rgb(165, 42, 42)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draws 3 objects
    player1.draw();
    player2.draw();
    ball.draw()

    // Draw "net"

}

main();