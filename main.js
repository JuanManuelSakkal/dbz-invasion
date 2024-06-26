import './style.css'
import './css/myStyles.css'
import gokuDrawer from './SpriteDrawers/gokuIconsDrawer.js'
import Goku from './classes/Goku.js'
import Cell from './classes/Cell.js'
import Time from './classes/Time.js'
import EnemySpawner from './classes/EnemySpawner.js'
import SoundsPlayer from './classes/SoundsPlayer.js'

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

export const CANVAS_WIDTH = canvas.width = 600
export const CANVAS_HEIGHT = canvas.height = 600
const gokuIconsDrawer = gokuDrawer(ctx)
let goku = new Goku(ctx)
export const enemies = []
const enemySpawner = new EnemySpawner(ctx, enemies)

const HEALTH_BAR_ID = "health"
const KI_BAR_ID = "ki"
const EXP_BAR_ID = "exp"

const DOUBLE_TAP_WINDOW = 300
let lastKeydown = null
let lastKeyUp = null
let levelUp = true

let pause = true

let cellsKilled = 0

function resetGame(){
  goku = new Goku(ctx)
  enemies.splice(0, enemies.length)
  enemySpawner.reset()
  cellsKilled = 0
  document.getElementById("cell_count").innerHTML = cellsKilled
}

function setBar(id, value, maxValue){
  const bar = document.getElementById(id)
  bar.value = value
  bar.max = maxValue
}

function setHealthBar(health, maxHealth){
  setBar(HEALTH_BAR_ID, health, maxHealth)
}

function setKiBar(ki, maxKi){
  setBar(KI_BAR_ID, ki, maxKi)
}

function setExpBar(exp, maxExp){
  setBar(EXP_BAR_ID, exp, maxExp)
}

function setBars(character){
  setHealthBar(character.health, character.maxHealth)
  setKiBar(character.ki, character.maxKi)
  setExpBar(character.experience, character.experienceToNextLevel)
}

function setHUD(goku){
  document.getElementById("cell_count").innerHTML = cellsKilled
  document.getElementById("level").innerHTML = goku.level
  setBars(goku)
}

function drawBackground(){
  ctx.fillStyle = "rgb(247, 232, 190)"
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function draw(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  drawBackground()
  //ctx.drawImage(playerImage, spriteOffsetX, spriteOffsetY, spriteWidth, spriteHeight, 0, 0, spriteWidth*2, spriteHeight*2)
  //gokuIconsDrawer.drawSprite(0, 0, column, row, 2)
}

let shouldShowInfo = false
let infoSrc = "/sprites/Welcome sprite.png"
function setShowInfo(){
  shouldShowInfo = false
  switch(goku.level){
    case 1:
      infoSrc = "/sprites/Welcome sprite.png"
      shouldShowInfo = true
      break
    case 2:
      infoSrc = "/sprites/kishot learned sprite.png"
      shouldShowInfo = true
      break
    case 3:
      infoSrc = "/sprites/KameHameHa learned sprite.png"
      shouldShowInfo = true
      break
    case 5:
      infoSrc = "/sprites/Transform sprite.png"
      shouldShowInfo = true
      break
    case 8:
      infoSrc = "/sprites/Transform sprite.png"
      shouldShowInfo = true
      break
    case 10:
      infoSrc = "/sprites/Transform sprite.png"
      shouldShowInfo = true
      break
  }
}
function showInfo(){
    const image = new Image()
    image.src = infoSrc
    ctx.drawImage(image, 0, 0, 420, 310, 90, 145, 420, 310)
}

function update(time){
  Time.setTime(time ?? 0)   
  draw()
  if(!pause){
    levelUp = false

    enemySpawner.spawnWaves()

    goku.update()

    enemies.forEach((enemy, index) => {
      enemy.update()
      enemy.draw()
      if(enemy.deathTimer > enemy.timeToDisapear || enemy.reachedEnd){
        if(enemy.reachedEnd){
          goku.health -= enemy.damage
        }
        if(enemy.deathTimer > enemy.timeToDisapear ){
          cellsKilled++
          levelUp = goku.gainExperience(enemy.expDrop)
          if(levelUp) {
            setShowInfo()
            if(shouldShowInfo)
              pauseToggle()
          }
        }
        enemies.splice(index, 1)
      }
      
    })
    setHUD(goku)
    goku.draw()
    if(goku.health <= 0){
      alert("You Lost")
      resetGame()
    }       
  }
  if(levelUp){
    showInfo()
  }
  window.requestAnimationFrame(update)
}

function isDoubleTap(e) {
  let isDT = false
/*   if(lastKeydown && lastKeydown.key == e.key) {
    if(e.timeStamp - lastKeydown.timeStamp > DOUBLE_TAP_WINDOW) {
      lastKeydown = e
    } else if(lastKeyUp && lastKeyUp.key == e.key && e.timeStamp - lastKeyUp.timeStamp < DOUBLE_TAP_WINDOW) {
        isDT = true
        lastKeyUp = null
    }
  } else{
    lastKeydown = e
  } */
  return isDT
}

function pauseToggle(){
  pause = !pause
  if(!pause) {
    SoundsPlayer.playTheme()
  } else {
    SoundsPlayer.playTheme(false)
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'p') {
    pauseToggle()
  }
  if(pause) return
  const isDT = isDoubleTap(e)
  
  if (e.key === 'a') {
    isDT ? goku.blinkLeft() : goku.moveLeft()
  }
  if (e.key === 'd') {
    isDT ? goku.blinkRight() : goku.moveRight()
  }
  if (e.key === 'w') {
    isDT ? goku.blinkUp() : goku.moveUp()
  }
  if (e.key === 's') {
    isDT ? goku.blinkDown() : goku.moveDown()
  }
  if (e.key === 'q') {
    goku.kiUp()
  }
  if (e.key === 'e') {
    if(!goku.drawer.kiShotDrawer.animator.animationEnded)
      goku.kiShot()
  }
  if (e.key === 'f') {
      goku.chargeKameHameHa()
  }
  if (e.key === 'r') {
      goku.transform()
  }
  if (e.key === 'm') {
    SoundsPlayer.toggleMute()
  }
})

document.addEventListener('keyup', e => {
  
  if(pause) return
  lastKeyUp = e
  if(e.key === "a" || e.key === "d"){  
    goku.stopX()
  }
  if(e.key === "w" || e.key === "s"){  
    goku.stopY()
  }
  if (e.key === 'q') {
    goku.stop()
  }
  if (e.key === 'e') {
    goku.stop()
    goku.resetCounters()
  }
  if (e.key === 'f') {
    goku.fireKameHameHa()
  }
})

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
    let attackedEnemies = goku.collisionHandler.checksCollision(enemies)
    goku.baseAttack(attackedEnemies)
})
canvas.addEventListener('mouseup', e => {
  e.preventDefault()
  goku.setComboTimer()
  goku.stop()
})

update()


