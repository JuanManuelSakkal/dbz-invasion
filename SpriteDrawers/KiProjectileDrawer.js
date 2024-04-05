import GokuDrawerBase from "./GokuDrawerBase"

class KiProjectileDrawer extends GokuDrawerBase {
    constructor(ctx) {
        super(ctx, 62, 227)
        this.width = 11
        this.height = 8
    }

    draw(x, y) {
        this.drawSprite(x, y, this.spriteOffsetX, this.spriteOffsetY, this.width, this.height, 2)
    }
}

export default KiProjectileDrawer
