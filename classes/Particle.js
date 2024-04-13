import BaseForm from "./GokuTransformations/BaseForm"
import SuperSaiyan from "./GokuTransformations/SuperSaiyan"

class Particle {
    constructor(emisor) {
        this.markedForDeletion = false
        this.emisor = emisor
    }

    update(){
        this.x -= this.speedX
        this.y -= this.speedY
        this.size *= 0.95
        if(this.size < 0.5) this.markedForDeletion = true
    }
}

export class EnergySmall extends Particle {
    constructor(emisor, offsetX, offsetY) {
        super(emisor)
        this.x = this.emisor.position.x + offsetX
        this.y = this.emisor.position.y + offsetY
        this.speedX = Math.random() * 0.2
        this.speedY = Math.random() * 0.2
        this.size = Math.random() * 5 + 3
        this.color = emisor.character.form instanceof BaseForm ? 'rgba(80, 134, 230, 0.2)' : 'rgba(245, 225, 34, 0.2)'
    }

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

export class KameHameHa extends Particle {
    constructor(emisor, offsetX, offsetY, size) {
        super(emisor)
        this.x = this.emisor.position.x + offsetX
        this.y = this.emisor.position.y + offsetY
        this.speedX = Math.random() - 0.5
        this.speedY = Math.random() - 0.5
        this.size = size
        this.color = 'rgba(80, 134, 230, 0.05)'
    }

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}
export class KameHameHaSmall extends KameHameHa {
    constructor(emisor, offsetX, offsetY) {
        super(emisor, offsetX, offsetY, Math.random() * 15 + 3)

    }
}
export class KameHameHaFull extends KameHameHa {
    constructor(emisor, offsetX, offsetY) {
        super(emisor, offsetX, offsetY, Math.random() * 35 + 3)

    }
}