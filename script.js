var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("click", CircleAppear);

var particles = [];

function CircleAppear(event) {
    var x = event.clientX;
    var y = event.clientY;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2* Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
}