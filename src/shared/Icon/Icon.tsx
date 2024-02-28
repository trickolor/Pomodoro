import React from 'react';
import * as ICONS from './icon_list';

export interface IIconPreset {
  width?: number;
  height?: number;
  color?: string;
}

interface IIconProps {
  name: TIcons[keyof TIcons];
}

type TIcons = {
  Plus: 'Plus';
  Stats: 'Stats';
  Tomato: 'Tomato';
  Menu: 'Menu';
  Add: 'Add';
  Subrtract: 'Subtract';
  Edit: 'Edit';
  Delete: 'Delete';
  Cross: 'Cross';
  TomatoSmile: 'TomatoSmile';
  Focus: 'Focus';
  Clock: 'Clock';
  ClockSmall: 'ClockSmall';
  Stop: 'Stop';
  Arrow: 'Arrow';
  Sun: 'Sun';
  Moon: 'Moon';
  Cog: 'Cog';
  Triangle: 'Triangle';
  Check: 'Check'
}



export function Icon({ name, width, height, color }: (IIconPreset & IIconProps)) {
  const IconComponent = ICONS[name] as React.FC<IIconPreset>;

  if (!IconComponent) return null;

  return <IconComponent width={width} height={height} color={color} />
}
