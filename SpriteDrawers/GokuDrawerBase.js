class GokuDrawerBase {
    constructor (ctx, spriteOffsetX, spriteOffsetY) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = "/sprites/goku.png"
        this.spriteOffsetX = spriteOffsetX
        this.spriteOffsetY = spriteOffsetY
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
}

export default GokuDrawerBase