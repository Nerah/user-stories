import React from 'react';
import styled from 'styled-components';

const CardComponent = styled.div`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 200px;
  height: 200px;
  border: 2px solid black;
`;

export default function Card() {
  return (
      <CardComponent x={300} y={300}/>
  );
}
