var cvs = document.getElementById("canvas")
var ctx = cvs.getContext("2d")

//Файлы
var bird = new Image();
var bg = new Image();
var fg = new Image()
var PB = new Image()
var PU= new Image()

var score = 0;
//Позиция птички
var xP = 10;
var yP = 150;
var grav = 1.5;

//Загрузка файлов
bird.src = "assets/flappy_bird_bird.png";
bg.src = "assets/flappy_bird_bg.png";
fg.src = "assets/flappy_bird_fg.png";
PB.src = "assets/flappy_bird_pipeBottom.png";
PU.src = "assets/flappy_bird_PipeUp.png";

//Звук
var fly = new Audio();
var scoreA = new Audio();
var theme = new Audio();

fly.src = "assets/audio/fly.mp3";
scoreA.src = "assets/audio/score.mp3";
theme.src = "assets/audio/theme.mp3"

var gap = 200;
//Перезагрузка
function re() {
  location.reload();
}
//При нажатии на кнопку
function Up() {
  console.log(yP);
  yP -= 25;
  fly.play();
  bird
}

document.addEventListener('keydown', Up);


//
var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
}





//Загрузка игры
function draw() {
  ctx.drawImage(bg, 0, 0);
  for(i = 0; i < pipe.length; i++) {
    ctx.drawImage(PU, pipe[i].x, pipe[i].y);
    ctx.drawImage(PB, pipe[i].x, pipe[i].y + PU.height + gap);
  
    pipe[i].x--;

    if(pipe[i].x == 90) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * PU.height) - PU.height
      });
    }
    if(xP + bird.width >= pipe[i].x && xP <= pipe[i].x + PU.width  &&(yP <= pipe[i].y + PU.height || yP + bird.height >= pipe[i].y + PU.height + gap) || yP + bird.height >= cvs.height - fg.height) {
      ctx.fillText(score, cvs.width / 2, cvs.height / 2);
     location.reload();
     }
    if(pipe[i].x == 5) {
      score++;
      scoreA.play();
      theme.play();
      setInterval(theme.play(), 81000)

    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xP, yP);
  yP += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana"
  ctx.fillText("Score:" + score, 10, cvs.height - 20 );
  requestAnimationFrame(draw);
}

PU.onload = draw;
