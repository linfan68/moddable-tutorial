import Serial from 'embedded:io/serial'

trace('This is a UART demo')


type UartHelperConfig = {
  baudRate: number
  port: number
  txPin: number
  rxPin: number
}

type UartDataReceived = (data: Uint8Array) => void

class UartHelper {
  private _serial: Serial
  private _writeableCount: number = 0
  constructor(
    config: UartHelperConfig,
    onDataReceived: UartDataReceived) {
    // Print the config
    trace(`Config: ${JSON.stringify(config, null, 2)}`)
    // TODO: Implement the UART

    this._serial = new Serial({
      baud: config.baudRate,
      port: config.port,
      transmit: config.txPin,
      receive: config.rxPin,
      onWritable: (count) => {
        this._writeableCount = count
        this.flushTransmitBuffer()
      },
      onReadable: () => {
        const data = this._serial.read()
        if (typeof data === 'number') {
          onDataReceived(new Uint8Array([data]))
        } else {
          onDataReceived(new Uint8Array(data))
        }
      }
    })
  }

  private _pendingTransmitBuffer: Uint8Array | undefined
  private _pendingTransmitResolve: (() => void) | undefined = undefined
  public async send(data: Uint8Array): Promise<number> {
    if (this._pendingTransmitBuffer) {
      return 0
    }
    return new Promise((resolve) => {
      // trace(`Sending: ${data}\n`)
      this._pendingTransmitBuffer = data
      this.flushTransmitBuffer()
      this._pendingTransmitResolve = () => resolve(data.length)
    })
  }

  private flushTransmitBuffer() {
    if (!this._pendingTransmitBuffer) {
      return
    }
    if (this._writeableCount === 0) {
      return
    }

    const writeSize = Math.min(this._writeableCount, this._pendingTransmitBuffer.length)
    const data = this._pendingTransmitBuffer.slice(0, writeSize)

    this._serial.write(data)
    
    this._writeableCount -= writeSize
    if (writeSize === this._pendingTransmitBuffer.length) {
      this._pendingTransmitResolve?.()
      this._pendingTransmitBuffer = undefined
      this._pendingTransmitResolve = undefined
    } else {
      this._pendingTransmitBuffer = this._pendingTransmitBuffer.slice(writeSize)
    }
  }
}


//
// Testing code
//
const onData = (data: Uint8Array) => {
  trace(`Received: ${[...data].map(v => v.toString(16).padStart(2, '0')).join(' ')}\n`)
}

const uart = new UartHelper({
  baudRate: 115200,
  port: 2,
  txPin: 41,
  rxPin: 42
}
, onData)

const sendingLoop = async () => {
  while (true) {
    const data = new Uint8Array(Array(255).fill(0).map((_, i) => i))
    trace(`Sending...\n`)
    const sentBytes = await uart.send(data)
    trace(`Sent: ${sentBytes}\n`)
  }
}

sendingLoop()