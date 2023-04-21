FROM node:16-alpine as ts-environment
WORKDIR /usr/app

COPY package.json ./

COPY yarn.lock ./
COPY tsconfig*.json ./

RUN yarn install

COPY . ./

RUN yarn run build

ENV NODE_ENV=production
EXPOSE 3000/tcp

CMD ["node", "dist/src/index.js"]
