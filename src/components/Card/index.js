import React, {useState} from 'react';
import styled from 'styled-components';
import reactable from 'reactablejs';
import interact from 'interactjs';

const CardComponent = styled.div`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 200px;
  height: 200px;
  border: 2px solid black;
`;

function StaticCard(props) {
  return (
      <CardComponent ref={props.getRef} x={props.x} y={props.y}/>
  );
}

const CardReactable = reactable(StaticCard);

export default function Card() {
  const [coordinate, setCoordinate] = useState({
    x: 300, y: 300
  })

  return (
      <CardReactable
          draggable={{
            inertia: false,
            modifiers: [
                interact.modifiers.restrictRect({
                  restriction: 'parent',
                  endOnly: true
                })
            ]
          }}
          onDragMove={event => {
            const {dx, dy} = event;
            setCoordinate(prev => ({
              x: prev.x + dx,
              y: prev.y + dy
            }))
          }}
          x={coordinate.x}
          y={coordinate.y}
      />
  )
}
