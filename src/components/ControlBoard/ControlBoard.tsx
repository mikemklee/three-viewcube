import React from 'react';

import { StyledControlBoard } from './ControlBoard.styles';

import Button from '../Button/Button';

import uploadImg from '../../assets/upload.png';

type Props = {
  toggleRotation: Function;
};

const ControlBoard = ({ toggleRotation }: Props) => {
  const onClickCameraToggle = () => {
    toggleRotation();
  };

  return (
    <StyledControlBoard>
      <Button onClick={onClickCameraToggle} label="Upload" img={uploadImg} />
      <Button label="Upload" img={uploadImg} />
    </StyledControlBoard>
  );
};

export default ControlBoard;
