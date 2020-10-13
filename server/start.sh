#!/bin/sh

# pull all relevant images
docker pull acmaiucsd/python
docker pull acmaiucsd/js

# start server (use pm2 later)
node lib/server.js