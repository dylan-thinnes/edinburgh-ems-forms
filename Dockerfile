FROM node:current-slim

WORKDIR /usr/src/app
COPY package.json .
RUN npm install

COPY . .
RUN npm run dev

EXPOSE 8800
CMD [ "npm", "start" ]
