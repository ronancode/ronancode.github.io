x = 1
y = 1
a = Math.random() * 4
e = Math.random() * 4
c = Math.random() * 4
d = Math.random() * 4
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
# context.globalCompositeOperation = 'lighter'
context.translate(width / 2, height / 2)
context.scale(60, 60)
document.addEventListener('click', ->
 console.log("a #{a} e #{e} c #{c} d #{d}")
)

# d3.timer ->
setInterval( ->
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = "rgba(0,0,0,0.2)"
    context.fillRect(-500, -500, 1000, 1000)
    context.globalCompositeOperation = 'lighter'
    while i < 7000
      r = Math.floor(Math.abs(x) * 150)
      b = Math.floor(Math.abs(y) * 150)
      context.fillStyle = "rgba(#{r}, 40, #{b}, 1)"
      [x, y] = dejong(x, y)
      i++
      context.fillRect(x, y, 0.01, 0.01)
      context.stroke()
      context.restore()
    i = 0
    if (flage == 0)
      e += (Math.random()/100)
    else 
      e -= (Math.random()/100)
    if (flagg == 0)
      d -= (Math.random()/100)
    else
      d += (Math.random()/100)
    if (e > 4)
      a = a + (Math.random()/100)
      flage = 1
    else if (e < -4)
      a = a - (Math.random()/100)
      flage = 0
    if (d < -4)
      c = c + (Math.random()/100)
      flagg = 1
    else if (d > 4)
      c = c - (Math.random()/100)
      flagg = 0
, 7)