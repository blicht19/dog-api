FROM node:20.17.0-alpine
RUN addgroup -S appgroup && adduser -S app -G appgroup
USER app
WORKDIR /usr/app
COPY package.json .
RUN npm i --silent
COPY --chown=app:app . .