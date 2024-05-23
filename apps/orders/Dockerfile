FROM node:18-buster as development

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM node:18-buster as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/apps/orders/main"]
