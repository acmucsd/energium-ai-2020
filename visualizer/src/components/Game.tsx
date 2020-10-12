import 'phaser';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import MainScene, { Frame, FrameTileData } from '../scenes/MainScene';
import { createGame } from '../game';
import jszip from 'jszip';
import PlayerStats from './PlayerStats';
import GameStats from './GameStats';
import {
  Button,
  CircularProgress,
  ButtonGroup,
  Card,
  CardContent,
  Slider,
  Grid,
  Checkbox,
  FormControlLabel,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';

import './styles.css';
import { AIMatchConfigs, Unit } from '@acmucsd/energium-2020';
import TileStats from './TileStats';

export const GameComponent = () => {
  const [isReady, setReady] = useState(false);
  const [selectedTileData, setTileData] = useState<FrameTileData>(null);
  const [game, setGame] = useState<Phaser.Game>(null);
  const [main, setMain] = useState<MainScene>(null);
  const [configs, setConfigs] = useState<AIMatchConfigs>(null);
  const [running, setRunning] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [sliderConfigs, setSliderConfigs] = useState({
    step: 1,
    min: 0,
    max: 1000,
  });
  useEffect(() => {
    if (game) {
      game.events.on('setup', () => {
        const main: MainScene = game.scene.scenes[0];
        setMain(main);
        const configs = main.pseudomatch.state.game.configs;
        setConfigs(configs);

        setSliderConfigs({
          min: 0,
          max: configs.parameters.MAX_TURNS,
          step: 1,
        });
        setReady(true);
      });
    }
  }, [game]);
  useEffect(() => {
    if (isReady) {
      moveToTurn(0);
    }
  }, [isReady]);
  const [turn, setTurn] = useState(0);
  const [currentFrame, setFrame] = useState<Frame>(null);
  const [uploading, setUploading] = useState(false);
  const handleChange = (_event: any, newValue: number) => {
    moveToTurn(newValue);
  };
  const fileInput = React.createRef<HTMLInputElement>();
  const moveToTurn = (turn: number) => {
    setTurn(turn);
    main.renderFrame(turn);
    setFrame(main.frames[turn]);
  };
  useEffect(() => {
    if (running) {
      let currTurn = turn;
      const interval = setInterval(() => {
        if (currTurn >= configs.parameters.MAX_TURNS) {
          setRunning(false);
          return;
        }
        moveToTurn(currTurn);
        currTurn += 1;
        setTurn(currTurn);
        
      }, 1000 / playbackSpeed);
      return () => clearInterval(interval);
    }
  }, [running, playbackSpeed]);

  const setNewGame = (replayData: any) => {
    if (game) {
      game.destroy(true, false);
    }
    setReady(false);

    const newgame = createGame({
      replayData,
      handleTileClicked,
    });
    setGame(newgame);
    setUploading(false);
  }
  const handleUpload = () => {
    setUploading(true);
    if (fileInput.current.files.length) {
      const file = fileInput.current.files[0];
      const name = file.name;
      const meta = name.split('.');
      if (meta[meta.length - 1] === 'json') {
        file
          .text()
          .then(JSON.parse)
          .then((data) => {
            setNewGame(data);
          });
      } else {
        const unzip = new jszip();
        unzip.loadAsync(file).then((data) => {
          Object.values(data.files).forEach((info) => {
            console.log(info);
            if (info.dir === false) {
              info.async('string').then((json) => {
                let replayData = JSON.parse(json);
                setNewGame(replayData);
              });
            }
          });
        });
      }
    }
  };
  const renderUploadButton = () => {
    return (
      <Button variant="contained" component="label">
        Upload Replay{' '}
        <input
          accept=".json, .replay"
          type="file"
          style={{ display: 'none' }}
          onChange={handleUpload}
          ref={fileInput}
        />
      </Button>
    );
  };
  const noUpload = !uploading && game === null;
  const gameLoading =
    (uploading && game === null) || (!isReady && game !== null);

  const handleTileClicked = (data: FrameTileData) => {
    setTileData(data);
  };
  const handleTextOverlayCheckChange = () => {
    main.toggleTextOverlay();
  }
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: red[400],
      }
    }
  });
  return (
    <div className="Game">
      <div className="gameContainer">
        <h1>Energium AI Competition</h1>
        <p className="link"><a href="https://ai.acmucsd.com/competitions" target="_blank" rel="noopener noreferrer">By ACM AI Competitions</a></p>
        <ThemeProvider theme={theme}>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card
              className={classnames({
                'phaser-wrapper': true,
                Loading: gameLoading,
              })}
            >
              <CardContent>
                {noUpload && renderUploadButton()}
                {gameLoading && <CircularProgress />}
                <div id="content"></div>
                <div className="play-buttons">
                  <Button className="play" color="primary" variant="contained" disabled={!isReady} onClick={() => {
                    setRunning(!running)
                  }}>
                    {running ? 'Pause' : 'Play'}
                  </Button>
                  <ButtonGroup disabled={!isReady}>
                    {[1, 2, 4, 8, 16].map((speed) => {
                      const variant = playbackSpeed === speed ? "contained" : "outlined";
                      return <Button color="primary" variant={variant} onClick={() => {
                        setPlaybackSpeed(speed);
                      }}>
                      {speed}x
                      </Button>
                    })}
                  </ButtonGroup>
                </div>
                <br />
                <Slider
                  value={turn}
                  disabled={!isReady}
                  onChange={handleChange}
                  aria-labelledby="continuous-slider"
                  min={sliderConfigs.min}
                  step={sliderConfigs.step}
                  max={sliderConfigs.max}
                />
                <ButtonGroup color="primary">
                  <Button
                    disabled={!isReady}
                    onClick={() => {
                      if (turn > 0) {
                        moveToTurn(turn - 1);
                      }
                    }}
                  >
                    {'<'}
                  </Button>
                  <Button
                    disabled={!isReady}
                    onClick={() => {
                      if (turn < configs.parameters.MAX_TURNS) {
                        moveToTurn(turn + 1);
                      }
                    }}
                  >
                    {'>'}
                  </Button>
                </ButtonGroup>
                
                <br />
                <FormControlLabel
                  value="Toggle Energium Values Overlay"
                  control={<Checkbox 
                    onChange={handleTextOverlayCheckChange}
                  />}
                  disabled={!isReady}
                  label="Toggle Energium Values Overlay"
                  labelPlacement='end'
                />
                
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className="stats">
              <CardContent>
                {selectedTileData && (
                  <TileStats
                    {...selectedTileData}
                  />
                )}
                <GameStats turn={turn} />
                {currentFrame !== null &&
                  [0, 1].map((team: Unit.TEAM) => {
                    return (
                      <PlayerStats
                        key={team}
                        points={currentFrame.teamStates[team].points}
                        team={team}
                        unitCount={currentFrame.teamStates[team].unitCount}
                      />
                    );
                  })}
                {currentFrame !== null && <p>{currentFrame.errors.length} warnings / events this turn </p>}
                {currentFrame !== null && currentFrame.errors.map((m) => {
                  return <p>{m}</p>
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            {!noUpload && renderUploadButton()}
          </Grid>
        </Grid>
        </ThemeProvider>
      </div>
    </div>
  );
};
