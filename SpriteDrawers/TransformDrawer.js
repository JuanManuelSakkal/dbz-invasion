import GokuDrawerBase from "./GokuDrawerBase";
import Animator from "../Animator/Animator";

class TransformDrawer extends GokuDrawerBase{
    constructor(ctx, formOffset) {
        super(ctx, formOffset, {x: 245,y: 65})
        this.width = 20
        this.height = 30
        this.sprites = []
        this.animator = new Animator(ctx, this)
        this.scale = 2
        this.staggerAnim = 300
    }
    drawAnimation(goku) {
        this.sprites = [
            {
                offsetX: 0,
                offsetY: 0,
                width: this.width,
                height: this.height
            },
            {
                offsetX: goku.form.nextForm.formOffset.x + this.offset.x - this.spriteOffsetX,
                offsetY: goku.form.nextForm.formOffset.y + this.offset.y - this.spriteOffsetY,
                width: this.width,
                height: this.height
            }
        ]
        this.animator.drawAnimation(goku)
    }
}

export default TransformDrawer