/**
 * Created by Bi0GaMe on 21.7.2014 г..
 */
Bullet = function(vel, rectangle){
    this.velocity = vel;
    this.rect = rectangle;

    this.Update = function(){
        this.rect.x += this.velocity.x;
        this.rect.y += this.velocity.y;
    };

    this.Draw = function(){
        this.rect.Draw(ctx);
    };
};

Player = function(){
    this.rect = new Rectangle(0,40,16,16);
    this.rect.color = new Color(0,0,255,1);

    this.animation = new Animation(16,16,0,0,8,"images/mario.png",12,4,5);

    var gravity = 2;

    this.bullets = [];
    this.shotBullet = false;
    this.lookingRight = true;

    this.moving = false;
    this.jumpAvailable = false;
    this.jumping = false;
    this.JUMP_MAX = 3;
    this.jumpVelocity = 0;

    this.SetPosition = function(x,y,mod){
        if(mod==null || !mod) {
            if (x != null)
                this.rect.x = x;
            if (y != null)
                this.rect.y = y;
        }else{
            if(x!=null)this.rect.x += x;
            if(y!=null)this.rect.y += y;
        }
    };

    this.Update = function(){
        this.moving = false;
        if(input.a||input.left){
            this.animation.SetRow(2);
            this.animation.SetLimit(8);
            this.rect.x -=2;
            this.moving = true;
            this.lookingRight = false;
        }
        if(input.d||input.right){
            this.animation.SetRow(0);
            this.animation.SetLimit(8);
            this.rect.x +=2;
            this.moving = true;
            this.lookingRight = true;
        }
        if(input.w||input.up){
            this.Jump();
        }

        if(input.v) this.Shoot();
        else this.shotBullet = false;

        this.updateBullets();

        if(this.jumping) {
            this.rect.y -= this.jumpVelocity;
            this.jumpVelocity -= 0.08;
        }else{
            this.rect.y += gravity;
        }

        this.animation.position.Set(this.rect.x, this.rect.y);

        if(this.moving) this.animation.Update();
        else this.animation.SetColumn(0);



        if(this.rect.x < 0) this.rect.x =0;
        if(this.rect.y < 0) this.rect.y =0;
        if(this.rect.x + this.rect.width > canvas.width) this.rect.x = canvas.width - this.rect.width;
        if(this.rect.y + this.rect.height> canvas.height) this.rect.y = canvas.height-this.rect.height;
    };


    this.Shoot = function(){
        if(!this.shotBullet) {
            var b = new Rectangle(this.rect.x + (this.rect.width / 2) - 4, this.rect.y + (this.rect.height / 2) - 4, 8, 8);
            b.color = new Color(0,255,0,1);

            var vel = new Vector2(0,0);
            vel.y -= 3;
            var bul = new Bullet(vel,b);
            this.bullets.push(bul);
            this.shotBullet = true;
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

    this.Jump = function(){
        if(this.jumpAvailable){
            this.jumpVelocity = this.JUMP_MAX;
            this.jumping = true;
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