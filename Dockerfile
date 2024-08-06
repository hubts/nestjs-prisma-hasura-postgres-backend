# Builder
FROM node:20.12.2 AS builder
WORKDIR /build
COPY    package.json yarn.lock ./
COPY    nest-cli.json tsconfig.build.json tsconfig.json ./
COPY    prisma ./prisma
COPY    src ./src

# Dependencies

# Prisma needs version match, 
# so dependencies and devDependencies should be installed both.
RUN     yarn install
RUN     yarn prisma generate

# Nest build
RUN     yarn build

# Distribute
FROM node:20.12.2-alpine
WORKDIR /app

COPY    --from=builder /build/dist          ./dist
COPY    --from=builder /build/package.json  ./package.json
COPY    --from=builder /build/node_modules  ./node_modules
COPY    --from=builder /build/prisma        ./prisma

# Run
CMD ["yarn", "start:prod"]