class GokuDrawerBase {
    constructor (ctx, formOffset, offset = {x: 0, y: 0}) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = "/sprites/goku.png"
        this.offset = offset
        this.setOffset(formOffset)
    }
    
    setOffset(offset){
        this.spriteOffsetX = offset.x + this.offset.x
        this.spriteOffsetY = offset.y + this.offset.y
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