import EnemyDrawer from "./EnemyDrawer";
import Animator from "../Animator/Animator";

class EnemyDamageDrawer extends EnemyDrawer {
    constructor(ctx, imagePath, idle, takingDamage, blocking, knockedOut, dead, scale) {
        super(ctx, imagePath)
        this.idle = idle
        this.takingDamage = takingDamage
        this.blocking = blocking
        this.knockedOut = knockedOut
        this.dead = dead
        this.scale = scale
    }

    drawIdle(character) {
        this.drawState(character, this.idle)
    }
    
    drawTakingDamage(character) {
        this.drawState(character, this.takingDamage)
    }
    drawBlocking(character) {
        this.drawState(character, this.blocking)
    }
    drawKnockedOut(character, newState = State.movingLeft) {
        this.sprites = this.knockedOut
        this.drawAnimation(character, false, newState)
    }
    drawDead(character) {
        this.drawState(character, this.dead)
    }
}

export default EnemyDamageDrawer