import React from 'react';

import { StyledButton } from './Button.styles';

type Props = {
  label: string;
  img: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ label, img, onClick = () => {} }: Props) => {
  return (
    <StyledButton onClick={onClick}>
      <label>{label}</label>
      <img src={img} alt={label} />
    </StyledButton>
  );
};

export default Button;
