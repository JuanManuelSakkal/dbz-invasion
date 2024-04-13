import Time from "./Time"
import GokuDrawer from "../SpriteDrawers/GokuDrawer"
import KiProjectile from "./KiProjectile"
import { KameHameHaSmall, KameHameHaFull } from "./Particle"
import KameHameHaShot from "./KameHameHaShot"
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../main"
import CharacterBase, { State } from "./CharacterBase"
import CollisionHandler from "./CollisionHandler"
import BaseForm from "./GokuTransformations/BaseForm"
import SuperSaiyan from "./GokuTransformations/SuperSaiyan"

export const GokuPhase = {
    Base: 0,
    SJJ: 1
}
class Goku extends CharacterBase{
    constructor(ctx) {
        super(ctx, {x: 0, y: 0}, {x: 1, y: 1}, 100, new GokuDrawer(ctx, {x: 13, y: 117}))
        this.form = new BaseForm()
        this.drawer.setFormOffset(this.form.formOffset)
        this.ctx = ctx
        this.timeToCombo = 1000
        this.kameHameHaShot = null
        this.projectiles = []
        this.particles = []
        this.projectileSpawnRate = 500
        this.projectileTimer = 0
        this.kameHameHaTimer = 0
        this.kameHameHaChargingTime = 1000
        this.transformingTimer = 0
        this.transformingDuration = 3000
        this.transformationTimer = 0
        this.transformationTime = 0


        this.collisionHandler = new CollisionHandler(this, {x: 42, y: 50})

        this.setStats()

        this.level = 1
        this.experience = 0
        this.experienceToNextLevel = 100
    }

    setStats(){
        //stats
        this.maxHealth = this.form.maxHealth
        this.health = this.maxHealth
        this.maxKi = this.form.maxKi
        this.ki = this.maxKi
        this.kiChargingSpeed = this.form.kiChargingSpeed
        this.attackDamage = this.form.attackDamage
        this.maxSpeed = this.form.maxSpeed
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

        if(this.state == State.transforming && newState != State.idle){
            return
        }

        this.state = newState
    }

    transform(){
        if(this.level < this.form.nextForm.levelRequired) return
        this.setState(State.transforming)
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
            case State.transforming:
                this.transformingTimer += Time.deltaTime
                if(this.transformingTimer >= this.transformingDuration){
                    this.setState(State.idle)
                    this.transformingTimer = 0
                    this.form = this.form.nextForm
                    this.drawer.setFormOffset(this.form.formOffset)
                    this.setStats()
                }
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
        if(this.ki >= KameHameHaShot.kiConsumed && this.level > 2){
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
            enemy.takeAttack(this.attackDamage)
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
        if(this.ki >= KiProjectile.kiConsumed && this.level > 1){
            this.setState(State.kiShot)
        } else {
            this.setState(State.idle)
        }
    }


}

export default Goku