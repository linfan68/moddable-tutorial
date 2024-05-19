# 使用IDF 5.1.2作为基础镜像
FROM espressif/idf:v5.1.2

# 避免在构建过程中出现交互式提示
ARG DEBIAN_FRONTEND=noninteractive

# 使用阿里云的软件源
RUN sed -i 's@http://archive.ubuntu.com/ubuntu@http://mirrors.aliyun.com/ubuntu@g' /etc/apt/sources.list

# 更新软件包列表并安装常用工具
RUN apt-get update
RUN apt-get install -y --no-install-recommends \
    curl \
    git \
    ca-certificates \
    sudo \
    vim

RUN apt-get install -y --no-install-recommends \
    gcc wget make libncurses-dev flex bison gperf \
    libgtk-3-dev \
    adwaita-icon-theme-full

# export MODDABLE=~/Projects/moddable
# export PATH=$PATH:$MODDABLE/build/bin/lin/release
ENV MODDABLE=/workspaces/moddable-tutorial/moddable
ENV PATH=$PATH:$MODDABLE/build/bin/lin/release

RUN echo ". $IDF_PATH/export.sh > /dev/null 2>&1" >> ~/.bashrc