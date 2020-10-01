import React from "react";
import styled, {css, keyframes} from "styled-components";
import {InteractiveIcon} from "./InteractiveIcon";

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const SynchronizeAPIStyle = styled(InteractiveIcon)`
  right: calc(0.3em + 1em);
  top: 0.3em;
  
  ${props => props.readyToSynchronize && css`
    animation: ${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  `}
`;

export const SynchronizeAPI = ({active, readyToSynchronize, synchronizeAPI}) => {
  return (
      <SynchronizeAPIStyle aria-label="synchronizeAPI" active={active} readyToSynchronize={readyToSynchronize} onClick={synchronizeAPI}>&#128472;</SynchronizeAPIStyle>
  )
}
