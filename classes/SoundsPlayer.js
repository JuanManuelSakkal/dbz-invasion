import { Howl, Howler } from "howler"

const DBZTHEME = new Howl({src: ['sounds/dbztheme.mp3'], loop: true, volume: 0.10})
const PUNCHES = [
    new Howl({src: ['sounds/punches/punch1.mp3'], volume: 0.20}),
    new Howl({src: ['sounds/punches/punch2.mp3'], volume: 0.20}),
]
const KAMEHAMEHACHARGE = new Howl({src: ['sounds/ki/kamecharge.mp3'], volume: 0.20})
const KAMESMALL = new Howl({src: ['sounds/ki/kamesmall.mp3'], volume: 0.4})
const KAMEBIG = new Howl({src: ['sounds/ki/kamebig.mp3'], volume: 0.20})
const KISHOT = new Howl({src: ['sounds/ki/kiblast.mp3'], volume: 0.10})
const KIUP = new Howl({src: ['sounds/ki/kiup.mp3'], loop: true, volume: 0.05})
Howler.volume(0.7)
class SoundsPlayer {
    static muted = false
    static toggleMute() {
        SoundsPlayer.muted = !SoundsPlayer.muted
        Howler.mute(SoundsPlayer.muted)
    }
    static playPunch(play = true) {
        PUNCHES[Math.floor(Math.random() * PUNCHES.length)].play()
    }
    static playTheme(play = true) {
        play && !DBZTHEME.playing() ?  DBZTHEME.play() : DBZTHEME.stop()
    }
    static playKameHameHaCharge(play = true) {
        play ? KAMEHAMEHACHARGE.play() : KAMEHAMEHACHARGE.stop()
    }
    static playKameHameHaSmall(play = true) {
        play ? KAMESMALL.play() : KAMESMALL.stop()
    }
    static playKameHameHaBig(play = true) {
        play ? KAMEBIG.play() : KAMEBIG.stop()
    }
    static playKishot(play = true) {
        KISHOT.play()
    }
    static playKiUp(play = true) {
        play ? KIUP.play() : KIUP.stop()
    }

}

export default SoundsPlayer