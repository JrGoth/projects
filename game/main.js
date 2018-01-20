var count = 0
var open = false
var scoretext = []
var chestlist = []
var PowerUplist = []
var monsterlist = []
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
	this.count = 0
}

function Player(){
	this.width = 32
	this.height = 32
	this.x = (scrn.canvas.width/2) -16
	this.y = (scrn.canvas.height/2) -16

	this.sx = 4
	this.sy = 4

	this.velx = 2.5
	this.vely = 2.5

	this.buff = 0
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

function Monster(x,y){
	this.width = 32
	this.height = 32
	this.x = x
	this.y = y

	this.sx = 4
	this.sy = 4

	this.velx = 2.5
	this.vely = 2.5
	this.edge = false

	this.img = loadimg('assets/bat.png')
	this.walkRightX = [2,3,2,1]
	this.walkRightY = [1,1,1,1]
	this.walkLeftX =[2,3,2,1]
	this.walkLeftY =[3,3,3,3]
	this.walkUpX = [2,3,2,1]
	this.walkUpY = [2,2,2,2]
	this.walkDownX = [2,3,2,1]
	this.walkDownY = [1,1,1,1]
	this.step = 0
	this.timer = 0
}

function PowerUps(x,y){
	this.x = x
	this.y = y
	this.width = 8
	this.height = 8
	this.color = 'red'
	this.timer = 0

}

function LeaderBoard(){
	this.container = appendHTML('div','body')
	this.scoreboard = this.container
	this.scoreboard.id = 'scoreboard'
	
}


//iniatilize objects
var leaderBoard = new LeaderBoard()
var player = new Player()
var chest = randomItemGen(Chest)
var pwrUps = randomItemGen(PowerUps)
var bat = randomItemGen(Monster)

//main program function calls
loop()



var newScore = 0
//utils
function loop(){
	update()
	render()

	window.requestAnimationFrame(loop)
}



function drawBackground(){
	var background = loadimg('assets/throne.jpg')
	//scrn.ctx.fillStyle = 'black'
	scrn.ctx.drawImage(background,0,0,background.width,background.height,0,0,scrn.canvas.width,scrn.canvas.height)
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
	chest.count ++
	if(chest.count === 120 && chestlist.length <= 5){
		for(var i = 0; i < 1; i++){
			chestlist.push(randomItemGen(Chest))
		}
		chest.count = 0
	}

	for(var i in chestlist){
		scrn.ctx.drawImage(chestlist[i].img,chestlist[i].sx,chestlist[i].sy,32,32,chestlist[i].x,chestlist[i].y,32,32)

		if((player.x + 32) >= chestlist[i].x && (player.x) <= (chestlist[i].x +32) &&
			(player.y + 32) >= chestlist[i].y && (player.y) <= (chestlist[i].y +32)){
			delete chestlist[i]
			score += 100
			setTimeout(function(){
				chestlist.push(randomItemGen(Chest))	
			},2000)
					

			
		}
	}	
}


function loadimg(imgpath){
	var img = new Image()
	img.src = imgpath
	return img
}

function appendHTML(tag,parent,text){
	var ele = document.createElement(tag)
	if(tag === 'p'){
		var t = document.createTextNode(text)
		ele.appendChild(t)
	}else{
	text = ""
	}
	var p = document.querySelector(parent)
	p.appendChild(ele)	
	return ele
}

document.addEventListener('keydown', function(e){
	key[e.keyCode] = true
})

document.addEventListener('keyup', function(e){
	key[e.keyCode] = false
})


function render(){
	scrn.ctx.clearRect(0,0,scrn.canvas.width,scrn.canvas.height)
	drawBackground()
	drawPowerUps()
	drawchest()
	drawMonster()
	drawPlayer()
}

function update(){
	updateScore()
	controls()
}

function controls(){
			//right
		if(key[68]){
			if(player.x + 32 <= scrn.canvas.width){
				var step = (player.step % player.walkRightX.length) | 0
				player.x += player.velx + player.buff
				player.sx = player.walkRightX[step]
				player.sy = player.walkRightY[step]
				player.step+=.1	
			}
			
		}
		//left
		if(key[65]){
			if(player.x > 0){
				var step = (player.step % player.walkRightX.length) | 0
				player.x -= player.velx + player.buff
				player.sx = player.walkLeftX[step]
				player.sy = player.walkLeftY[step]
				player.step+=.1	
			}
			
		}
		//up
		if(key[87]){
			if(player.y > 0){
				var step = (player.step % player.walkRightX.length) | 0
				player.y -= player.vely + player.buff
				player.sx = player.walkUpX[step]
				player.sy = player.walkUpY[step]
				player.step+=.1	
			}
			
		}
		//down
		if(key[83]){
			if(player.y + 32 < scrn.canvas.height){
				var step = (player.step % player.walkRightX.length) | 0
				player.y += player.vely + player.buff
				player.sx = player.walkDownX[step]
				player.sy = player.walkDownY[step]
				player.step+= .1	
				}			
			}	
}

function updateScore(){


	if(newScore < score){
		newScore = score
		
		var y = appendHTML('p','#scoreboard',"Score: " + score.toString())
			scoretext.push(y)
			if(scoretext.length > 1){
				scoretext[0].remove()
				scoretext.splice(0,1)				
			}
		}
}

function drawPowerUps(){
	count ++
	if(count === 600){
		PowerUplist.push(randomItemGen(PowerUps))
		count = 0
		}
		for(var pwrup in PowerUplist){
			scrn.ctx.fillStyle = PowerUplist[pwrup].color
			scrn.ctx.fillRect(PowerUplist[pwrup].x,PowerUplist[pwrup].y,PowerUplist[pwrup].width,PowerUplist[pwrup].height)

			if((player.x + 32) >= PowerUplist[pwrup].x && (player.x) <= (PowerUplist[pwrup].x + 8) &&
				(player.y + 32) >= PowerUplist[pwrup].y && (player.y) <= (PowerUplist[pwrup].y + 8)){
				delete PowerUplist[pwrup]
				speedBuff()
				}
			}
	if(PowerUplist.length === 1){
		pwrUps.timer ++
			if (pwrUps.timer === 180){
				PowerUplist.splice(0,1)
				pwrUps.timer = 0
			}
		}

}

function speedBuff(){
	player.buff = player.velx * 2
	setTimeout(function(){
		player.buff = 0
	},3000)
}

function drawMonster(){
	bat.timer++
	if(bat.timer === 180){
		monsterlist.push(randomItemGen(Monster))
		bat.timer = 0
	}
	
	for(var mons in monsterlist){
		scrn.ctx.drawImage(monsterlist[mons].img,monsterlist[mons].sx,monsterlist[mons].sy,32,32,
		monsterlist[mons].x,monsterlist[mons].y,32,32)
		if(monsterlist[mons].edge === false ){
			monsterlist[mons].x += 2
			if(monsterlist[mons].x + 32 === scrn.canvas.width){
				monsterlist[mons].edge = true
				console.log(monsterlist[mons].edge)
			}
		}
		if(monsterlist[mons].edge === true){
			monsterlist[mons].x -= 2
			if(monsterlist[mons].x === 0){
				monsterlist[mons].edge = false

			}
		}


	}
}