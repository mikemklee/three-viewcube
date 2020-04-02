import styled from 'styled-components';

export const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  canvas {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
  }
`;
