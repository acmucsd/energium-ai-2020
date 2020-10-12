import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import React from 'react';
import './styles.css';
import { FrameSingleUnitData } from '../../scenes/MainScene';
export type UnitCardProps = FrameSingleUnitData;
const UnitCard = ({ pos, id, breakdownLevel, lastRepaired, team }: UnitCardProps) => {
  return (
    <Card className="UnitCard">
      <CardContent className={`card-${team}`}>
        <p>Collector Bot ID: {id}</p>
        <p>Breakdown: {breakdownLevel}</p>
        <p>Last Repaired: {lastRepaired}</p>
      </CardContent>
    </Card>
  );
};
export default UnitCard;
