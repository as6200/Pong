var canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = 600;
const HEIGHT = 400;
//ctx.moveTo(0,0);
//ctx.lineTo(600,400);
//ctx.stroke();

function main () {
    function gameLoop () {
        draw();
        
        window.requestAnimationFrame(gameLoop, canvas);
    }

    window.requestAnimationFrame(gameLoop, canvas);
}

function draw () {
    ctx.fillstyle = '#A52A2A';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

main();