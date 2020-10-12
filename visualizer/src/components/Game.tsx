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
} from '@material-ui/core';
import './styles.css';
import { AIMatchConfigs, Unit } from '@acmucsd/energium-2020';
import TileStats from './TileStats';

export const GameComponent = () => {
  const [isReady, setReady] = useState(false);
  const [selectedTileData, setTileData] = useState<FrameTileData>(null);
  const [game, setGame] = useState<Phaser.Game>(null);
  const [main, setMain] = useState<MainScene>(null);
  const [configs, setConfigs] = useState<AIMatchConfigs>(null);
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
        const configs = main.kothgame.configs;
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
            if (game) {
              game.destroy(true, false);
            }
            setReady(false);

            const newgame = createGame({
              replayData: data,
              handleUnitClicked,
              handleTileClicked,
            });
            setGame(newgame);
            setUploading(false);
          });
      } else {
        const unzip = new jszip();
        // file.arrayBuffer()
        //   .then(unzip.loadAsync)
        //   .then((data) => {
        //     console.log(data.files);
        //   })
        unzip.loadAsync(file).then((data) => {
          Object.values(data.files).forEach((info) => {
            console.log(info);
            if (info.dir === false) {
              info.async('string').then((json) => {
                let gameData = JSON.parse(json);
                if (game) {
                  game.destroy(true, false);
                }
                setReady(false);
    
                const newgame = createGame({
                  replayData: gameData,
                  handleUnitClicked,
                  handleTileClicked,
                });
                setGame(newgame);
                setUploading(false);
              });
            }
          });
        });
        // unzip.loadAsync(fs.readFileSync(this.replayFilePath)).then((data) => {
        //   data.file(this.replayFilePath).async("string").then((data) => {
        //     console.log(data)
        //   })
        // });
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

  const handleUnitClicked = (data) => {
    console.log(data);
  };
  const handleTileClicked = (data) => {
    setTileData(data);
  };
  const handleTextOverlayCheckChange = () => {
    main.toggleTextOverlay();
  }
  return (
    <div className="Game">
      <div className="gameContainer">
        <h1>King of the Hill AI Challenge</h1>
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
                      moveToTurn(turn - 1);
                    }}
                  >
                    {'<'}
                  </Button>
                  <Button
                    disabled={!isReady}
                    onClick={() => {
                      moveToTurn(turn + 1);
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
      </div>
    </div>
  );
};
