import CellMovementDrawer from "./CellMovementDrawer"
import { State } from "../classes/CharacterBase"
import CellDamageDrawer from "./CellDamageDrawer"
class CellDrawer {
    constructor(ctx){
        let imagePath = "../sprites/imperfect cell.png"
        this.cellMovementDrawer = new CellMovementDrawer(ctx, imagePath)
        this.cellDamageDrawer = new CellDamageDrawer(ctx, imagePath)
    }

    resetCounters() {
        this.cellDamageDrawer.animator.resetCounters()
    }

    draw(cell) {
        switch(cell.state) {
            case State.idle:
                this.cellDamageDrawer.drawIdle(cell)
                break
            case State.movingLeft:
                this.cellMovementDrawer.drawMovingLeft(cell)
                break
            case State.takingDamage:
                this.cellDamageDrawer.drawTakingDamage(cell)
                break
            case State.knockedOut:
                let newState = cell.health > 0 ? State.movingLeft : State.dead
                this.cellDamageDrawer.drawKnockedOut(cell, newState)
                break
            case State.dead:
                this.cellDamageDrawer.drawKnockedOut(cell, State.dead)
                break

        }
    }
}

export default CellDrawer