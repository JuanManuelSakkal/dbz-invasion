
import SpriteDrawer from './SpriteDrawer.js'

const playerImage = new Image()
playerImage.src = "/sprites/goku.png"
const iconSpriteWidth = 25
const iconSpriteHeight = 35
const iconSpriteColumns = 28
const iconSpriteOffsetX = 8
const iconSpriteOffsetY = 1
const iconsDrawer = (ctx) => new SpriteDrawer(ctx, playerImage, iconSpriteWidth, iconSpriteHeight, iconSpriteColumns, iconSpriteOffsetX, iconSpriteOffsetY, 1, 1)

export default iconsDrawer
