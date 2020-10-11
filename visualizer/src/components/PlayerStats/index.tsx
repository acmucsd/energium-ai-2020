import { Unit } from '@acmucsd/kingofthehill-2020/lib/Unit';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card';
import React from 'react';
import './styles.css';
export type PlayerStatsProps = {
  team: Unit.TEAM;
  points: number;
};
const PlayerStats = ({
  team,
  points,
}: PlayerStatsProps) => {
  return (
    <div className="PlayerStats">
      <h3>Team {team} Stats</h3>
      <p>Points: {points}</p>
      <Divider />
    </div>
  );
};
export default PlayerStats;
