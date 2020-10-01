import React from 'react';
import styled from "styled-components";
import {InteractiveIcon} from "./InteractiveIcon";

const HamburgerStyle = styled(InteractiveIcon)`
  left: 0.3em;
  top: 0.3em;
`;

export const Hamburger = ({active, setActive}) => {
  return (
      <HamburgerStyle aria-label="hamburger" active={active} onClick={setActive}>&#9776;</HamburgerStyle>
  )
}
