FROM nixos/nix
# 准备NodeJS
RUN apk add --update --no-cache nodejs npm yarn wget curl aria2
# 准备NodeJS脚本
WORKDIR /usr/app
COPY . .
RUN yarn
ENTRYPOINT ["node", "--unhandled-rejections=strict", "/usr/app/calculate.js"]
