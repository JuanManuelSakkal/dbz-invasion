import GokuDrawerBase from "./GokuDrawerBase"

class KiProjectileDrawer extends GokuDrawerBase {
    constructor(ctx, formOffset) {
        super(ctx, formOffset, { x: 49, y: 110 })
        this.width = 11
        this.height = 8
    }

    draw(x, y) {
        this.drawSprite(x, y, this.spriteOffsetX, this.spriteOffsetY, this.width, this.height, 2)
    }
}

export default KiProjectileDrawer
