import EnemyDamageDrawer from "./EnemyDamageDrawer";

class CellDamageDrawer extends EnemyDamageDrawer {
    constructor(ctx, imagePath) {
        super(ctx, imagePath,
            {w: 35, h: 49, o: {x: 768, y: 63}}, 
            {w: 50, h: 49, o: {x: 855, y: 311}},
            {w: 42, h: 49, o: {x: 768, y: 63}},
            [
                {width: 40, height: 49, offsetX: 808, offsetY: 309},
                {width: 43, height: 49, offsetX: 753, offsetY: 309},
                {width: 65, height: 49, offsetX: 670, offsetY: 309},

            ],
            {w: 42, h: 49, o: {x: 768, y: 63}},
            1.2
        )
        this.spriteOffsetX = 0
        this.spriteOffsetY = 0
        this.staggerAnim = 500
    }
}

export default CellDamageDrawer