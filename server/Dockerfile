FROM node:alpine

WORKDIR /app

COPY package.json package-lock*.json ./

RUN npm install && npm cache clean --force

ENV PATH /app/node_modules/.bin/:$PATH

COPY . .

CMD ["npm", "start"]