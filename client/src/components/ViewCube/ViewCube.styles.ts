import styled from 'styled-components';

export const ViewCubeContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  perspective: 400px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 2;

  .cube {
    width: 100px;
    height: 100px;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-300px);
  }

  .cube__face {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid grey;
    line-height: 100px;
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-align: center;
    background: whitesmoke;
    transition: background 0.2s;
    cursor: pointer;

    &:hover {
      background: green;
    }
  }

  .cube__face--front {
    transform: rotateX(270deg) translateZ(-50px);
  }

  .cube__face--right {
    transform: rotateY(90deg) rotateX(180deg) rotateZ(270deg) translateZ(-50px);
  }

  .cube__face--back {
    transform: rotateY(180deg) rotateX(90deg) translateZ(-50px);
  }

  .cube__face--left {
    transform: rotateY(-90deg) rotateX(180deg) rotateZ(90deg) translateZ(-50px);
  }

  .cube__face--top {
    transform: rotateX(180deg) translateZ(-50px);
  }

  .cube__face--bottom {
    transform: translateZ(-50px);
  }
`;