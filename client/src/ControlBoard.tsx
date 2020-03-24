import React from 'react';

import './ControlBoard.scss';

type Props = {
  toggleRotation: Function;
};

const ControlBoard = ({ toggleRotation }: Props) => {
  const onClickCameraToggle = () => {
    toggleRotation();
  };

  return (
    <div className="container">
      <h3>Controls</h3>
      <div className="dropdown">
        <label>Auto-rotate</label>
        <button onClick={onClickCameraToggle}>Toggle</button>
      </div>
    </div>
  );
};

export default ControlBoard;
