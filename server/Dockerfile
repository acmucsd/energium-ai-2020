FROM node:12.16.3

# RUN apk update
RUN apt-get update

# RUN apk --no-cache add docker-cli
# RUN apt-get install docker-ce docker-ce-cli containerd.io

# RUN apk add apache2
RUN apt-get install apache2 -y
RUN apt-get install curl -y
RUN apt-get clean

# RUN apk add openrc --no-cache

# RUN \
#   apk add --no-cache \
#   apache2-proxy \
#   apache2-ssl \
#   apache2-utils \
#   curl

RUN npm install pm2 -g

RUN mkdir /server

COPY ./package.json ./package-lock.json ./server.ts ./tsconfig.json ./copy_keys.sh ./start.sh ./.env ./docker_setup.sh /server/

RUN bash ./server/docker_setup.sh

COPY ./keys server/keys

# COPY ./httpd.conf /etc/apache2/httpd.conf
COPY ./000-default.conf ./server

WORKDIR /server

RUN npm i
RUN npm run build

# CMD [ "node", "lib/server.js" ]
CMD [ "sh", "/server/start.sh" ]