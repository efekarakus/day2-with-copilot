FROM node:14-slim AS base
WORKDIR /server
COPY package.json .
RUN npm install

FROM base AS release
COPY --from=base /server/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD npm run start
