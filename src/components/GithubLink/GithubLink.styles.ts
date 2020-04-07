import styled from 'styled-components';

import Images from '../../assets/images';

export const StyledLink = styled.a`
  width: 50px;
  height: 50px;
  transition: filter 0.2s;
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 1;
  cursor: pointer;
  filter: invert(1);
  background-image: url(${Images.github});
  background-size: contain;
`;
