import SuperSaiyan3 from "./SuperSaiyan3"

class SuperSaiyan {
    constructor() {
        this.maxSpeed = {x: 1.5, y: 1.5}
        this.maxHealth = 150
        this.maxKi = 150
        this.kiChargingSpeed = 0.8
        this.formOffset = {x: 2, y: 498}
        this.attackDamage = 25
        this.nextForm = new SuperSaiyan3
        this.levelRequired = 1
    }
}

export default SuperSaiyan