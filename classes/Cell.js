import CellDrawer from "../SpriteDrawers/CellDrawer.js"
import CharacterBase, { State } from "./CharacterBase.js"
import Time from "./Time.js"
import CollisionHandler from "./CollisionHandler.js"
class Cell extends CharacterBase{

    constructor(ctx, position, speed){
        super(ctx, position, speed, 100, new CellDrawer(ctx))
        this.state = State.movingLeft
        this.collisionHandler = new CollisionHandler(this, {x: 52, y: 49})
        this.timeToRecover = 500
        this.timeToDisapear = 3000
        this.damageToKnock = 50
    }

    setState(newState){
        if(newState != State.takingDamage){
            this.damageToKnockCounter = 0
        }

        if(this.state == State.knockedOut && 
            newState != State.knockedOut &&
            newState != State.dead) {
            this.drawer.resetCounters()
        }

        this.state = newState
    }

    move(){
        this.position.x += this.speed.x * Time.deltaTime/10
        this.position.y += this.speed.y * Time.deltaTime/10
    }

    takeAttack(damage){
        this.takeDamage(damage)
    }


    update(){
        switch(this.state){
            case State.movingLeft:
                this.move()
                break
            case State.takingDamage:
                this.takingDamageTimer += Time.deltaTime
                if(this.takingDamageTimer > this.timeToRecover){
                    this.takingDamageTimer = 0
                    this.setState(State.movingLeft)
                }
                break
            case State.knockedOut:
                this.position.x += 1 * Time.deltaTime/10
                break
            case State.dead:
                this.deathTimer += Time.deltaTime
                break
        }
    }

}

export default Cell