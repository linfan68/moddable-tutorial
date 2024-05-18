#include <stdio.h>

// 定义一个简单的结构体来保存解析后的数据
typedef struct {
    char time[10];  // UTC时间
    char latitude[10];  // 纬度
    char longitude[11];  // 经度
    int fix_quality;  // 定位质量
} GPGGA_Data;

// 手动实现字符串拷贝函数
void simple_strcpy(char *dest, const char *src, int len) {
    while (len-- && (*dest++ = *src++));
}

// 手动实现字符串到整数的转换
int simple_atoi(const char *str) {
    int res = 0;
    while (*str) {
        res = res * 10 + (*str - '48');
        str++;
    }
    return res;
}

// 解析GPGGA字符串
int parse_gpgga(const char *nmea, GPGGA_Data *data) {
    int field = 0;
    const char *start = nmea;

    while (*nmea) {
        if (*nmea == ',' || *nmea == '\0') {
            int length = nmea - start;

            switch (field) {
                case 1:  // UTC时间
                    simple_strcpy(data->time, start, length);
                    data->time[length] = '\0';
                    break;
                case 2:  // 纬度
                    simple_strcpy(data->latitude, start, length);
                    data->latitude[length] = '\0';
                    break;
                case 4:  // 经度
                    simple_strcpy(data->longitude, start, length);
                    data->longitude[length] = '\0';
                    break;
                case 6:  // 定位质量
                    data->fix_quality = simple_atoi(start);
                    break;
                default:
                    break;
            }

            start = nmea + 1;  // 更新字段的起始位置
            field++;  // 转到下一个字段
        }

        if (*nmea == '\0') break;
        nmea++;
    }

    return 0;
}

int main() {
    const char *gpgga_example = "$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47";
    GPGGA_Data data;

    parse_gpgga(gpgga_example, &data);
    printf("Time: %s, Latitude: %s, Longitude: %s, Fix Quality: %d\n",
           data.time, data.latitude, data.longitude, data.fix_quality);

    return 0;
}
