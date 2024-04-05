import Time from "../classes/Time.js"
import { State } from "../classes/CharacterBase.js"
class Animator {

    constructor(ctx, spriteDrawer) {
        this.ctx = ctx
        this.spriteDrawer = spriteDrawer
        this.lastTime = 0
        this.animCounter = -1
        this.animationEnded = false
    }

    resetCounters(){
        this.lastTime = 0
        this.animCounter = -1
        this.animationEnded = false
    }

    drawFrame(x, y, frame){
        this.spriteDrawer.drawSprite(x, y, 
            this.spriteDrawer.spriteOffsetX + this.spriteDrawer.sprites[frame].offsetX, 
            this.spriteDrawer.spriteOffsetY + this.spriteDrawer.sprites[frame].offsetY,
            this.spriteDrawer.sprites[frame].width, 
            this.spriteDrawer.sprites[frame].height, 
            this.spriteDrawer.scale
        )
    }

    drawAnimation(character, loop = true, newState = State.idle) {
        if (this.lastTime + this.spriteDrawer.staggerAnim < Time.lastTime) {
            if (!loop && this.animationEnded){
                character.setState(newState)
                this.drawFrame(character.position.x, character.position.y, this.spriteDrawer.sprites.length - 1)
                return
            }
            this.lastTime = Time.lastTime
            this.animCounter = (this.animCounter + 1) % this.spriteDrawer.sprites.length
            if(this.animCounter == this.spriteDrawer.sprites.length - 1){
                this.animationEnded = true
            }
            
        }
        if(this.animCounter == -1) return
        this.drawFrame(character.position.x, character.position.y, this.animCounter)
    }
}

export default Animator