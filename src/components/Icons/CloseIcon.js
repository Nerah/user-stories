import React from "react";
import styled from "styled-components";

const CloseIconStyle = styled.span`
  position: fixed;
  top: 16vh;
  right: 16vw;
  font-size: 2em;
  cursor: pointer;
`;

export const CloseIcon = ({handleClose}) => {
  return (
      <CloseIconStyle role="img" aria-label="close_config" onClick={handleClose}>&#9587;</CloseIconStyle>
  )
}
