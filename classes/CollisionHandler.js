
class CollisionHandler {
    constructor(object, size) {
        this.size = size
        this.object = object
    }

    checksCollision(objectsArray) {
        return objectsArray.filter(object => {
            return object !== this.object && this.isCollidingWith(object)
        })
    }

    isCollidingWith(object) {
        return this.object.position.x < object.position.x + object.collisionHandler.size.x &&
            this.object.position.x + this.size.x > object.position.x &&
            this.object.position.y < object.position.y + object.collisionHandler.size.y &&
            this.object.position.y + this.size.y > object.position.y
    }
}

export default CollisionHandler