# Energium AI Competition at UCSD

Upon the dawn of the new millenium, energy has become currency, the most precious resource after majority of Earth's resources have been mined out. You are an energy corporation with the technology of **Collectors**, robots that can mine a energy rich resource known as energium on the asteroid belts of our solar system.

<img src="/workers.png">

But time is of the essence, and these robots need an AI to help them run effectively and mine as much energium possible before time runs out. What makes matters worse is, there's always a rival corporation on the same asteroid for some reason, trying to mine the resources too. Your goal is to build the best AI agent to control these collectors and get more energy than your competitors. Also, for some reason in 1000 years, Javascript, Python, and Java continue to be prevalent langauges for AI.

See [Getting Started](#Getting-Started) to start programming and uploading a bot to compete against others! See [Specs](#Specs) for details on how the competition works, and how to develop your bot.

The live competition can be found here: https://ai.acmucsd.com/competitions/energium

## Getting Started

Download a starter kit of your choice from [Javascript](https://github.com/acmucsd/energium-ai-2020/raw/main/kits/js/jskit.zip), [Python](https://github.com/acmucsd/energium-ai-2020/raw/main/kits/python/pythonkit.zip), or [Java](https://github.com/acmucsd/energium-ai-2020/raw/main/kits/java/javakit.zip). Please note, Windows is not supported, please use WSL to access a linux distribution. See [this](https://github.com/KNOXDEV/wsl) for instructions on how to use WSL.

Make sure you have [Node.js](https://nodejs.org/) installed, of at least version 12 or above.

Install the competition with

```
npm install -g @acmucsd/energium-2020
```

To run a match, run

```
acmai-energium path/to/bot/folder path/to/other/bot/folder
```

and it will output the game results, any relevant logs, store error logs in a `errorlogs` folder, and store a replay in a `replays` folder.

If you have some output that doesn't look like an error, then congratulations! You just ran your first AI match! To use our visualizer and watch what unfolded, download our visualizer here: https://github.com/acmucsd/energium-ai-2020/raw/main/bundles/visualizer/visualizer.zip

To install the visualizer, open the zip file, then navigate to the visualizer folder and run `npm run i` in the visualizer's folder. Then run `npm run serve` to start the visualizer up and it will give you the link to where you can access the visualizer. Upload a replay file and the visualizer will show you what went down!

You can submit your bot to our servers as many times as you like! To submit your bot, zip the contents of your folder by navigating to your bot folder and running

```
zip -r bot.zip .
```

Once you submit, our servers will automatically put your bot into matches and store all results, replays, and logs online. Go to https://ai.acmucsd.com/competitions/energium/ranks to see the current leaderboard as well as find matches and watch them.

Keep reading to learn how the competition works and the rules of the AI game

## Specs

This is a turn based, 1 vs 1 competition. Each match, two bots compete to get the most energium in store by the end of 200 turns. Each turn, your bot has a second of computation to do whatever it can to win (a second is quite a lot!) and about 1GB of RAM (you probably wont need this much). The computation times are subject to change, but will only ever increase.

You are given a `Player` object that contains details on your bot's current energium stored, how many **collectors** it has, and the location of all of its **bases**. See the Starter kits bot file for details on how to access this data and send commands to run your bot.

You are also given a `GameMap` object with data on all the map tiles, and the energium values of each tile.

**Collectors**
Collectors can move in 4 directions, North, East, South, West. The starter kit shows you how to move units using the `move` function.

Each collector has a breakdown level. This breakdown level resets to 0 each time the collector moves over a friendly **base**. As time passes, the collector slowly becomes more broken down. Once the breakdown level is 10, the collector malfunctions and vanishes.

If two collectors, regardless of what team they are on, end up on the same tile on the map after a turn, the collector with the least breakdown level will survive and all other collectors on the same tile will break down. If there's a tie in least breakdown level, all collectors break down.

Collectors automatically gain or lose energium depending on the `energium` value stored on the tile the collector is on. Be wary that some tiles are severely energy defficient, and can cause you to lose more energium by standing on it. Note that energium is special in that it cannot be depleted anywhere, it will always output that much energium whenever a collector is on it.

**Bases**

Bases have the ability to spend Energium to produce more **collector** bots on top of the base to help your corporation mine even more Energium. Caution that if there is a collector already on top of a base, any new collector spawned will either break the existing collector or both collectors will break!

## Packages Available and Versions Used

On the competition servers, we are using:

Node version v12.15.0.

Python 3.8.2

Java - openjdk 1.8.0_252

On the competition servers, the following packages are provided for use

For Python Bots:
`scipy`, `numpy`, `pandas`, `scikit-learn`

## FAQ

Please join our competition discord for questions, help with bugs, installation, or general strategy talk!

https://discord.gg/XsG5etY
