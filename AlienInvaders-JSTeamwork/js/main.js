/**
 * Created by Bi0GaMe on 21.7.2014 г..
 */
var canvas          = document.getElementById("canvas");
var ctx             = canvas.getContext('2d');
canvas.style.width  = canvas.width + "px";
canvas.style.height = canvas.height + "px";
input.offset = new Vector2(GetLeft(canvas), GetTop(canvas));

var spaceship = new Player();
var totalLevel = 1;
var level = 1;
var velocity = 0.5;
var count = 1;
var playerDamage = 1;
var enemyDamage = 1;

//var temp = new Rectangle(0,0,2,500);
//temp.color = new Color(0,0,255,1);
//var temp2 = new Rectangle(498,0,2,500);
//temp2.color = new Color(0,0,255,1);

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
        if (enemies.ships[i].rect.x < 0 ){
            velocity = 0.5;
        }
        else if(enemies.ships[i].rect.x + enemies.ships[i].rect.width > canvas.width) {
            velocity = -0.5;
        }
        enemies.ships[i].rect.x += velocity;
    }
}, 5);

var Update = setInterval(function() {
    ShowLog();
    spaceship.Update();
    enemies.Update();

    if(enemies.bullets.length !=0){
        for (var j2 = 0; j2 < enemies.bullets.length; j2++) {
            if(enemies.bullets[j2].rect.Intersects(spaceship.rect))
            {
                enemies.bullets.RemoveAt(j2);
                spaceship.life-=enemyDamage;
            }
        }
    }

    if(spaceship.bullets.length !=0) {
        for (var j = 0; j < spaceship.bullets.length; j++) {
            for (var k = 0; k < enemies.ships.length; k++) {
                if (spaceship.bullets[j].rect.Intersects(enemies.ships[k].rect)) {
                    spaceship.bullets.RemoveAt(j);
                    enemies.ships[k].life-=playerDamage;
                    if(enemies.ships[k].life==0)
                        enemies.ships.RemoveAt(k);
                }
                if (spaceship.bullets.length == 0) {
                    break;
                }
            }
        }
    }

    if(spaceship.life <= 0){
        alert("You have been destroyed!");
        clearInterval(Update);
        clearInterval(EnemyMove);
    }

    if(enemies.ships.length == 0) {
        if(count != 4) {
            alert("You killed all enemies! Press OK to continue!");
            spaceship.bullets.Clear();
            enemies.bullets.Clear();
            level++;
            totalLevel++;
            if (level == 6) {
                level = 1;
                count++;
                spaceship.power++;
            }
            if (spaceship.power == 4) playerDamage += 5;

        }else{
            alert("Congratulations! You killed the BOSS!");
            clearInterval(Update);
            clearInterval(EnemyMove);
        }
        enemies = new Enemy(level);
    }

},8);

var Draw = setInterval(function Draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    enemies.Draw(ctx);
    spaceship.Draw(ctx);
//    temp.Draw(ctx);
//    temp2.Draw(ctx);

},33);

function ShowLog(){
    document.getElementById('lives').innerHTML = "LIVES:&nbsp;&nbsp;"+spaceship.life;
    document.getElementById('levels').innerHTML = "LEVEL:&nbsp;&nbsp;"+totalLevel;
    if(count==4)
        document.getElementById('levels').innerHTML = "LEVEL:&nbsp;&nbsp BOSS";
}