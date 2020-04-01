import React from 'react';

import { ViewCubeContainer } from './ViewCube.styles';

type Props = {};

const ViewCube = ({}: Props) => {
  return (
    <ViewCubeContainer>
      <div className='cube'>
        <div className='cube__face cube__face--front' onClick={() => {}}>
          front
        </div>
        <div className='cube__face cube__face--back' onClick={() => {}}>
          back
        </div>
        <div className='cube__face cube__face--right' onClick={() => {}}>
          right
        </div>
        <div className='cube__face cube__face--left' onClick={() => {}}>
          left
        </div>
        <div className='cube__face cube__face--top' onClick={() => {}}>
          top
        </div>
        <div className='cube__face cube__face--bottom' onClick={() => {}}>
          bottom
        </div>
      </div>
    </ViewCubeContainer>
  );
};

export default ViewCube;
