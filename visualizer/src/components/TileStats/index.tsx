import { Unit } from '@acmucsd/kingofthehill-2020/lib/Unit';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import React from 'react';
import './styles.css';
import { FrameTileData } from '../../scenes/MainScene';
import UnitCard from '../UnitCard';
export type TileStatsProps = FrameTileData
const TileStats = ({ pos, units }: TileStatsProps) => {
  return (
    <div className="TileStats">
      <p>
        Tile at ({pos.x}, {pos.y})
      </p>
      <Grid container className="UnitStats">
        {Array.from(units.values()).map((v) => {
          return (
            <Grid item className="UnitData" xs={3}>
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
