import GokuDrawerBase from "./GokuDrawerBase"

class TrailDrawer extends GokuDrawerBase {
    constructor(sprite){
        this.sprite = sprite
    }

    draw(x, y){
        this.drawSprite(x, y, this.sprite.offsetX, this.sprite.offsetY, this.sprite.width, this.sprite.height, 2)
    }
}

export default TrailDrawer