import GokuDrawerBase from "./GokuDrawerBase"
class GokuMovementDrawerBase extends GokuDrawerBase {
    constructor(ctx, formOffset) {
        super(ctx, formOffset, {x: 0,y: 0})
        this.row = 1
        this.idleWidth = 21
        this.idleHeight = 29
        
        this.movingRightWidth = 24
        this.movingRightHeight = 28
        this.movingRightOffset = 46

        this.movingLeftWidth = 21
        this.movingLeftHeight = 28
        this.movingLeftOffset = 71

        this.blinkHorizontalWidth = 26
        this.blinkHorizontalHeight = 28
        this.blinkHorizontalOffset = 93

        this.blinkVerticalWidth = 15
        this.blinkVerticalHeight = 28
        this.blinkVerticalOffset = 124

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

    drawBlinkHorizontal(goku){
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX + this.blinkHorizontalOffset, this.spriteOffsetY, this.blinkHorizontalWidth, this.blinkHorizontalHeight, 2)
    }

    drawBlinkVertical(goku){
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX + this.blinkVerticalOffset, this.spriteOffsetY, this.blinkVerticalWidth, this.blinkVerticalHeight, 2)
    }
}

export default GokuMovementDrawerBase