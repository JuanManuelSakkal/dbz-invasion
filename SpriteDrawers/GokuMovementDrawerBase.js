import GokuDrawerBase from "./GokuDrawerBase"
class GokuMovementDrawerBase extends GokuDrawerBase {
    constructor(ctx) {
        super(ctx, 13, 117)
        this.row = 1
        this.idleWidth = 19
        this.idleHeight = 29
        
        this.movingLeftWidth = 18
        this.movingLeftHeight = 28
        this.movingLeftOffset = 71
        
        this.movingRightWidth = 20
        this.movingRightHeight = 28
        this.movingRightOffset = 46
    }

    drawIdle(goku) {
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX, this.spriteOffsetY, this.idleWidth, this.idleHeight, 2)
    }
    drawMovingLeft(goku){
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX + this.movingLeftOffset, this.spriteOffsetY, this.movingLeftWidth, this.movingLeftHeight, 2)
    }
    drawMovingRight(goku){
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX + this.movingRightOffset, this.spriteOffsetY, this.movingRightWidth, this.movingRightHeight, 2)
    }
}

export default GokuMovementDrawerBase