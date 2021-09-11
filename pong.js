var canvas = document.getElementById("canvas"); // Gets canvas
const ctx = canvas.getContext("2d"); // Gets context
// Sets Width and Height
const WIDTH = 600;
const HEIGHT = 400;
const pi = Math.PI;
var scores = [0, 0]; // player1 1 and 2's score

// Constructor for player1
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

        // Draws player1
        this.draw = function () {
        	ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };

        // Updates position of player1
        this.update = function () {
            for (let i = 0; i < keyStates.length; i++) {
                if (keyStates[i] === this.keyUp) {
                    this.y -= this.speed;
                } else if (keyStates[i] === this.keyDown) {
                    this.y += this.speed;
                }

                if (this.y + this.height > HEIGHT) {
                    this.y = HEIGHT - this.height;
                } else if (this.y < 0) {
                    this.y = 0;
                }
            }
            
        };
    }
}

// Ball object
ball = {
	x:   null,
	y:   null,
	vel: null,

	side:  10,
	speed: 8,

	/**
	 * Serves the ball towards the specified side
	 * 
	 * @param  {number} side 1 right
	 *                       -1 left
	 */
	serve: function(side) {
		// set the x and y position
		var r = Math.random();
		this.x = side===1 ? player1.x+player1.width : player2.x - this.side;
		this.y = (HEIGHT - this.side)*r;
		// calculate out-angle, higher/lower on the y-axis =>
		// steeper angle
		var phi = 0.1*pi*(1 - 2*r);
		// set velocity direction and magnitude
		this.vel = {
			x: side*this.speed*Math.cos(phi),
			y: this.speed*Math.sin(phi)
		}
	},

	/**
	 * Update the ball position and keep it within the canvas
	 */
	update: function() {
		// update position with current velocity
		this.x += this.vel.x;
		this.y += this.vel.y;
		// check if out of the canvas in the y direction
		if (0 > this.y || this.y+this.side > HEIGHT) {
			// calculate and add the right offset, i.e. how far
			// inside of the canvas the ball is
			var offset = this.vel.y < 0 ? 0 - this.y : HEIGHT - (this.y+this.side);
			this.y += 2*offset;
			// mirror the y velocity
			this.vel.y *= -1;
		}
		// helper function to check intesectiont between two
		// axis aligned bounding boxex (AABB)
		var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
			return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
		};

		// check agplayer2nts target paddle to check collision in x
		// direction
		var pdle = this.vel.x < 0 ? player1 : player2;
		if (AABBIntersect(pdle.x, pdle.y, pdle.width, pdle.height,
				this.x, this.y, this.side, this.side)
		) {	
			// set the x position and calculate reflection angle
			this.x = pdle===player1 ? player1.x+player1.width : player2.x - this.side;
			var n = (this.y+this.side - pdle.y)/(pdle.height+this.side);
			var phi = 0.25*pi*(2*n - 1); // pi/4 = 45
			// calculate smash value and update velocity
			var smash = Math.abs(phi) > 0.2*pi ? 1.5 : 1;
			this.vel.x = smash*(pdle===player1 ? 1 : -1)*this.speed*Math.cos(phi);
			this.vel.y = smash*this.speed*Math.sin(phi);
		}

		// reset the ball when ball outside of the canvas in the
		// x direction
		if (0 > this.x+this.side || this.x > WIDTH) {
			this.serve(pdle===player1 ? 1 : -1);
            pdle === player1 ? scores[1] += 1 : scores[0] += 1;
		}
	},

	/**
	 * Draw the ball to the canvas
	 */
	draw: function() {
		ctx.fillRect(this.x, this.y, this.side, this.side);
	}
};

// Mplayer2n function
function main () {

    // Creates 2 player1 instances
    player1 = new Player(50, HEIGHT/2 - 25, 10, 50, 'white', 7, 'w', 's');
    player2 = new Player(540, HEIGHT/2 - 25, 10, 50, 'white', 7, 'ArrowUp', 'ArrowDown');

    // Records current keys being pressed and stores in keyStates.
    keyStates = [];
    document.addEventListener("keydown", function(evt) {
        for (let i = 0; i < keyStates.length; i++) {
            if (keyStates[i] === evt.key) { return }
        }
        
        keyStates.push(evt.key);
    });
    document.addEventListener("keyup", function(evt) {
        delete keyStates[keyStates.indexOf(evt.key)];
    });
    
    
		ball.serve(1);
    // Mplayer2n loop
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
    ball.update();
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
	var w = 4;
    var x = (WIDTH - w)*0.5;
    var y = 0;
    var step = HEIGHT/20; // how many net segments
    while (y < HEIGHT) {
		ctx.fillRect(x, y+step*0.25, w, step*0.5);
		y += step;
    }
    // Draw scores
    ctx.font = "30px Montserrat";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(scores[0], WIDTH * 0.25, 30);
    ctx.fillText(scores[1], WIDTH * 0.75, 30);
	
}

main();