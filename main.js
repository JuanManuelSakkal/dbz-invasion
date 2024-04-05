import './style.css'
import './css/myStyles.css'
import gokuDrawer from './SpriteDrawers/gokuIconsDrawer.js'
import Goku from './classes/Goku.js'
import Cell from './classes/Cell.js'
import Time from './classes/Time.js'
import EnemySpawner from './classes/EnemySpawner.js'

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

let cellsKilled = 0

function resetGame(){
  goku = new Goku(ctx)
  enemies.splice(0, enemies.length)
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

function setBars(character){
  setHealthBar(character.health, character.maxHealth)
  setKiBar(character.ki, character.maxKi)
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

function update(time){
  Time.setTime(time ?? 0)
  draw()

  enemySpawner.spawnEnemyOnInterval("cell", 2500)

  goku.update()
  setBars(goku)

  enemies.forEach((enemy, index) => {
    enemy.update()
    enemy.draw()
    if(enemy.deathTimer > enemy.timeToDisapear || enemy.reachedEnd){
      if(enemy.reachedEnd){
        goku.health -= enemy.damage
        if(goku.health <= 0){
          alert("You Lost")
          resetGame()
        }
      }
      if(enemy.deathTimer > enemy.timeToDisapear ){
        cellsKilled++
        document.getElementById("cell_count").innerHTML = cellsKilled
      }
      enemies.splice(index, 1)
    }
  })
  goku.draw()
  window.requestAnimationFrame(update)
}

document.addEventListener('keydown', e => {
  if (e.key === 'a') {
    goku.moveLeft()
  }
  if (e.key === 'd') {
    goku.moveRight()
  }
  if (e.key === 'w') {
    goku.moveUp()
  }
  if (e.key === 's') {
    goku.moveDown()
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
})

document.addEventListener('keyup', e => {
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


