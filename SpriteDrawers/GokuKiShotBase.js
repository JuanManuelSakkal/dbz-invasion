import GokuDrawerBase from "./GokuDrawerBase";
import Animator from "../Animator/Animator";

class GokuKiShotBase extends GokuDrawerBase {

    constructor(ctx) {
        super(ctx, 13, 218)
        this.width = 28
        this.height = 28
        this.sprites = [
            {
                offsetX: 0,
                offsetY: 0,
                width: this.width,
                height: this.height
            }, 
            {
                offsetX: 0,
                offsetY: 0,
                width: this.width + 10,
                height: this.height
            }, 
            {
                offsetX: 0,
                offsetY: 0,
                width: this.width + 21,
                height: this.height
            },
            {
                offsetX: 0,
                offsetY: 37,
                width: this.width,
                height: this.height
            }, 
            {
                offsetX: 0,
                offsetY: 37,
                width: this.width + 10,
                height: this.height
            }, 
            {
                offsetX: 0,
                offsetY: 37,
                width: this.width + 21,
                height: this.height
            }
        ]
        this.staggerAnim = 200
        this.animator = new Animator(ctx, this)
        this.scale = 2
    }

    drawAnimation(goku) {
        this.staggerAnim = goku.projectileSpawnRate / 3
        this.animator.drawAnimation(goku)
    }

}

export default GokuKiShotBase