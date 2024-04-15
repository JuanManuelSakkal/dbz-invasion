import SuperSaiyan4 from "../classes/GokuTransformations/SuperSaiyan4"
import GokuDrawerBase from "./GokuDrawerBase"

class GokuAttacksDrawerBase extends GokuDrawerBase {

    constructor(ctx, formOffset) {
        super(ctx, formOffset, {x: 0, y: 33})
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
        this.attacksSsj4 = [
            //punch left
            {
                width: 24,
                height: 29,
                offset: 0
            },
            //punch right
            {
                width: 24,
                height: 29,
                offset: 24
            },
            //elbow
            {
                width: 25,
                height: 29,
                offset: 130
            },
            //kick
            {
                width: 25,
                height: 29,
                offset: 160
            },
            //kick
            {
                width: 25,
                height: 29,
                offset: 190
            },
            //kick
            {
                width: 25,
                height: 29,
                offset: 219
            },
        ]
    }

    resetCounters(){
        this.attackCounter = 0
    }

    drawAttack(goku) {
        const attacks = goku.form instanceof SuperSaiyan4 ? this.attacksSsj4 : this.attacks
        let i = this.attackCounter % attacks.length
        this.drawSprite(goku.position.x, goku.position.y, this.spriteOffsetX + attacks[i].offset, this.spriteOffsetY, 
            attacks[i].width, attacks[i].height, 2)
    }

}

export default GokuAttacksDrawerBase