# docker/node/Dockerfile
FROM node:20.17-slim AS builder 

WORKDIR /home/node/app/api

COPY ./api/package*.json ./ 

RUN npm install --ignore-scripts 

COPY ./api . 

ENV TZ=Europe/Paris 

EXPOSE 3001

USER node 

CMD ["npm", "start"]