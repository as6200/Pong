var canvas = document.getElementById("canvas");
const ctx = c.getContext("2d");
const WIDTH = 600;
const HEIGHT = 400;
//ctx.moveTo(0,0);
//ctx.lineTo(600,400);
//ctx.stroke();

var main = function() {
    gameEnd = false
    while (!gameEnd) {
        update();
        draw();
    }
}

var update = function() {

}

var draw = function() {
    ctx.fillstyle = '#A52A2A';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}