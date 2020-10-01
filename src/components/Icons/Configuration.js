import React from 'react';
import styled from "styled-components";
import {InteractiveIcon} from "./InteractiveIcon";

const ConfigurationStyle = styled(InteractiveIcon)`
  right: 0.3em;
  top: 0.3em;
`;

export const Configuration = ({active, toggleConfig}) => {
  return (
      <ConfigurationStyle aria-label="config" active={active} onClick={toggleConfig}>&#9881;</ConfigurationStyle>
  )
}
