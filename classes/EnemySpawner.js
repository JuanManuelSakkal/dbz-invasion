import Cell from "./Cell"
import Time from "./Time"

class EnemySpawner {

    constructor(ctx, enemies) {
        this.ctx = ctx
        this.intervalTimer = 0
        this.enemies = enemies
        this.initialSpeed = -0.2
        this.initialInterval = 4000
        this.speed = this.initialSpeed
        this.interval = this.initialInterval
        this.waveTimer = 0
        this.waveDelay = 10000
        this.waveDuration = 40000
        this.wave = 1
    }

    spawnWaves(){
        document.getElementById("wave").innerHTML = this.wave
        this.waveTimer += Time.deltaTime
        if(this.waveTimer < this.waveDuration) {
            this.spawnEnemyOnInterval("cell", this.interval)
        } else {
            if(this.enemies.length == 0 && this.waveTimer > this.waveDelay + this.waveDuration) {
                this.waveTimer = 0
                this.wave++
                this.increaseLevel()
            }
        }
    }

    spawnEnemyOnInterval(enemyType, interval) {
        this.intervalTimer += Time.deltaTime
        if(this.intervalTimer > interval) {
            this.intervalTimer = 0
            this.spawnEnemies(enemyType, 1)
        }
    }

    increaseLevel() {
        this.interval *= 0.9
        this.speed *= 1.1
    }

    spawnEnemies(enemyType, amount) {
        switch(enemyType) {
            case "cell":
                for(let i = 0; i < amount; i++) {
                    this.enemies.push(new Cell(this.ctx, {x: 600, y: Math.random() * 550}, {x: this.speed, y: 0}))
                }
                break
        }
    }

}

export default EnemySpawner