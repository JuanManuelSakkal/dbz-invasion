class SpriteDrawer {
    constructor(ctx, image, spriteWidth, spriteHeight, spriteColumns, spriteOffsetX, spriteOffsetY, spriteMarginX, spriteMarginY) {
        this.ctx = ctx
        this.image = image
        this.spriteWidth = spriteWidth
        this.spriteHeight = spriteHeight
        this.spriteColumns = spriteColumns
        this.spriteOffsetX = spriteOffsetX
        this.spriteOffsetY = spriteOffsetY
        this.spriteMarginX = spriteMarginX
        this.spriteMarginY = spriteMarginY
    }

    drawSprite(x, y, column, row, scale) {
        this.ctx.drawImage(this.image, 
            this.spriteOffsetX + (this.spriteWidth + this.spriteMarginX) * (column - 1), 
            this.spriteOffsetY + (this.spriteHeight + this.spriteMarginY) * (row - 1), 
            this.spriteWidth,
            this.spriteHeight, 
            x, y, 
            this.spriteWidth * scale, 
            this.spriteHeight * scale)
    }
}
export default SpriteDrawer