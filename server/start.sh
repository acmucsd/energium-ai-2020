#!/bin/sh

# pull all relevant images
docker pull acmaiucsd/python
docker pull acmaiucsd/js
docker pull acmaiucsd/java

# run the startup script to setup apache

a2ensite default-ssl
a2enmod ssl

cp ./000-default.conf /etc/apache2/sites-available/

# change the configs
a2enmod proxy 
a2enmod headers
a2enmod proxy_http
a2enmod proxy_balancer
a2enmod lbmethod_byrequests

# start server (use pm2 later)
service apache2 start
pm2-runtime lib/server.js