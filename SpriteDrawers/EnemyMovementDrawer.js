import EnemyDrawer from "./EnemyDrawer"

class EnemyMovementDrawer extends EnemyDrawer{
    constructor(ctx, imagePath, idle, movingLeft, movingRight, scale = 1) {
        super(ctx, imagePath)
        this.idle = idle
        
        this.movingLeft = movingLeft
        
        this.movingRight = movingRight
        this.scale = scale
    }

    drawIdle(character) {
        this.drawState(character, this.idle)
    }
    drawMovingLeft(character){
        this.drawState(character, this.movingLeft)
    }
    drawMovingRight(character){
        this.drawState(character, this.movingRight)
    }
}

export default EnemyMovementDrawer