var step = 0
var open = false
chestlist =[]
var key = {}
var counter = 0


function Display(width,height){
	this.canvas = appendHTML('canvas', 'body')
	this.ctx = this.canvas.getContext('2d')

	this.canvas.width = width || 600
	this.canvas.height = height || 600

}

function Chest(x,y){
	this.x = x
	this.y = y
	this.img = loadimg('assets/chests.png')
}

var scrn = new Display(600,600)

function Player(){
	this.width = 32
	this.height = 32
	this.x = (scrn.canvas.width/2) -16
	this.y = (scrn.canvas.height/2) -16

	this.img = loadimg('assets/sprites.png')
	this.walkright = []
	this.walkleft =[]
	this.walkup = []
	this.walkdown = []
}

var player = new Player()

var chest = randomItemGen(Chest)
console.log(chest.x + " , " + chest.y)
loop()



	for(var i = 0; i < 5; i++){
	chestlist.push(randomItemGen(Chest))
	console.log('hi')
}


function loop(){
	update()
	render()
	

	window.requestAnimationFrame(loop)
}
function drawBackground(){
	scrn.ctx.fillStyle = 'black'
	scrn.ctx.fillRect(0,0,scrn.canvas.width,scrn.canvas.height)
}

function drawPlayer(){
	scrn.ctx.drawImage(player.img,0,0,player.width,player.height,player.x,player.y,player.width,player.height)
}

function randomItemGen(constructor){
	x = Math.random()*scrn.canvas.width | 0
	y = Math.random()*scrn.canvas.height | 0

	return new constructor(x,y)
}

function drawchest(){

for(var i in chestlist){
	scrn.ctx.drawImage(chestlist[i].img,32,32,32,32,chestlist[i].y,chestlist[i].x,25,25)
}	
}



function loadimg(imgpath){
	var img = new Image()
	img.src = imgpath
	return img
}

function appendHTML(tag,parent){
	var ele = document.createElement(tag)
	var p = document.querySelector(parent)
	p.appendChild(ele)
	return ele
}

document.addEventListener('click', function(e){
	if(open === true){
		open = false
	}else{
		open = true
	}
	console.log(open)
})

document.addEventListener('keydown', function(e){
	key[e.keyCode] = true
})

document.addEventListener('keyup', function(e){
	key[e.keyCode] = false
})


function render(){
	drawBackground()
	if(chestlist.length <= 5 ){
		drawchest()
	}
	drawPlayer()
}

function update(){
	//right
	if(key[68]){
		player.x += 5
	}
	//left
	if(key[65]){
		player.x -= 5
	}
	//up
	if(key[87]){
		player.y -= 5
	}
	//down
	if(key[83]){
		player.y += 5
	}
}