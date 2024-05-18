function parseGPGGA(gpggaString) {
    const fields = gpggaString.split(',');

    // 提取并转换纬度和经度，纬度和经度的格式为度和度分的组合
    function convertToDecimal(degreesMinutes) {
        const parts = degreesMinutes.split('.');
        const degrees = parts[0].slice(0, -2);
        const minutes = parts[0].slice(-2) + '.' + parts[1];
        return parseFloat(degrees) + parseFloat(minutes) / 60;
    }

    const gpggaData = {
        time: fields[1],
        latitude: convertToDecimal(fields[2]),
        longitude: convertToDecimal(fields[4]),
        fixQuality: parseInt(fields[6], 10)
    };

    return gpggaData;
}

// 示例GPGGA数据
const gpggaExample = "$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47";

// 解析数据
const parsedData = parseGPGGA(gpggaExample);
console.log(parsedData);
