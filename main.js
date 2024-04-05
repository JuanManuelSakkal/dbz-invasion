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
const goku = new Goku(ctx)
export const enemies = []
const enemySpawner = new EnemySpawner(ctx, enemies)

function draw(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  //ctx.drawImage(playerImage, spriteOffsetX, spriteOffsetY, spriteWidth, spriteHeight, 0, 0, spriteWidth*2, spriteHeight*2)
  //gokuIconsDrawer.drawSprite(0, 0, column, row, 2)
}

function update(time){
  Time.setTime(time ?? 0)
  draw()

  enemySpawner.spawnEnemyOnInterval("cell", 1500)

  goku.update()
  enemies.forEach((enemy, index) => {
    enemy.update()
    enemy.draw()
    if(enemy.deathTimer > enemy.timeToDisapear || enemy.position.x < 0){
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

document.addEventListener('mousedown', e => {
    let attackedEnemies = goku.collisionHandler.checksCollision(enemies)
    goku.baseAttack(attackedEnemies)
})
document.addEventListener('mouseup', e => {
  goku.setComboTimer()
  goku.stop()
})

update()


