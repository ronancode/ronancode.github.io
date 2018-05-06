var canvas = document.getElementById('render');
var width = document.getElementById('fart').offsetWidth;
var height = document.getElementById('fart').offsetHeight;

canvas.height = height;
canvas.width = width;

var smaller_dimension;
if (height >= width) {
	smaller_dimension = width;
}
else {
	smaller_dimension = height;
}

console.log(width);
console.log(height);

context = canvas.getContext('2d');

var x = 1;
var y = 1;

var init_time = 0;

var points;

var pixel_size = 1;

var flage = 0;
var flagg = 0;

var speedx = 200;

var scale = 60*(smaller_dimension/300);

var art_r = 255;
var art_g = 123;
var art_b = 172;

var music_r = 160;
var music_g = 80;
var music_b = 160;

var art = false;
var music = false;

var a,e,c,d;
a = Math.random() * 4;
e = Math.random() * 4;
c = Math.random() * 4;
d = Math.random() * 4;

// Function to handle button mousovers
document.getElementById('music-nav').onmouseover = function () {
    music = true;
    console.log("music: " + music);
    document.getElementById("footer").style.backgroundColor = "rgba(0,0,0,1)";
    pixel_size = 20;
}

document.getElementById('music-nav').onmouseout = function () {
    music = false;
    console.log("music: " + music);
    document.getElementById("footer").style.backgroundColor = "rgba(0,0,0,1)";
    pixel_size = 1;
}
document.getElementById('art-nav').onmouseover = function () {
    art = true;
    console.log("art: " + art);
    document.getElementById("footer").style.backgroundColor = "rgba(" + art_r + "," + art_g + "," + art_b + ",1)";
}
document.getElementById('art-nav').onmouseout = function () {
    art = false;
    console.log("art: " + art);
    document.getElementById("footer").style.backgroundColor = "rgba(0,0,0,1)";
}

attractor = function(x, y) {
	var x2 = Math.sin(a * y) - (Math.cos(c * x));
	var y2 = Math.sin(e * x) - (Math.cos(d * y));
	return [x2, y2];
};

setInterval(function() {
	if (flage === 0) {
		e += Math.random() / speedx;
	} else {
		e -= Math.random() / speedx;
	}
	if (flagg === 0) {
		d -= Math.random() / speedx;
	} else {
		d += Math.random() / speedx;
	}
	if (e > 4) {
		a = a + (Math.random() / speedx);
		flage = 1;
	} else if (e < -4) {
		a = a - (Math.random() / speedx);
		flage = 0;
	}
	if (d < -4) {
		c = c + (Math.random() / speedx);
		flagg = 1;
	} else if (d > 4) {
		c = c - (Math.random() / speedx);
		flagg = 0;
	}
    context.fillStyle = "rgba(255,255,255,0.75)";
    context.fillRect(0,0, width, height);
	init_time = (new Date).getTime();
	while (((new Date).getTime() - init_time) < 28) {
		if (art == true) {
		    r = art_r;
		    b = art_b;
		    g = art_g;
		    context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 1)";
		}
		else if (music == true) {
		    r = Math.floor(Math.abs(x) * music_r);
		    b = Math.floor(Math.abs(y) * music_b);
		    g = Math.floor(Math.abs(x + y) * music_g);
		    context.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 1)";
		}
		else {context.fillStyle = "rgba(0,0,0,1)";}
		points = attractor(x,y);
		x = points[0];
		y = points[1];
        x_offset = (x*scale+(width/2));
        y_offset = (y*scale+(height/2));
		context.fillRect(x_offset,y_offset,pixel_size,pixel_size);
		context.stroke();
		context.restore();
	}
}, 0);
