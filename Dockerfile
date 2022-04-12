FROM node:12-alpine3.14
WORKDIR /usr/src/app
COPY package*.json .env ./
COPY config ./config
COPY secrets ./secrets
COPY dist ./dist
RUN npm install -g db-migrate db-migrate-pg && npm install --production
CMD ["npm", "run", "prod-start"]