import GokuDrawerBase from "./GokuDrawerBase"
import SuperSaiyan4 from "../classes/GokuTransformations/SuperSaiyan4"

class KameHameHaDrawer extends GokuDrawerBase {
    constructor(ctx, formOffset) {
        super(ctx, formOffset, {x: 73, y: 100})
        this.width = 20
        this.height = 28
        this.smallShotWidth = 28
        this.smallShotHeight = 25
        this.fullShotWidth = 41
        this.fullShotHeight = 39
        this.x10ShotWidth = 46
        this.x10ShotHeight = 41
        this.fullChargeOffsetY = 37
        this.x10ChargeOffsetY = 79
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
        this.spriteX10ShotTrail = {
            offsetX: 541,
            offsetY: 294,
            width: 11,
            height: 20
        }
        this.smallShotProjectileOffsetX = 57
        this.smallShotProjectileOffsetY = 4
        this.smallShotProjectileWidth = 29
        this.smallShotProjectileHeight = 21
        this.fullShotProjectileOffsetX = 72
        this.fullShotProjectileOffsetY = -4
        this.fullShotProjectileWidth = 46
        this.fullShotProjectileHeight = 35
        
        this.ssj4FullShotProjectileOffsetX = 76

        this.ssj4X10ProjectileOffsetX = 84
        this.ssj4X10ProjectileOffsetY = -6
        this.ssj4X10ProjectileWidth = 47
        this.ssj4X10ProjectileHeight = 38
    }

    drawCharging(goku) {
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX, this.spriteOffsetY, this.width, this.height, 2)
    }
    drawFullCharged(goku) {
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX, this.spriteOffsetY + this.fullChargeOffsetY, this.width, this.height, 2)
    }

    drawSmallKameHameHa(goku) {
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

    drawBigKameHameHa(goku) {
        
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
            firingOffsetX + (goku.form instanceof SuperSaiyan4 ? this.ssj4FullShotProjectileOffsetX : this.fullShotProjectileOffsetX),
            fullChargeOffsetY + this.fullShotProjectileOffsetY,
            this.fullShotProjectileWidth,
            this.fullShotProjectileHeight,
            2

        )
    }

    drawKameHameHaX10(goku) {
        const firingOffsetX = this.spriteOffsetX + this.firingOffsetX + 2
        const x10ChargeOffsetY = this.spriteOffsetY + this.x10ChargeOffsetY

        this.drawSprite(goku.position.x, goku.position.y, firingOffsetX, x10ChargeOffsetY, this.width + 6, this.height, 2)
        
        this.drawSprite(goku.position.x + this.firingOffsetX + this.width + 2, 
            goku.position.y - 10, 
            firingOffsetX + this.width + 6, 
            x10ChargeOffsetY - 6, 
            this.x10ShotWidth, this.x10ShotHeight, 2)

        const trailScale = (goku.kameHameHaShot.position.x - (goku.position.x + this.firingOffsetX +this.width))  / this.spriteX10ShotTrail.width
        this.ctx.drawImage(this.image, 
            this.spriteX10ShotTrail.offsetX, 
            this.spriteX10ShotTrail.offsetY, 
            this.spriteX10ShotTrail.width,
            this.spriteX10ShotTrail.height, 
            goku.position.x + this.firingOffsetX + this.width + 1 + this.fullShotWidth + 48,
            goku.position.y + 10, 
            this.spriteX10ShotTrail.width * trailScale, 
            this.spriteX10ShotTrail.height * 2)

        this.drawSprite(goku.kameHameHaShot.position.x, goku.kameHameHaShot.position.y, 
            firingOffsetX + this.ssj4X10ProjectileOffsetX,
            x10ChargeOffsetY + this.fullShotProjectileOffsetY,
            this.ssj4X10ProjectileWidth,
            this.ssj4X10ProjectileHeight,
            2.5

        )
        
    }


    drawKameHameHa(goku) {
        goku.form instanceof SuperSaiyan4 ? this.drawBigKameHameHa(goku) :this.drawSmallKameHameHa(goku)
    }
    drawKameHameHaFullCharged(goku) {
        goku.form instanceof SuperSaiyan4 ? this.drawKameHameHaX10(goku) : this.drawBigKameHameHa(goku)
    }

}
export default KameHameHaDrawer