import GokuMovementDrawerBase from "../SpriteDrawers/GokuMovementDrawerBase"
import GokuAttacksDrawerBase from "../SpriteDrawers/GokuAttacksDrawerBase"
import GokuKiUpDrawerBase from "../SpriteDrawers/GokuKiUpDrawerBase"
import GokuKiShotBase from "./GokuKiShotBase"
import KiProjectileDrawer from "./KiProjectileDrawer"
import KameHameHaDrawer from "./KameHameHaDrawer"
import {State} from "../classes/CharacterBase"
class GokuDrawer{
    constructor(ctx){
        this.movementDrawer = new GokuMovementDrawerBase(ctx)
        this.baseAttacksDrawer = new GokuAttacksDrawerBase(ctx)
        this.kiUpDrawer = new GokuKiUpDrawerBase(ctx)
        this.kiShotDrawer = new GokuKiShotBase(ctx)
        this.kiProjectileDrawer = new KiProjectileDrawer(ctx)
        this.kameHameHaDrawer = new KameHameHaDrawer(ctx)
    }

    resetCounters(){
        this.kiUpDrawer.animator.resetCounters()
        this.kiShotDrawer.animator.resetCounters()
    }

    drawProjectile(projectile){
        this.kiProjectileDrawer.draw(projectile.position.x, projectile.position.y)
    }

    draw(goku){
        switch(goku.state){
            case State.idle:
                this.movementDrawer.drawIdle(goku) 
                break
            case State.movingLeft:
                this.movementDrawer.drawMovingLeft(goku)
                break
            case State.movingRight:
                this.movementDrawer.drawMovingRight(goku)
                break
            case State.blinkHorizontal:
                this.movementDrawer.drawBlinkHorizontal(goku)
                break
            case State.blinkVertical:
                this.movementDrawer.drawBlinkVertical(goku)
                break
            case State.baseAttack:
                this.baseAttacksDrawer.drawAttack(goku)
                break
            case State.kiUp:
                this.kiUpDrawer.drawAnimation(goku)
                break
            case State.kiShot:
                this.kiShotDrawer.drawAnimation(goku)
                break
            case State.chargeKameHameHa:
                this.kameHameHaDrawer.drawCharging(goku)
                break
            case State.kameHameHaFullCharged:
                this.kameHameHaDrawer.drawFullCharged(goku)
                break
            case State.firingKameHameHa:
                this.kameHameHaDrawer.drawKameHameHa(goku)
                break
            case State.firingKameHameHaFullCharged:
                this.kameHameHaDrawer.drawKameHameHaFullCharged(goku)
                break
        }
    }
}

export default GokuDrawer