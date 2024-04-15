import Time from "./Time"
import CollisionHandler from "./CollisionHandler"
import { State } from "./CharacterBase"
import { enemies } from "../main"
import SuperSaiyan4 from "./GokuTransformations/SuperSaiyan4"
class KameHameHaShot {
    static kiConsumed = 25
    constructor(character, position, speed) {
        this.character = character
        this.position = {
            x: position.x + character.position.x,
            y: position.y + character.position.y
        }
        this.speed = speed
        this.particles = []
        this.isFullCharged = character.state == State.firingKameHameHaFullCharged
        this.damage = (this.isFullCharged ? 90 : 40) + character.attackDamage
        const size = character.form instanceof SuperSaiyan4 ?
            (this.isFullCharged ? {x: 70, y: 70} : {x: 50, y: 50}) :
            (this.isFullCharged ? {x: 50, y: 50} : {x: 30, y: 30})
        this.collisionHandler = new CollisionHandler(this, size)
    }

    update(){
        this.position.x += this.speed.x * Time.deltaTime/10
        this.position.y += this.speed.y * Time.deltaTime/10
        if(this.position.x > 600) {
            this.character.stop()
        }
        this.collisionHandler.checksCollision(enemies).forEach(enemy => {
            enemy.takeDamage(this.damage)
        })

    }
}

export default KameHameHaShot