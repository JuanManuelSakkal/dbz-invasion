import { EnergySmall } from "./Particle"
import Time from "./Time"
import CollisionHandler from "./CollisionHandler"
import { enemies } from "../main"
class KiProjectile {
    static kiConsumed = 10
    constructor(character) {
        this.character = character
        this.position = {
            x: character.position.x + 48,
            y: character.position.y + 18
        }
        this.damage = 50 + character.attackDamage
        this.speed = {
            x: 1.3 + character.speed.x,
            y: 0 + character.speed.y
        }
        this.particles = []	
        this.collisionHandler = new CollisionHandler(this, {x: 11, y: 8})
        this.shouldDestroy = false
    }

    update() {
        this.position.x += this.speed.x * Time.deltaTime/10
        this.position.y += this.speed.y * Time.deltaTime/10
        this.particles.push(new EnergySmall(this, 3, 7))
        this.collisionHandler.checksCollision(enemies).forEach(enemy => {
            enemy.takeDamage(this.damage)
            this.shouldDestroy = true
        })
        if(this.shouldDestroy) {
            this.character.projectiles.splice(this.character.projectiles.indexOf(this), 1)
        }
    }
}

export default KiProjectile