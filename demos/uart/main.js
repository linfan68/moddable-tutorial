trace('======Uart demo======\n')

const message = ArrayBuffer.fromString("Since publication of the first edition in 1997, ECMAScript has grown to be one of the world's most widely used general-purpose programming languages. It is best known as the language embedded in web browsers but has also been widely adopted for server and embedded applications.\r\n");
let offset = 0;

new device.io.Serial({
	baud: 115200,
    port: 2,
    transmit: 41,
    receive: 42,
	format: "buffer",
	onWritable: function(count) {
        // trace(`onWritable ${count}\n`)
		do {
			const use = Math.min(count, message.byteLength - offset);
			this.write(message.slice(offset, offset + use));
			count -= use;
			offset += use;
			if (offset >= message.byteLength)
				offset = 0;
		} while (count);
	},
    onReadable: function(count) {
        trace(`onReadable ${count}\n`)
        const data = new Uint8Array(this.read(count));
        for (let i = 0; i < data.byteLength; i++) {
            trace(data[i].toString(16).padStart(2, '0') + ' ');
        }
        trace('\n');
    }
});
