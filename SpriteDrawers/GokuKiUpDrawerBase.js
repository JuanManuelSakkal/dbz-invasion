import GokuDrawerBase from "./GokuDrawerBase"
import Animator from "../Animator/Animator"
class GokuKiUpDrawerBase extends GokuDrawerBase {
    constructor(ctx, formOffset) {
        super(ctx, formOffset, {x: 145,y: -6})
        this.width = 40
        this.height = 35
        this.sprites = [
            {
                offsetX: 0,
                offsetY: 0,
                width: this.width,
                height: this.height
            }, 
            {
                offsetX: 43,
                offsetY: 0,
                width: this.width,
                height: this.height
            }, 
            {
                offsetX: 85,
                offsetY: 0,
                width: this.width,
                height: this.height
            }
        ]
        this.staggerAnim = 150
        this.animator = new Animator(ctx, this)
        this.scale = 2
    }

    drawAnimation(goku) {
        this.animator.drawAnimation(goku)
    }
}


export default GokuKiUpDrawerBase