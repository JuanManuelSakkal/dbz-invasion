import Time from "./Time"
import GokuDrawer from "../SpriteDrawers/GokuDrawer"
import KiProjectile from "./KiProjectile"
import { KameHameHaSmall, KameHameHaFull } from "./Particle"
import KameHameHaShot from "./KameHameHaShot"
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../main"
import CharacterBase, { State } from "./CharacterBase"
import CollisionHandler from "./CollisionHandler"

class Goku extends CharacterBase{
    constructor(ctx) {
        super(ctx, {x: 0, y: 0}, {x: 0, y: 0}, 100, new GokuDrawer(ctx))
        this.ctx = ctx
        this.timeToCombo = 1000
        this.kameHameHaShot = null
        this.projectiles = []
        this.particles = []
        this.projectileSpawnRate = 500
        this.projectileTimer = 0
        this.kameHameHaTimer = 0
        this.kameHameHaChargingTime = 1000
        this.collisionHandler = new CollisionHandler(this, {x: 42, y: 50})
        this.kiChargingSpeed = 0.5

        //stats
        this.health = 100
        this.maxHealth = 100
        this.ki = 100
        this.maxKi = 100
        this.level = 1
        this.experience = 0
        this.experienceToNextLevel = 100
    }
    setState(newState){

        //move
        if(newState == State.chargeKameHameHa || 
            newState == State.kameHameHaFullCharged ||
            newState == State.firingKameHameHa ||
            newState == State.firingKameHameHaFullCharged){
                this.speed.x = 0
                this.speed.y = 0
        }

        //kiup
        if(this.state == State.kiUp && newState != State.kiUp){
            this.position.x += 22
            this.position.y += 12
        }
        if(this.state != State.kiUp && newState == State.kiUp){
            this.position.x -= 22
            this.position.y -= 12
        }

        //charging kamehameha
        if(newState == State.chargeKameHameHa && this.state == State.kameHameHaFullCharged) return

        //firing kamehameha
        if(newState == State.firingKameHameHa){
            this.kameHameHaTimer = 0
            if(this.state != State.kameHameHaFullCharged && this.state != State.chargeKameHameHa){
                newState = this.state
            }
            if(this.state == State.kameHameHaFullCharged){
                newState = State.firingKameHameHaFullCharged
            }
        }

        if(newState != State.firingKameHameHa && newState != State.firingKameHameHaFullCharged){
            this.kameHameHaShot = null
        }

        this.state = newState
    }

    levelUp(){
        this.level += 1
        this.experienceToNextLevel *= 1.2  
        this.experience = 0
        this.ki = this.maxKi
        this.health = this.maxHealth

    }

    gainExperience(exp){
        this.experience += exp
        if(this.experience >= this.experienceToNextLevel){
            this.levelUp()
        }
    }

    blinkLeft(){
        this.setState(State.blinkHorizontal)
        this.position.x -= 100
    }
    blinkRight(){
        this.setState(State.blinkHorizontal)
        this.position.x += 100
    }
    blinkUp(){
        this.setState(State.blinkVertical)
        this.position.y -= 100
    }
    blinkDown(){
        this.setState(State.blinkVertical)
        this.position.y += 100
    }
    move(){
        this.position.x += this.speed.x * Time.deltaTime/10
        this.position.y += this.speed.y * Time.deltaTime/10
        if(this.position.x < 0) this.position.x = 0
        if(this.position.y < 0) this.position.y = 0
        if(this.position.x > CANVAS_WIDTH - 40) this.position.x = CANVAS_WIDTH - 40
        if(this.position.y > CANVAS_HEIGHT - 55) this.position.y = CANVAS_HEIGHT - 55
    }
    update(){
        switch(this.state){
            case State.kiShot:
                this.spawnKiProjectile()
                break
            case State.chargeKameHameHa:
                this.setKameHameHaTimer()
                this.particles.push(new KameHameHaSmall(this, 5, 30))
                break
            case State.kameHameHaFullCharged:
                this.particles.push(new KameHameHaFull(this, 5, 30))
                break
            case State.firingKameHameHa:
                this.speed.y = 0
                if(!this.kameHameHaShot){
                    console.log(this.kameHameHaShot)
                    this.ki -= KameHameHaShot.kiConsumed
                    this.kameHameHaShot = new KameHameHaShot(this, {x: 57, y: 6}, {x: 5, y: 0})
                }
                break
            case State.firingKameHameHaFullCharged:
                this.speed.y = 0
                if(!this.kameHameHaShot){
                    this.ki -= KameHameHaShot.kiConsumed
                    this.kameHameHaShot = new KameHameHaShot(this, {x: 62, y: -7}, {x: 5, y: 0})
                }
                break
            case State.kiUp:
                this.ki += this.kiChargingSpeed * Time.deltaTime/10
                this.ki = this.ki > this.maxKi ? this.maxKi : this.ki
                break
        }

        this.move()
        this.projectileTimer += Time.deltaTime
        this.projectiles.forEach((projectile, index) => {
            projectile.update()
            this.drawer.drawProjectile(projectile)
            projectile.particles.forEach((particle, index) => {
                particle.update()
                if(particle.markedForDeletion)
                    projectile.particles.splice(index, 1)
                else
                    particle.draw(this.ctx)
            })

            if(projectile.position.x < 0 || projectile.position.x > 600 || projectile.position.y < 0 || projectile.position.y > 600){
                this.projectiles.splice(index, 1)
            }
            
        })

        this.particles.forEach((particle, index) => {
            particle.update()
            if(particle.markedForDeletion)
                this.particles.splice(index, 1)
            else
                particle.draw(this.ctx)
        })

        
        if(this.kameHameHaShot){
            this.kameHameHaShot.update()
        }
    }

    setKameHameHaTimer(){
        this.kameHameHaTimer += Time.deltaTime
        if(this.kameHameHaTimer > this.kameHameHaChargingTime){
            this.kameHameHaTimer = 0
            this.setState(State.kameHameHaFullCharged)
        }
    }
    spawnKiProjectile(){
        if(this.projectileTimer > this.projectileSpawnRate){
            this.ki -= KiProjectile.kiConsumed
            this.projectiles.push(new KiProjectile(this))
            this.projectileTimer = 0
        }
    }

    chargeKameHameHa(){
        if(this.ki >= KameHameHaShot.kiConsumed){
            this.setState(State.chargeKameHameHa)
        }
    }

    fireKameHameHa(){
        this.setState(State.firingKameHameHa)
    }

    baseAttack(enemies){
        if(Time.lastTime - this.comboTimer > this.timeToCombo)
            this.drawer.baseAttacksDrawer.attackCounter = 0
        this.setState(State.baseAttack)
        this.position.x += 10
        enemies.forEach((enemy, index) => {
            enemy.takeAttack(10)
        })
    }

    setComboTimer(){
        if(Time.lastTime - this.comboTimer < this.timeToCombo)
            this.drawer.baseAttacksDrawer.attackCounter++

        this.comboTimer = Time.lastTime
    }

    resetCounters(){
        this.drawer.resetCounters()
    }

    stop(){
        this.setState(State.idle)
        this.speed = {
            x: 0,
            y: 0
        }
    }
    stopX(){
        this.setState(State.idle)
        this.speed.x = 0
    }
    stopY(){
        this.speed.y = 0
    }

    kiUp(){
        this.setState(State.kiUp)
    }
    
    kiShot(){
        if(this.ki >= KiProjectile.kiConsumed){
            this.setState(State.kiShot)
        } else {
            this.setState(State.idle)
        }
    }


}

export default Goku