import EnemyMovementDrawer from "./EnemyMovementDrawer";

class CellMovementDrawer extends EnemyMovementDrawer{

    constructor(ctx, imagePath) {
        super(ctx, imagePath,
            {w: 35, h: 49, o: {x: 768, y: 63}}, 
            {w: 52, h: 49, o: {x: 738, y: 178}},
            {w: 35, h: 49, o: {x: 768, y: 63}},
            1.2
        )
    }


}

export default CellMovementDrawer