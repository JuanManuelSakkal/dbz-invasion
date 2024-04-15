import SuperSaiyan4 from "./SuperSaiyan4"

class SuperSaiyan3 {
    constructor() {
        this.maxSpeed = {x: 2, y: 2}
        this.maxHealth = 200
        this.maxKi = 200
        this.kiChargingSpeed = 1
        this.formOffset = {x: 1, y: 886}
        this.attackDamage = 50
        this.nextForm = new SuperSaiyan4()
        this.levelRequired = 8
    }
}

export default SuperSaiyan3