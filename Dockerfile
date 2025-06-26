FROM node:24.2.0-alpine3.22

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

RUN yarn next telemetry disable

RUN yarn build

EXPOSE 3000

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["yarn", "start:prod"]
