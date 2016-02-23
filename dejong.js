var a, c, canvas, click, context, d, dejong, e, flage, flagg, height, i, mouseX, mouseY, speed, width, x, y, opt, colorr, colorb, colorg, trail, ms, pixels;

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

opt = 1;

attractor = function(x, y, opt) {
  // if (opt == 0) {       //Clifford
  //   var x2 = Math.sin(a * y) + (c * Math.cos(a * x));
  //   var y2 = Math.sin(e * x) + (d * Math.cos(e * y));
  //   return [x2, y2];
  // }
  if (opt == 0) {      //Dejong
    var x2 = Math.sin(a * y) - (Math.cos(c * x));
    var y2 = Math.sin(e * x) - (Math.cos(d * y));
    return [x2, y2];
  }
  else {
    var x2 = (d * Math.sin(a * y)) - (Math.sin(e * x));
    var y2 = (c * Math.cos(a * x)) + (Math.cos(e * y));
    return [x2, y2];
  }
  // else {
  //   var x2 = Math.pow(x,2) - Math.pow(y,2) + (a * x) + (e * y);
  //   var y2 = (2 * x * y) + (c * x) + (d * y);
  //   console.log("test" + x2 + y2);
  //   return [x2, y2];
  // }
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

context.scale(100, 100);

document.addEventListener('click', function() {
  a = Math.random() * 4;
  e = Math.random() * 4;
  c = Math.random() * 4;
  d = Math.random() * 4;
  opt = Math.floor(Math.random() * 2)
  //return console.log("pixels: " + pixels);
});

document.addEventListener('contextmenu', function() {
  colorr = Math.random() * 300;
  colorb = Math.random() * 300;
  colorg = Math.random() * 300;
  return console.log("colors: " + colorr + " " + colorb + " " + colorg)
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
  trail = (Math.sin(e)/4.2)+0.3;
  context.globalCompositeOperation = 'source-over';
  context.fillStyle = "rgba(0,0,0," + trail + ")";
  context.fillRect(-500, -500, 1000, 1000);
  context.globalCompositeOperation = 'lighter';
  ms = (new Date).getTime();
  while (((new Date).getTime() - ms) < 28) {
    for (var i=0;i < 101;i++) {
      r = Math.floor(Math.abs(x) * colorr);
      b = Math.floor(Math.abs(y) * colorb);
      g = Math.floor(Math.abs(x + y) * colorg);
      context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 1)";
      ref = attractor(x, y, opt);
      x = ref[0];
      y = ref[1];
      context.fillRect(x, y, pixels, pixels);
      context.stroke();
      context.restore();
    }
  }
}, 0);