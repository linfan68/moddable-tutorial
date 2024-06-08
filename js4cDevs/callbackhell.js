
let rxCounter = 0
function waitForChar(port) {
    return new Promise((resolve, reject) => {
        port.on('data', (data) => {
            resolve(data);
        });
    })
}


async function processChar(port) {
    while (true) {
        const char = await waitForChar(port);
        rxCounter++;
        if (char === 'Q') {
            break;
        } else {
            console.log(`received char: ${char}`);
        }
    }
}

// process char on COM1 and COM3

function main() {
    processChar('COM1')
    processChar('COM3')
}