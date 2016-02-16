x = 1
y = 1
a = Math.random() * 4
e = Math.random() * 4
c = Math.random() * 4
d = Math.random() * 4
click = 0
mouseX = 0
mouseY = 0
speed = 100
i = 0
flage = 0
flagg = 0

dejong = (x, y) ->
 x2 = Math.sin(a * y) + (c * Math.cos(a * x))
 y2 = Math.sin(e * x) + (d * Math.cos(e * y))
 [x2, y2]

width = 750
height = 750
canvas = d3.select('body').append('canvas').attr('width', width).attr('height', height)
context = canvas.node().getContext('2d')
context.translate(width / 2, height / 2)
context.scale(60, 60)
document.addEventListener('click', ->
  a = Math.random() * 4
  e = Math.random() * 4
  c = Math.random() * 4
  d = Math.random() * 4
  click = 1
#  console.log("blah")
)

document.addEventListener("mousemove", (e) -> 
 mouseX = event.pageX
 mouseY = event.pageY)

setInterval( ->
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = "rgba(0,0,0,0.2)"
    context.fillRect(-500, -500, 1000, 1000)
    context.globalCompositeOperation = 'lighter'
    while i < 7000
      r = Math.floor(Math.abs(x) * 100)
      b = Math.floor(Math.abs(y) * 100)
      if (click == 1)
        g = Math.floor((mouseX)/5)
      else
        g = 40
      context.fillStyle = "rgba(#{r}, #{g}, #{b}, 1)"
      [x, y] = dejong(x, y)
      i++
      context.fillRect(x, y, 0.01, 0.01)
      context.stroke()
      context.restore()
    i = 0
    if (flage == 0)
      e += (Math.random()/speed)
    else 
      e -= (Math.random()/speed)
    if (flagg == 0)
      d -= (Math.random()/speed)
    else
      d += (Math.random()/speed)
    if (e > 4)
      a = a + (Math.random()/speed)
      flage = 1
    else if (e < -4)
      a = a - (Math.random()/speed)
      flage = 0
    if (d < -4)
      c = c + (Math.random()/speed)
      flagg = 1
    else if (d > 4)
      c = c - (Math.random()/speed)
      flagg = 0
, 7)