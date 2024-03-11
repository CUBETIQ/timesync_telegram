FROM --platform=arm64 ubuntu:20.04

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=3000

EXPOSE ${PORT}

CMD ["npm", "start"]