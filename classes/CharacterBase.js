
export const State = {
    idle: "idle",
    movingLeft: "movingLeft",
    movingRight: "movingRight",
    baseAttack: "baseAttack",
    kiUp: "kiUp",
    kiShot: "kiShot",
    chargeKameHameHa: "chargeKameHameHa",
    kameHameHaFullCharged: "kameHameHaFullCharged",
    firingKameHameHa: "firingKameHameHa",
    firingKameHameHaFullCharged: "firingKameHameHaFullCharged",
    takingDamage: "takingDamage",
    blocking: "blocking",
    knockedOut: "knockedOut",
    dead: "dead"
}
class CharacterBase {
    constructor(ctx, position, speed, maxHealth, drawer) {
        this.ctx = ctx
        this.position = position
        this.speed = speed
        this.maxHealth = maxHealth
        this.health = maxHealth
        this.state = State.idle
        this.drawer = drawer
        this.takingDamageTimer = 0
        this.deathTimer = 0
        this.damageToKnockCounter = 0
    }
        
    moveLeft() {
        this.setState(State.movingLeft)
        this.speed.x = -1   
    }

    moveRight() {
        this.setState(State.movingRight)
        this.speed.x = 1   
    }

    moveUp() {
        this.speed.y = -1
    }

    moveDown() {
        this.speed.y = 1
    }

    die(){
        this.setState(State.knockedOut)
    }

    takeDamage(damage) {
        this.damageToKnockCounter += damage
        this.position.x += 10
        this.takingDamageTimer = 0
        this.health -= this.state == State.knockedOut ? 0 : damage
        if(this.health <= 0) {
            this.die() 
        }else if(this.damageToKnockCounter >= this.damageToKnock){
            this.setState(State.knockedOut)
        }else{
            this.setState(State.takingDamage)
        }
        
    }    
    draw() {
        this.drawer.draw(this)
    }
}

export default CharacterBase