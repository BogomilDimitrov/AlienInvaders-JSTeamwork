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

Enemy = function(level){
    this.ships = [];
    var nextRow = 0;
    for(var y = 10; y<level*20; y+= 20){
        for(var x = 10+nextRow; x < 400; x+=40) {
            var rect = new Rectangle(x, y, 10, 10);
            rect.color =new Color(255,0,0,1);
            this.ships.push(rect);
        }
        nextRow += 5;
    }
//    this.animation = new Animation(16,16,0,0,8,"images/mario.png",12,4,5);

    this.bullets = [];

//    this.SetPosition = function(x,y,mod){
//        if(mod==null || !mod) {
//            if (x != null)
//                this.rect.x = x;
//            if (y != null)
//                this.rect.y = y;
//        }else{
//            if(x!=null)this.rect.x += x;
//            if(y!=null)this.rect.y += y;
//        }
//    };

    this.Update = function(){
        this.updateBullets();

//        this.animation.position.Set(this.rect.x, this.rect.y);
    };


    this.Shoot = function(){
        var i = Math.floor(Math.random()*(this.ships.length-1));
        var b = new Rectangle(this.ships[i].x + (this.ships[i].width / 2) - 4,
                this.ships[i].y + (this.ships[i].height / 2) - 4, 8, 8);
        b.color = new Color(255, 0, 0, 1);

        var vel = new Vector2(0, 0);
        vel.y += 1.5;
        var bul = new Bullet(vel, b);
        this.bullets.push(bul);
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
        for(var k = 0; k<this.ships.length; k++){
            this.ships[k].Draw(ctx);
        }
    };
};