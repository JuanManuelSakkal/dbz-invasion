import Cell from "./Cell"
import Time from "./Time"
class EnemySpawner {

    constructor(ctx, enemies) {
        this.ctx = ctx
        this.intervalTimer = 0
        this.enemies = enemies
    }

    spawnEnemyOnInterval(enemyType, interval) {
        this.intervalTimer += Time.deltaTime
        if(this.intervalTimer > interval) {
            this.intervalTimer = 0
            this.spawnEnemies(enemyType, 1)
        }
    }

    spawnEnemies(enemyType, amount) {
        switch(enemyType) {
            case "cell":
                for(let i = 0; i < amount; i++) {
                    this.enemies.push(new Cell(this.ctx, {x: 600, y: Math.random() * 550}, {x: -0.2, y: 0}))
                }
                break
        }
    }

}

export default EnemySpawner