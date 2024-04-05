import GokuDrawerBase from "./GokuDrawerBase"
import TrailDrawer from "./TrailDrawer"

class KameHameHaDrawer extends GokuDrawerBase {
    constructor(ctx) {
        super(ctx, 86, 217)
        this.width = 20
        this.height = 28
        this.smallShotWidth = 28
        this.smallShotHeight = 25
        this.fullShotWidth = 41
        this.fullShotHeight = 39
        this.fullChargeOffsetY = 37
        this.firingOffsetX = 22
        this.sprites = []
        this.staggerAnim = 150
        this.spriteSmallShotTrail = {
            offsetX: 156,
            offsetY: 227,
            width: 8,
            height: 9
        }
        this.spriteFullShotTrail = {
            offsetX: 169,
            offsetY: 260,
            width: 10,
            height: 16
        }
        this.smallShotProjectileOffsetX = 57
        this.smallShotProjectileOffsetY = 4
        this.smallShotProjectileWidth = 29
        this.smallShotProjectileHeight = 21
        this.fullShotProjectileOffsetX = 72
        this.fullShotProjectileOffsetY = -4
        this.fullShotProjectileWidth = 46
        this.fullShotProjectileHeight = 35
    }

    drawCharging(goku) {
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX, this.spriteOffsetY, this.width, this.height, 2)
    }
    drawFullCharged(goku) {
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX, this.spriteOffsetY + this.fullChargeOffsetY, this.width, this.height, 2)
    }
    drawKameHameHa(goku) {
        this.sprites = this.spritesSmallShot
        //const trailDrawer = new TrailDrawer(this.ctx, this.spriteSmallShotTrail)
        const firingOffsetX = this.spriteOffsetX + this.firingOffsetX
        
        this.drawSprite(goku.position.x, goku.position.y, firingOffsetX , this.spriteOffsetY, this.width, this.height, 2)
        this.drawSprite(goku.position.x + this.firingOffsetX + this.width - 2, 
            goku.position.y + 2, 
            firingOffsetX + this.width, 
            this.spriteOffsetY + 2, this.smallShotWidth, this.smallShotHeight, 2)
        
        const trailScale = (goku.kameHameHaShot.position.x - (goku.position.x + this.firingOffsetX +this.width))  / this.spriteSmallShotTrail.width
        this.ctx.drawImage(this.image, 
            this.spriteSmallShotTrail.offsetX, 
            this.spriteSmallShotTrail.offsetY, 
            this.spriteSmallShotTrail.width,
            this.spriteSmallShotTrail.height, 
            goku.position.x + this.firingOffsetX + this.width - 2 + this.smallShotWidth + 27,
            goku.position.y + 18, 
            this.spriteSmallShotTrail.width * trailScale, 
            this.spriteSmallShotTrail.height * 2)

        this.drawSprite(goku.kameHameHaShot.position.x, goku.kameHameHaShot.position.y, 
            firingOffsetX + this.smallShotProjectileOffsetX,
            this.spriteOffsetY + this.smallShotProjectileOffsetY,
            this.smallShotProjectileWidth,
            this.smallShotProjectileHeight,
            2

        )

    }
    drawKameHameHaFullCharged(goku) {
        this.sprites = this.spritesFullShot
        
        const firingOffsetX = this.spriteOffsetX + this.firingOffsetX
        const fullChargeOffsetY = this.spriteOffsetY + this.fullChargeOffsetY

        this.drawSprite(goku.position.x, goku.position.y, firingOffsetX, fullChargeOffsetY, this.width, this.height, 2)
        this.drawSprite(goku.position.x + this.firingOffsetX + this.width - 2, 
            goku.position.y - 8, 
            firingOffsetX + this.width, 
            fullChargeOffsetY - 4, 
            this.fullShotWidth, this.fullShotHeight, 2)

        const trailScale = (goku.kameHameHaShot.position.x - (goku.position.x + this.firingOffsetX +this.width))  / this.spriteFullShotTrail.width
        this.ctx.drawImage(this.image, 
            this.spriteFullShotTrail.offsetX, 
            this.spriteFullShotTrail.offsetY, 
            this.spriteFullShotTrail.width,
            this.spriteFullShotTrail.height, 
            goku.position.x + this.firingOffsetX + this.width - 2 + this.fullShotWidth + 40,
            goku.position.y + 12, 
            this.spriteFullShotTrail.width * trailScale, 
            this.spriteFullShotTrail.height * 2)

        this.drawSprite(goku.kameHameHaShot.position.x, goku.kameHameHaShot.position.y, 
            firingOffsetX + this.fullShotProjectileOffsetX,
            fullChargeOffsetY + this.fullShotProjectileOffsetY,
            this.fullShotProjectileWidth,
            this.fullShotProjectileHeight,
            2

        )
    }

}
export default KameHameHaDrawer