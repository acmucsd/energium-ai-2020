#!/bin/sh

# pull all relevant images
docker pull acmaiucsd/python
docker pull acmaiucsd/js

# start server (use pm2 later)
/usr/sbin/httpd -k restart
pm2-runtime lib/server.js