from node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

CMD ["npm", "start"]