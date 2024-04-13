import SuperSaiyan from "./SuperSaiyan"

class BaseForm {
    constructor() {
        this.maxSpeed = {x: 1, y: 1}
        this.maxHealth = 100
        this.maxKi = 100
        this.kiChargingSpeed = 0.5
        this.formOffset = {x: 13, y: 117}
        this.attackDamage = 10
        this.nextForm = new SuperSaiyan()
    }
}

export default BaseForm