#!/bin/bash

# this updates every starter kits game_constants.json file to match what is in src/game_constants.json

cp src/game_constants.json kits/js/energium
cp src/game_constants.json kits/python/energium
cp src/game_constants.json kits/java/energium