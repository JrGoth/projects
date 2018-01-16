var open = false
chestlist =[]
var key = {}
var score = 0


function Display(width,height){
	this.canvas = appendHTML('canvas', 'body')
	this.ctx = this.canvas.getContext('2d')

	this.canvas.width = width || 600
	this.canvas.height = height || 600

}

var scrn = new Display(600,600)

function Chest(x,y){
	this.x = x
	this.y = y
	this.sx = checkChestX()
	this.sy = checkChestY()
	this.img = loadimg('assets/chests.png')
}

function Player(){
	this.width = 32
	this.height = 32
	this.x = (scrn.canvas.width/2) -16
	this.y = (scrn.canvas.height/2) -16

	this.sx = 4
	this.sy = 4

	this.img = loadimg('assets/sprites.png')
	this.walkRightX = [4,3,5]
	this.walkRightY = [6,6,6]
	this.walkLeftX =[4,3,5]
	this.walkLeftY =[5,5,5]
	this.walkUpX = [4,3,5]
	this.walkUpY = [7,7,7]
	this.walkDownX = [4,3,5]
	this.walkDownY = [4,4,4]
	this.step = 0
}
//iniatilize objects
var player = new Player()
var chest = randomItemGen(Chest)

loop()


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
	scrn.ctx.drawImage(player.img,player.sx*player.width,player.sy*player.height,player.width,player.height,player.x,player.y,player.width,player.height)
}

function randomItemGen(constructor){
	x = (Math.random()*(scrn.canvas.width - 32)) | 0
	y = (Math.random()*(scrn.canvas.height - 32)) | 0

	return new constructor(x,y)
}

function checkChestX(){
	var sx
	if(open){
		sx = 32
	}else{
		sx = 32
	}
	return sx
}

function checkChestY(){
	var sy
	if(open){
		sx = 32
	}else{
		sy = 0
	}
	return sy
}	


function drawchest(){
	if(chestlist.length < 3){
		for(var i = 0; i < 1; i++){
			chestlist.push(randomItemGen(Chest))
		}
	}

	for(var i in chestlist){
		scrn.ctx.drawImage(chestlist[i].img,chestlist[i].sx,chestlist[i].sy,32,32,chestlist[i].x,chestlist[i].y,32,32)

		if((player.x + 32) >= chestlist[i].x && (player.x) <= (chestlist[i].x +32) &&
			(player.y + 32) >= chestlist[i].y && (player.y) <= (chestlist[i].y +32)){
			delete chestlist[i]
			score += 100
			console.log(score)
			setTimeout(function(){
				for(var i = 0; i < 1; i++){
				chestlist.push(randomItemGen(Chest))
			}
			},2000)
			
		}
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
	drawchest()
	drawPlayer()
}

function update(){
	//right
	if(key[68]){
		var step = (player.step % player.walkRightX.length) | 0
		player.x += 1
		player.sx = player.walkRightX[step]
		player.sy = player.walkRightY[step]
		player.step+=.1
	}
	//left
	if(key[65]){
		var step = (player.step % player.walkRightX.length) | 0
		player.x -= 1
		player.sx = player.walkLeftX[step]
		player.sy = player.walkLeftY[step]
		player.step+=.1
	}
	//up
	if(key[87]){
		var step = (player.step % player.walkRightX.length) | 0
		player.y -= 1
		player.sx = player.walkUpX[step]
		player.sy = player.walkUpY[step]
		player.step+=.1
	}
	//down
	if(key[83]){
		var step = (player.step % player.walkRightX.length) | 0
		player.y += 1
		player.sx = player.walkDownX[step]
		player.sy = player.walkDownY[step]
		player.step+= .1
	}
}

