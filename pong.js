//ctx.moveTo(0,0);
//ctx.lineTo(600,400);
//ctx.stroke();

function main () {
    var canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const WIDTH = 600;
    const HEIGHT = 400;
    function gameLoop () {
        draw();
        
        window.requestAnimationFrame(gameLoop, canvas);
    }

    window.requestAnimationFrame(gameLoop, canvas);
}

function draw () {
    ctx.fillstyle = 'rgb(165, 42, 42)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

main();