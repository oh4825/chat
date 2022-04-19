FROM node:16.13.1

WORKDIR /chat
COPY . /chat

RUN yarn install
# 컨테이너 실행시 실행할 명령어
CMD ["node", "/chat/app.js"]
