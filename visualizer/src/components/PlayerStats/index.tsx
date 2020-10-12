import { Unit } from '@acmucsd/energium-2020/lib/es6/Unit';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card';
import React from 'react';
import './styles.css';
export type PlayerStatsProps = {
  team: Unit.TEAM;
  points: number;
  unitCount: number;
};
const PlayerStats = ({
  team,
  points,
  unitCount,
}: PlayerStatsProps) => {
  return (
    <div className="PlayerStats">
      <h3>Team {team} Stats</h3>
      <p>Points: {points}</p>
      <p># of Collectors: {unitCount}</p>
      <Divider />
    </div>
  );
};
export default PlayerStats;
