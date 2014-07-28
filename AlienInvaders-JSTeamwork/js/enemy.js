/**
 * Created by Bi0GaMe on 21.7.2014 г..
 */
EnemyBullet = function(vel, rectangle){
    this.velocity = vel;
    this.rect = rectangle;


    this.animation = new Animation(7,15,0,0,1,"images/bullet-enemy.png",1,1,1);

    this.Update = function(){
        this.animation.position.Set(this.rect.x, this.rect.y);
        this.rect.x += this.velocity.x;
        this.rect.y += this.velocity.y;
    };

    this.Draw = function(){
        this.animation.Draw(ctx);
    };
};

Ship = function(rec, count) {
    this.rect = rec;
    this.life = count;

    if (count == 1)
        this.animation = new Animation(20, 14, 0, 0, 1, "images/enemy.png", 1, 1, 1);
    if (count == 2) {
        this.animation = new Animation(20, 19, 0, 0, 1, "images/enemy2.png", 1, 1, 1);
        this.rect.height = 19;
        this.life = count*2;
    }
    if (count == 3) {
        this.animation = new Animation(20, 26, 0, 0, 1, "images/enemy3.png", 1, 1, 1);
        this.rect.height = 26;
        this.life = count*3;
    }
    if (count == 4){
        this.animation = new Animation(114, 82, 0, 0, 1, "images/enemy4.png", 1, 1, 1);
        this.rect.widows = 114;
        this.rect.height = 82;
        this.life = 200;
    }

    this.Update = function(){
        this.animation.position.Set(this.rect.x, this.rect.y);
    };

    this.Draw = function(){
        this.animation.Draw(ctx);
    };
};

Enemy = function(level){
    this.ships = [];
    var nextRow = 0;
    for(var y = 10; y<level*20; y+= 20){
        for(var x = 10+nextRow; x < 400; x+=40) {
            if(count!=4) {
                var rec = new Rectangle(x, y, 20, 14);
                rec.color = new Color(255, 0, 0, 1);
                var ship = new Ship(rec, count);
                this.ships.push(ship);
            }
        }
        nextRow += 5;
    }

    if(count==4){
        var boss = new Rectangle(canvas.width/2, 20,114,82);
        var bossShip = new Ship(boss,count);
        this.ships.push(bossShip);
    }


    this.bullets = [];

    this.Update = function(){
        this.updateBullets();
        this.updateShips();
    };

    this.Shoot = function(){
        var i = Math.floor(Math.random()*(this.ships.length-1));
        var b = new Rectangle(this.ships[i].rect.x + (this.ships[i].rect.width / 2) - 4,
                this.ships[i].rect.y + (this.ships[i].rect.height / 2) - 4, 8, 8);
        b.color = new Color(255, 0, 0, 1);

        if(count == 4) {
            b = new Rectangle(this.ships[i].rect.x + 10,
                    this.ships[i].rect.y + (this.ships[i].rect.height / 2) - 4, 8, 8);
            b.color = new Color(255, 0, 0, 1);

            var c = new Rectangle(this.ships[i].rect.x + 100,
                    this.ships[i].rect.y + (this.ships[i].rect.height / 2) - 4, 8, 8);
            c.color = new Color(255, 0, 0, 1);

        }

        var vel = new Vector2(0, 0);
        vel.y += 1.5;
        var bul = new EnemyBullet(vel, b);
        this.bullets.push(bul);
        if(count == 4){
            bul = new EnemyBullet(vel,c);
            this.bullets.push(bul);
        }

    };

    this.updateBullets = function(){
        for(var i= 0; i < this.bullets.length; i++) {
            this.bullets[i].Update();

            var b = this.bullets[i];

            var done = false;
            if(b.rect.x + b.rect.width < 0) done = true;
            else if(b.rect.x > canvas.width) done = true;
            else if(b.rect.y + b.rect.height < 0) done = true;
            else if(b.rect.y > canvas.height) done = true;

            if(done){
                this.bullets.RemoveAt(i);
                i--;
            }
        }

    };

    this.updateShips = function(){
        for (var i = 0; i < this.ships.length; i++) {
            this.ships[i].Update();
        }
    };

    this.Draw = function(ctx){
//        this.rect.Draw(ctx);
        for(var i = 0; i < this.bullets.length;i++){
            this.bullets[i].Draw(ctx);
        }

        for (var j = 0; j < this.ships.length; j++) {
            this.ships[j].Draw(ctx);
        }


    };
};