import Divider from '@material-ui/core/Divider'
import React from 'react';
import './styles.css';
export type GameStatsProps = {
  turn: number;
  seed: number;
  size: number;
};
const GameStats = ({ turn, seed, size }: GameStatsProps) => {
  return (
    <div className="GameStats">
      <p>Seed {seed}</p>
      <p>Map Size: {size} x {size}</p>
      <p>Turn {turn} </p>
      <Divider />
    </div>
  );
};
export default GameStats;
