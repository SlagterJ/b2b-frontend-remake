ARG NODE_IMAGE=node:24.2.0-alpine3.22

# ---------- BUILDER ----------
FROM ${NODE_IMAGE} AS builder

# telemetry disabling
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn config set --home enableTelemetry 0
RUN yarn config set enableTelemetry 0

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# ---------- RUNNER ----------
FROM ${NODE_IMAGE} AS runner

# telemetry disabling
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn config set --home enableTelemetry 0
RUN yarn config set enableTelemetry 0

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next .next
#COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules

EXPOSE 3000

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["yarn", "start:prod"]
