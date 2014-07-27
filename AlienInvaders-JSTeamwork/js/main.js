/**
 * Created by Bi0GaMe on 21.7.2014 г..
 */
var canvas          = document.getElementById("canvas");
var ctx             = canvas.getContext('2d');
canvas.style.width  = canvas.width + "px";
canvas.style.height = canvas.height + "px";
input.offset = new Vector2(GetLeft(canvas), GetTop(canvas));

var mario = new Player();
var level = 1;
var velocity = 0.5;

var temp = new Rectangle(0,0,2,500);
temp.color = new Color(0,0,255,1);
var temp2 = new Rectangle(498,0,2,500);
temp2.color = new Color(0,0,255,1);

var enemies = new Enemy(level);

(function EnemyShoot() {
    var rand = Math.round(Math.random() * (500 - 100)) + 100;
    setTimeout(function() {
        enemies.Shoot();
        EnemyShoot();
    }, rand);
}());

var EnemyMove = setInterval(function() {
    for(var i = 0; i<enemies.ships.length;i++) {
        if (enemies.ships[i].x < 0 ||
            enemies.ships[i].x + enemies.ships[i].width > canvas.width) {
            velocity *= -1;
        }
        enemies.ships[i].x += velocity;
    }
}, 5);



var Update = setInterval(function() {
    ShowLog();
    mario.Update();
    enemies.Update();

    if(enemies.bullets.length !=0){
        for (var j2 = 0; j2 < enemies.bullets.length; j2++) {
            if(enemies.bullets[j2].rect.Intersects(mario.rect))
            {
                enemies.bullets.RemoveAt(j2);
                mario.life--;
            }
        }
    }

    if(mario.bullets.length !=0) {
        for (var j = 0; j < mario.bullets.length; j++) {
            for (var k = 0; k < enemies.ships.length; k++) {
                if (mario.bullets[j].rect.Intersects(enemies.ships[k])) {
                    mario.bullets.RemoveAt(j);
                    enemies.ships.RemoveAt(k);
                }
                if (mario.bullets.length == 0) {
                    break;
                }
            }
        }
    }

    if(mario.life <= 0){
        console.log("loose");
        clearInterval(Update);
        clearInterval(EnemyMove);
    }

    if(enemies.ships.length == 0) {
        alert("win");
        mario.bullets.Clear();
        enemies.bullets.Clear();
        level++;
        enemies = new Enemy(level);
    }

},8);

var Draw = setInterval(function Draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    enemies.Draw(ctx);
    mario.Draw(ctx);
    temp.Draw(ctx);
    temp2.Draw(ctx);

},33);

function ShowLog(){
    document.getElementById('log').value = mario.life;
}