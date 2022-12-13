FROM node:16.17.1-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN ng build --configuration=production

EXPOSE 80

CMD node server.js
