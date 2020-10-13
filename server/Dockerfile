FROM node:12.16.3

RUN apt-get update

RUN apt-get install apache2 -y
RUN apt-get install curl -y
RUN apt-get clean

COPY ./docker_setup.sh /server/
RUN bash ./server/docker_setup.sh

RUN npm install pm2 -g

COPY ./package.json ./package-lock.json ./server.ts ./tsconfig.json ./copy_keys.sh ./start.sh ./.env /server/

COPY ./keys server/keys

COPY ./000-default.conf ./server

WORKDIR /server

RUN npm i
RUN npm run build

# CMD [ "node", "lib/server.js" ]
CMD [ "sh", "/server/start.sh" ]