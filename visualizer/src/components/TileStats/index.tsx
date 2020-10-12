import { Unit } from '@acmucsd/energium-2020/lib/es6/Unit';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import React from 'react';
import './styles.css';
import { FrameTileData } from '../../scenes/MainScene';
import UnitCard from '../UnitCard';
import { Energium } from '../Energium';
export type TileStatsProps = FrameTileData
const TileStats = ({ pos, units, pointsPerTurn }: TileStatsProps) => {
  return (
    <div className="TileStats">
      <p>
        Tile at ({pos.x}, {pos.y})
      </p>
      {
        pointsPerTurn >= 0 ?
        <p><Energium /> Here: {pointsPerTurn}</p> :
        <p><Energium /> Cost Here: {pointsPerTurn}</p>
      }
      <Grid container className="UnitStats">
        {Array.from(units.values()).map((v) => {
          return (
            <Grid item className="UnitData" xs={3} key={v.id}>
              <UnitCard {...v} />
            </Grid>
          );
        })}
      </Grid>
      <Divider />
    </div>
  );
};
export default TileStats;
