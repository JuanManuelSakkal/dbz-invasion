import GokuDrawerBase from "./GokuDrawerBase"

class GokuAttacksDrawerBase extends GokuDrawerBase {

    constructor(ctx) {
        super(ctx, 13, 150)
        this.attackCounter = 0
        this.attacks = [
            //punch left
            {
                width: 21,
                height: 29,
                offset: 0
            },
            //punch right
            {
                width: 21,
                height: 29,
                offset: 25
            },
            //punch palm
            {
                width: 21,
                height: 29,
                offset: 50
            },
            //uppercut
            {
                width: 21,
                height: 29,
                offset: 75
            },
            //elbow
            {
                width: 21,
                height: 29,
                offset: 96
            },
            //kick
            {
                width: 25,
                height: 29,
                offset: 122
            },
            //up kick
            {
                width: 21,
                height: 29,
                offset: 152
            },
            //kick
            {
                width: 25,
                height: 29,
                offset: 177
            },
            //kick
            {
                width: 25,
                height: 29,
                offset: 206
            },
            //kick
            {
                width: 25,
                height: 29,
                offset: 235
            }
        ]
    }

    resetCounters(){
        this.attackCounter = 0
    }

    drawAttack(goku) {
        let i = this.attackCounter % this.attacks.length
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX + this.attacks[i].offset, this.spriteOffsetY, 
            this.attacks[i].width, this.attacks[i].height, 2)
    }

}

export default GokuAttacksDrawerBase