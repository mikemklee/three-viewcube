import React from 'react';

import { ViewCubeContainer } from './ViewCube.styles';

export type Orientation = {
  offsetFactor: {
    x: number;
    y: number;
    z: number;
  };
  axisAngle: {
    x: number;
    y: number;
    z: number;
  };
};

const TOP: Orientation = {
  offsetFactor: {
    x: 0,
    y: 0,
    z: 1,
  },
  axisAngle: {
    x: 0,
    y: 0,
    z: 0,
  },
};

const BOTTOM: Orientation = {
  offsetFactor: {
    x: 0,
    y: 0,
    z: -1,
  },
  axisAngle: {
    x: Math.PI,
    y: 0,
    z: 0,
  },
};

const FRONT: Orientation = {
  offsetFactor: {
    x: 0,
    y: -1,
    z: 0,
  },
  axisAngle: {
    x: Math.PI / 2,
    y: 0,
    z: 0,
  },
};

const BACK: Orientation = {
  offsetFactor: {
    x: 0,
    y: 1,
    z: 0,
  },
  axisAngle: {
    x: -(Math.PI / 2),
    y: 0,
    z: Math.PI,
  },
};

const LEFT: Orientation = {
  offsetFactor: {
    x: -1,
    y: 0,
    z: 0,
  },
  axisAngle: {
    x: Math.PI / 2,
    y: -(Math.PI / 2),
    z: 0,
  },
};

const RIGHT: Orientation = {
  offsetFactor: {
    x: 1,
    y: 0,
    z: 0,
  },
  axisAngle: {
    x: Math.PI / 2,
    y: Math.PI / 2,
    z: 0,
  },
};

type Props = {
  tweenCamera: (orientation: Orientation) => void;
};

const ViewCube = ({ tweenCamera }: Props) => {
  return (
    <ViewCubeContainer>
      <div className='cube'>
        <div
          className='cube__face cube__face--front'
          onClick={() => tweenCamera(FRONT)}
        >
          front
        </div>
        <div
          className='cube__face cube__face--back'
          onClick={() => tweenCamera(BACK)}
        >
          back
        </div>
        <div
          className='cube__face cube__face--right'
          onClick={() => tweenCamera(RIGHT)}
        >
          right
        </div>
        <div
          className='cube__face cube__face--left'
          onClick={() => tweenCamera(LEFT)}
        >
          left
        </div>
        <div
          className='cube__face cube__face--top'
          onClick={() => tweenCamera(TOP)}
        >
          top
        </div>
        <div
          className='cube__face cube__face--bottom'
          onClick={() => tweenCamera(BOTTOM)}
        >
          bottom
        </div>
      </div>
    </ViewCubeContainer>
  );
};

export default ViewCube;
