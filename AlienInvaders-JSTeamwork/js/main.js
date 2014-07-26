/**
 * Created by Bi0GaMe on 21.7.2014 г..
 */
var canvas          = document.getElementById("canvas");
var ctx             = canvas.getContext('2d');
canvas.style.width  = canvas.width + "px";
canvas.style.height = canvas.height + "px";
input.offset = new Vector2(GetLeft(canvas), GetTop(canvas));

var floor = new Rectangle(0,400,500,500);

var mario = new Player();

//var temp = new Rectangle(0,200,100,100);
//temp.color = new Color(255,255,0,1);

//var enemies = [[],[]];

var enemies = [];

for(var row = 10; row<50; row+=20){
    for(var col = 10; col < canvas.width; col+=20) {
        var rect = new Rectangle(col, row, 10, 10);
        rect.color =new Color(255,0,0,1);
        enemies.push(rect);

    }
}

var Update = setInterval(function() {
    ShowLog();
    mario.Update();

    if (floor.Intersects(mario.rect)) {
        mario.SetPosition(null, floor.y - mario.rect.height);
        mario.jumpAvailable = true;
        mario.jumping = false;
    } else {
        mario.jumpAvailable = false;
    }
    if(mario.bullets.length !=0) {
        for (var j = 0; j < mario.bullets.length; j++) {
            for (var k = 0; k < enemies.length; k++) {
                if (mario.bullets[j].rect.Intersects(enemies[k])) {
                    mario.bullets.RemoveAt(j);
                    enemies.RemoveAt(k);
                }
                if(mario.bullets.length==0){
                    break;
                }
            }
        }
    }
},8);

var Draw = setInterval(function Draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i<enemies.length; i++){
        enemies[i].Draw(ctx);
    }
    floor.Draw(ctx);
//    temp.Draw(ctx);
    mario.Draw(ctx);

},33);

function ShowLog(){
    document.getElementById('log').value = mario.bullets.length;
}