class Time {
    static lastTime = 0
    static deltaTime = 0

    static setTime(time) {
        this.deltaTime = time - this.lastTime
        this.lastTime = time
    }

}

export default Time