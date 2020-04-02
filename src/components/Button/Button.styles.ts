import styled from 'styled-components';

type StyledButtonProps = {
  toggled: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #393c3c;
  border: 2px solid ${props => (props.toggled ? '#ccc' : '#393c3c')};
  border-radius: 0.2rem;
  outline: none;
  cursor: pointer;
  font-size: 1.2rem;
  position: relative;
  transition: border-color 0.2s;

  img {
    filter: invert(${props => (props.toggled ? 1 : 0.5)});
    width: 100%;
    transition: filter 0.2s;
  }

  label {
    visibility: hidden;
    width: 100px;
    background-color: #393c3c;
    color: #fff;
    text-align: center;
    padding: 5px 10px;
    border-radius: 0.2rem;
    font-size: 0.85rem;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    top: 5px;
    bottom: auto;
    right: 140%;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.2s;

    ::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 100%;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent #393c3c;
    }
  }

  :hover {
    img {
      filter: invert(1);
    }

    label {
      visibility: visible;
      opacity: 1;
    }
  }
`;
