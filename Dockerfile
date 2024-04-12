# FROM cubetiq/calpine-node:latest

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# CMD [ "npm", "start" ] 

FROM redis:latest

EXPOSE 6379