FROM node:latest AS node_builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM redis:latest

EXPOSE 6379

COPY --from=node_builder /usr/src/app /usr/src/app

WORKDIR /usr/src/app

CMD [ "npm", "start" ] 
