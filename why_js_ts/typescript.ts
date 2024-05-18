
function parseGPS(input: string | undefined): [number, number] {
    // parsing
    if (input === undefined) {
        return [0, 0]
    }
    const parts = input.split(',')
    // parts[0]....
    return [0, 0]
}

// let data = "$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47"
let data = undefined

const result = parseGPS(data)

console.log(result[0])
