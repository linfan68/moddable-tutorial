// Will block until data is available
char waitForUartDataBlocking();

void processUartDataBlocking() {
    while (1) {
        char byte = waitForUartDataBlocking();
        // Process the byte
        if (byte == 'Q') {
            // Quit
            printf("Quitting\n");
            break;
        }
        else {
            printf("Received byte: %c\n", byte);
        }
    }
}

// Will invoke the callback when data is available
typedef void (*callback_t)(char byte);
void waitForUartDataCallback(callback_t callback);


void onUartDataReceived(char byte) {
    // Process the byte
    if (byte == 'Q') {
        // Quit
        printf("Quitting\n");
    }
    else {
        printf("Received byte: %c\n", byte);
        waitForUartDataCallback(onUartDataReceived);
    }
}

void processUartDataCallback() {
    waitForUartDataCallback(onUartDataReceived);
}