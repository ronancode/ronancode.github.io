var a, c, canvas, click, context, d, dejong, e, flage, flagg, height, i, mouseX, mouseY, speed, width, x, y, colorr, colorb, colorg, trail, ms, pixels;

colorr = 160;
colorb = 160;
colorg = 80;

x = 1;

y = 1;

a = Math.random() * 4;

e = Math.random() * 4;

c = Math.random() * 4;

d = Math.random() * 4;

click = 0;

mouseX = 0;

mouseY = 0;

speed = 100;

i = 0;

flage = 0;

flagg = 0;

dejong = function(x, y) {
  var x2, y2;
  x2 = Math.sin(a * y) + (c * Math.cos(a * x));
  y2 = Math.sin(e * x) + (d * Math.cos(e * y));
  return [x2, y2];
};

height = window.innerHeight;

width = window.innerWidth;

if (height > width) {
  width = height;
}
else {
  height = width;
}

pixels = 10/width;

canvas = d3.select('body').append('canvas').attr('width', width).attr('height', height);

context = canvas.node().getContext('2d');

context.translate(width / 2, height / 2);

context.scale(150, 150);

document.addEventListener('click', function() {
  a = Math.random() * 4;
  e = Math.random() * 4;
  c = Math.random() * 4;
  d = Math.random() * 4;
  return console.log("pixels: " + pixels);
});

document.addEventListener('contextmenu', function() {
  colorr = Math.random() * 200;
  colorb = Math.random() * 200;
  colorg = Math.random() * 200;
});

//document.addEventListener("mousemove", function(e) {
//  mouseX = event.pageX;
//  mouseY = event.pageY;
//});

setInterval(function() {
  var b, g, r, ref;
    if (flage === 0) {
    e += Math.random() / speed;
  } else {
    e -= Math.random() / speed;
  }
  if (flagg === 0) {
    d -= Math.random() / speed;
  } else {
    d += Math.random() / speed;
  }
  if (e > 4) {
    a = a + (Math.random() / speed);
    flage = 1;
  } else if (e < -4) {
    a = a - (Math.random() / speed);
    flage = 0;
  }
  if (d < -4) {
    c = c + (Math.random() / speed);
    flagg = 1;
  } else if (d > 4) {
    c = c - (Math.random() / speed);
    flagg = 0;
  }
  trail = (Math.sin(2*e)/2.2)+0.5;
  context.globalCompositeOperation = 'source-over';
  context.fillStyle = "rgba(0,0,0," + trail + ")";
  context.fillRect(-500, -500, 1000, 1000);
  context.globalCompositeOperation = 'lighter';
  ms = (new Date).getTime();
  while (((new Date).getTime() - ms) < 25) {
    for (var i=0;i < 101;i++) {
      r = Math.floor(Math.abs(x) * colorr);
      b = Math.floor(Math.abs(y) * colorb);
      g = Math.floor(Math.abs(x + y) * colorg);
      context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 1)";
      ref = dejong(x, y);
      x = ref[0];
      y = ref[1];
      context.fillRect(x, y, pixels, pixels);
      context.stroke();
      context.restore();
    }
  }
}, 0);