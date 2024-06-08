trace('=======Blinking LED on GPIO pin 1======\n')


const Digital = device.io.Digital
const led = new Digital({
   pin: 1,
   mode: Digital.Output,
})
led.write(1)

let state = 0

const button = new Digital({
	pin: 0,
	mode: Digital.InputPullUp
})

System.setInterval(() => {
    const isBlinking = button.read() === 0
	led.write(isBlinking ? state : 0)
	state ^= 1
}, 200)

