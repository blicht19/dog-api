FROM node:20.17.0-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm i --silent
COPY . .
RUN npm run build