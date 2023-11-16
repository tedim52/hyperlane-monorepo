FROM node:18-alpine

WORKDIR /hyperlane-monorepo

RUN apk add --update --no-cache git g++ make py3-pip

RUN yarn set version 4.0.1

# Copy package.json and friends
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/plugins ./.yarn/plugins
COPY .yarn/releases ./.yarn/releases
COPY typescript/utils/package.json ./typescript/utils/
COPY typescript/sdk/package.json ./typescript/sdk/
COPY typescript/helloworld/package.json ./typescript/helloworld/
COPY typescript/cli/package.json ./typescript/cli/
COPY typescript/infra/package.json ./typescript/infra/
COPY solidity/package.json ./solidity/

RUN yarn install && yarn cache clean

# Copy everything else
COPY tsconfig.json ./
COPY typescript ./typescript
COPY solidity ./solidity

RUN yarn build
