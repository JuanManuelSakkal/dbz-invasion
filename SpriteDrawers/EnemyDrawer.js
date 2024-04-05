import Animator from "../Animator/Animator"
import { State } from "../classes/CharacterBase"
class EnemyDrawer {
    constructor(ctx, imagePath) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = imagePath
        this.animator = new Animator(ctx, this)
    }

    drawSprite(x, y, startC, startY, width, heigth, scale) {
            this.ctx.drawImage(this.image, 
                startC, 
                startY, 
                width,
                heigth, 
                x, y, 
                width * scale, 
                heigth * scale)
    }

    drawState(enemy, state){
        this.drawSprite(enemy.position.x, enemy.position.y, state.o.x, state.o.y, state.w, state.h, this.scale)

    }

    drawAnimation(enemy, loop = true, newState = State.idle) {
        this.animator.drawAnimation(enemy, loop, newState)
    }
}

export default EnemyDrawer