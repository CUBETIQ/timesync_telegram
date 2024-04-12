FROM cubetiq/calpine-node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM redis:latest

COPY --from=node_builder /usr/src/app /usr/src/app

EXPOSE 6379

CMD [ "npm", "start" ] 
