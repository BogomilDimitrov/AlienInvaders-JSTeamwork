/**
 * Created by Bi0GaMe on 21.7.2014 г..
 */
Bullet = function(vel, rectangle){
    this.velocity = vel;
    this.rect = rectangle;

    if(count != 4)
        this.animation = new Animation(7,15,0,0,1,"images/bullet.png",1,1,1);
    else if(count == 4)
        this.animation = new Animation(26,30,0,0,4,"images/bullet-ultimate.png",30,4,1);

    this.Update = function(){
        this.animation.position.Set(this.rect.x, this.rect.y);
        this.animation.Update();
        this.rect.x += this.velocity.x;
        this.rect.y += this.velocity.y;
    };

    this.Draw = function(){
        this.animation.Draw(ctx);
    };
};

Player = function(){
    this.rect = new Rectangle(20,450,30,26);
    this.rect.color = new Color(0,0,255,1);

    this.animation = new Animation(30,26, 0, 0, 1,"images/ship.png",1,12,2);

    this.power = 1;

    this.bullets = [];
    this.shotBullet = false;
    this.life = 10;

    this.moving = false;

    this.Update = function(){
        if(input.a||input.left){
            this.rect.x -=2;
            this.moving = true;
        }
        if(input.d||input.right){
            this.rect.x +=2;
            this.moving = true;
        }
        if(input.v) this.Shoot();
        else this.shotBullet = false;

        this.updateBullets();
        this.animation.position.Set(this.rect.x, this.rect.y);
        this.animation.Update();

        if(this.rect.x < 0) this.rect.x =0;
        if(this.rect.y < 0) this.rect.y =0;
        if(this.rect.x + this.rect.width > canvas.width) this.rect.x = canvas.width - this.rect.width;
        if(this.rect.y + this.rect.height> canvas.height) this.rect.y = canvas.height-this.rect.height;
    };


    this.Shoot = function(){
        if(!this.shotBullet) {
            switch (this.power){
                case 1:
                {
                    var b = new Rectangle(this.rect.x + (this.rect.width / 2) - 4, this.rect.y + (this.rect.height / 2) - 4, 8, 8);
                    b.color = new Color(0, 255, 0, 1);
                    var vel = new Vector2(0, 0);
                    vel.y -= 3;
                    var bul = new Bullet(vel, b);
                    this.bullets.push(bul);
                    this.shotBullet = true;
                    break;
                }
                case 2:
                {
                    b = new Rectangle(this.rect.x + (this.rect.width / 2) - 12, this.rect.y + (this.rect.height / 2) - 4, 8, 8);
                    b.color = new Color(0, 255, 0, 1);
                    var c = new Rectangle(this.rect.x + (this.rect.width / 2) + 6, this.rect.y + (this.rect.height / 2) - 4, 8, 8);
                    c.color = new Color(0, 255, 0, 1);

                    vel = new Vector2(0, 0);
                    vel.y -= 3;
                    bul = new Bullet(vel, b);
                    this.bullets.push(bul);
                    bul = new Bullet(vel,c);
                    this.bullets.push(bul);
                    this.shotBullet = true;
                    break;
                }
                case 3:
                {
                    b = new Rectangle(this.rect.x + (this.rect.width / 2) - 12, this.rect.y + (this.rect.height / 2) - 4, 8, 8);
                    b.color = new Color(0, 255, 0, 1);
                    c = new Rectangle(this.rect.x + (this.rect.width / 2) + 6, this.rect.y + (this.rect.height / 2) - 4, 8, 8);
                    c.color = new Color(0, 255, 0, 1);
                    var d = new Rectangle(this.rect.x + (this.rect.width / 2) -3, this.rect.y + (this.rect.height / 2) - 8, 8, 8);
                    d.color = new Color(0, 255, 0, 1);

                    vel = new Vector2(0, 0);
                    vel.y -= 3;
                    bul = new Bullet(vel, b);
                    this.bullets.push(bul);
                    bul = new Bullet(vel, c);
                    this.bullets.push(bul);
                    bul = new Bullet(vel, d);
                    this.bullets.push(bul);
                    this.shotBullet = true;
                    break;
                }
                case 4:
                {
                    b = new Rectangle(this.rect.x + (this.rect.width / 2) -3, this.rect.y + (this.rect.height / 2) - 8, 36, 10);

                    vel = new Vector2(0,0);
                    vel.y -=3;
                    bul = new Bullet(vel,b);
                    this.bullets.push(bul);
                    this.shotBullet = true;
                    break;
                }

            }

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

    this.Draw = function(ctx){
//        this.rect.Draw(ctx);
        for(var i = 0; i < this.bullets.length;i++){
            this.bullets[i].Draw(ctx);
        }
        this.animation.Draw(ctx);
    };
};