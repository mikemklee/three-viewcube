import styled from 'styled-components';

export const ViewCubeContainer = styled.div`
  width: 120px;
  height: 120px;
  margin: 10px;
  perspective: 400px;
  position: absolute;
  right: 40px;
  bottom: 20px;
  z-index: 2;

  .cube {
    width: 100px;
    height: 100px;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-300px);
    text-transform: uppercase;
  }

  .cube__face {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 120px;
    height: 120px;
    border: 2px solid #7d7d7d;
    line-height: 100px;
    font-size: 25px;
    font-weight: bold;
    color: #7d7d7d;
    text-align: center;
    background: #ddd;
    transition: all 0.2s;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: #7d7d7d;
      color: #fff;
    }
  }

  .cube__face--front {
    transform: rotateX(270deg) translateZ(-60px);
  }

  .cube__face--right {
    transform: rotateY(90deg) rotateX(180deg) rotateZ(270deg) translateZ(-60px);
  }

  .cube__face--back {
    transform: rotateY(180deg) rotateX(90deg) translateZ(-60px);
  }

  .cube__face--left {
    transform: rotateY(-90deg) rotateX(180deg) rotateZ(90deg) translateZ(-60px);
  }

  .cube__face--top {
    transform: rotateX(180deg) translateZ(-60px);
  }

  .cube__face--bottom {
    transform: translateZ(-60px);
  }
`;
