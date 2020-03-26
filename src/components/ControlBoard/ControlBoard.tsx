import React from 'react';

import { StyledControlBoard } from './ControlBoard.styles';

import Button from '../Button/Button';

import Images from '../../assets/images';

type Props = {
  rotating: boolean;
  currentTool: string;
  toggleRotation: () => void;
  selectCurrentTool: (tool: string) => void;
};

const ControlBoard = ({
  rotating,
  currentTool,
  toggleRotation,
  selectCurrentTool,
}: Props) => {
  const onToggleRotate = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleRotation();
    console.log('toggle rotation');
  };

  const onClickPickTriangle = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('toggle pick triangle');

    if (currentTool === 'pick') {
      selectCurrentTool('');
    } else {
      selectCurrentTool('pick');
    }
  };

  return (
    <StyledControlBoard>
      <Button
        label="Toggle rotation"
        img={Images.rotate}
        toggled={rotating}
        onClick={onToggleRotate}
      />
      <Button
        label="Pick a triangle"
        img={Images.hand}
        toggled={currentTool === 'pick'}
        onClick={onClickPickTriangle}
      />
    </StyledControlBoard>
  );
};

export default ControlBoard;
