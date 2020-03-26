import React from 'react';

import { StyledButton } from './Button.styles';

type Props = {
  label: string;
  img: string;
  toggled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ label, img, toggled = false, onClick = () => {} }: Props) => {
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick(event);
  };

  return (
    <StyledButton toggled={toggled} onClick={clickHandler}>
      <label>{label}</label>
      <img src={img} alt={label} />
    </StyledButton>
  );
};

export default Button;
