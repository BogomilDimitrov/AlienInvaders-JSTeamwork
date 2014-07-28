
var canvas=document.getElementById("ourCanvas");

canvas.width=800;
canvas.height=800;

var ctx              = canvas.getContext('2d');
input.offset= new Vector2(GetLeft(canvas), GetTop(canvas));






var anim = new Animation(16, 16, 0, 0, 8, "mario.png", 15, 4, 5, 30, 30);
anim.position.Set(200,200);

var rects = new Array();


function GenerateRect()
{
    var r=new Rectangle(Math.random()*700,Math.random()*700,Math.random()*100,Math.random()*100);
    r.color = new Color(Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()));
    rects.push(r);
};

var Update = setInterval(function()
{

//    if(input.d)
//        rect.x += 1.5;
//    else if (input.a)
//        rect.x -= 1.5;
//    else if (input.s)
//        rect.y += 1.5;
//    else if (input.w)
//        rect.y -= 1.5;

    if(input.a) {
        anim.position.Move(new Vector2(-3, 0));
        anim.Update();
        anim.SetRow(2);
    }
    if(input.d) {
        anim.position.Move(new Vector2(3, 0));
        anim.Update();
        anim.SetRow(0);
    }
    if(input.w){
        anim.position.Move(new Vector2(0, -3));
        anim.Update();
    }
    if(input.s){
        anim.position.Move(new Vector2(0, 3));
        anim.Update();
    }


}, 15);





var Draw = setInterval(function()
{
    ctx.clearRect(0,0,canvas.width, canvas.height);

    for(var i = 0; i<rects.length; i++)
        rects[i].Draw(ctx);
    anim.Draw(ctx);



}, 20);