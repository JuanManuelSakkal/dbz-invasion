import GokuMovementDrawerBase from "../SpriteDrawers/GokuMovementDrawerBase"
import GokuAttacksDrawerBase from "../SpriteDrawers/GokuAttacksDrawerBase"
import GokuKiUpDrawerBase from "../SpriteDrawers/GokuKiUpDrawerBase"
import GokuKiShotBase from "./GokuKiShotBase"
import KiProjectileDrawer from "./KiProjectileDrawer"
import KameHameHaDrawer from "./KameHameHaDrawer"
import {State} from "../classes/CharacterBase"
import TransformDrawer from "./TransformDrawer"
import SuperSaiyan4 from "../classes/GokuTransformations/SuperSaiyan4"
class GokuDrawer{
    constructor(ctx, formOffset){
        this.movementDrawer = new GokuMovementDrawerBase(ctx, formOffset)
        this.baseAttacksDrawer = new GokuAttacksDrawerBase(ctx, formOffset)
        this.kiUpDrawer = new GokuKiUpDrawerBase(ctx, formOffset)
        this.kiShotDrawer = new GokuKiShotBase(ctx, formOffset)
        this.kiProjectileDrawer = new KiProjectileDrawer(ctx, formOffset)
        this.kameHameHaDrawer = new KameHameHaDrawer(ctx, formOffset)
        this.transformDrawer = new TransformDrawer(ctx, formOffset)
    }

    setFormOffset(formOffset){
        this.movementDrawer.setOffset(formOffset)
        this.baseAttacksDrawer.setOffset(formOffset)
        this.kiUpDrawer.setOffset(formOffset)
        this.kiShotDrawer.setOffset(formOffset)
        this.kameHameHaDrawer.setOffset(formOffset)
        this.kiProjectileDrawer.setOffset(formOffset)
        this.transformDrawer.setOffset(formOffset)
    }

    resetCounters(){
        this.kiUpDrawer.animator.resetCounters()
        this.kiShotDrawer.animator.resetCounters()
    }

    drawProjectile(projectile, emisor){
        emisor.form instanceof SuperSaiyan4 ?
            this.kiProjectileDrawer.drawSuperShot(projectile.position.x, projectile.position.y) :
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
            case State.transforming:
                this.transformDrawer.drawAnimation(goku)
                break
        }
    }
}

export default GokuDrawer