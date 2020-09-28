import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import reactable from 'reactablejs';
import interact from 'interactjs';

const CardComponent = styled.div`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 200px;
  height: 200px;
  background-color: #e8ad0c;
  border: 1px solid black;
  transition: transform 0.1s;
  
  ${props => props.onDrag && css`
    box-shadow: -7px 7px 23px 0px rgba(0,0,0,0.75);
    transform: scale(1.2);
  `}
`;

function StaticCard(props) {
  return (
      <CardComponent ref={props.getRef}
                     x={props.x}
                     y={props.y}
                     onDrag={props.onDrag}/>
  );
}

const CardReactable = reactable(StaticCard);

export default function Card() {
  const [coordinate, setCoordinate] = useState({
    x: 300, y: 300
  })
  const [onDrag, setOnDrag] = useState(false);

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
          onDragStart={() => setOnDrag(true)}
          onDragMove={event => {
            const {dx, dy} = event;
            setCoordinate(prev => ({
              x: prev.x + dx,
              y: prev.y + dy
            }))
          }}
          onDragEnd={() => setOnDrag(false)}
          x={coordinate.x}
          y={coordinate.y}
          onDrag={onDrag}
      />
  )
}
