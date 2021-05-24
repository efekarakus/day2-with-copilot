FROM node:14-slim AS base
WORKDIR /server
COPY package.json .
RUN npm install

FROM base AS release
RUN apt-get update && apt-get install -y ca-certificates curl
COPY --from=base /server/node_modules ./node_modules
COPY . .
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s \
  CMD curl -f http://localhost:3000/_healthcheck || exit 1
CMD npm run start
