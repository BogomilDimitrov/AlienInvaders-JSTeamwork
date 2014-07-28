
var canvas=document.getElementById("ourCanvas");

canvas.width=500;
canvas.height=500;

var ctx              = canvas.getContext('2d');
input.offset= new Vector2(GetLeft(canvas), GetTop(canvas));



//var anim = new Animation(16, 16, 0, 0, 8, "mario.png", 15, 4, 5, 30, 30);
//anim.position.Set(50,50);

var player = new Rectangle(50, 50, 30, 30);
player.color= new Color(50, 150, 50, 1);

var rect=new Rectangle(200,200,100,100);
rect.color=new Color(255,100,100,1);




var Update = setInterval(function()
{

    var previousPosition = new Vector2(player.x,player.y);

    if (input.d)
        player.x+=3;
    if (input.a)
        player.x-=3;
    if (input.s)
        player.y+=3;
    if (input.w)
        player.y-=3;




    if(player.Intersects(rect))
    {
        player.x=previousPosition.x;
        player.y=previousPosition.y;
    }



    if(player.x<0)
        player.x=0;
    if(player.y<0)
        player.y=0;
    if(player.x+player.width>canvas.width)
        player.x=canvas.width - player.width;
    if(player.y+player.height>canvas.height)
        player.y=canvas.height - player.height;


}, 1);





var Draw = setInterval(function()
{
    ctx.clearRect(0,0,canvas.width, canvas.height);

    rect.Draw(ctx);
    player.Draw(ctx);
//    anim.Draw(ctx);



}, 20);