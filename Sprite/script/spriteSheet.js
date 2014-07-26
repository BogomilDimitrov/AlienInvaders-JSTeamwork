/**
 * Created by Kameliya on 26.7.2014 г..
 */

var ctx;
var count = 0;
var x;
var y;

var img = new Image();
img.src = "image/fire.png";
img.onload = draw;

function draw() {
    requestAnimationFrame(draw);

    ctx.clearRect(0, 0, 96, 96);

    x = (count % 5) * 96;
    y = Math.floor(count / 5) * 96;

    ctx.drawImage(img, x, y, 96, 96, 0, 0, 96, 96);

    if(count == 16) {
        count = 0;
    }
    else {
        count++;
    }
}

function init() {
    ctx = document.getElementById("canvas").getContext("2d");
}