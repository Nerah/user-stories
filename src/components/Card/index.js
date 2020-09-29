import React, {useState} from 'react';
import styled from 'styled-components';
import reactable from 'reactablejs';
import interact from 'interactjs';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import '../../react-contextmenu.css';

const CardComponent = styled.div.attrs(props => ({
  style: {
    left: props.x,
    top: props.y,
    boxShadow: props.dragState && "-7px 7px 23px 0px rgba(0,0,0,0.75)",
  }
}))`
  position: absolute;
  width: 200px;
  height: 200px;
  padding: 3px;
  background-color: #e8ad0c;
  border: 1px solid black;
  transition: transform 0.1s;
  transform: scale(1.2);
  touch-action: none;
  
  /* hide too long text */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;

function StaticCard(props) {
  const [state, setState] = useState({
    name: props.name,
    description: props.description
  });

  const handleChange = (e) => {
    e.persist();
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    props.edit(e)
  }

  return (
      <CardComponent ref={props.getRef}
                     x={props.x}
                     y={props.y}
                     dragState={props.dragState}>
        {props.editState ?
            <>
              <input type="text" name="name" value={state.name} onChange={handleChange}/>
              <textarea name="description" value={state.description} onChange={handleChange}/>
              <button onClick={props.editQuit}>Edit</button>
            </> :
                <>
                  <h2>{props.name}</h2>
                  <p>{props.description}</p>
                </>
        }
      </CardComponent>
  );
}

const CardReactable = reactable(StaticCard);

export default function Card({id, name, description, posX = 300, posY = 300, editCard, deleteCard}) {
  const [coordinate, setCoordinate] = useState({
    x: posX, y: posY
  })
  const [dragState, setDragState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [cardContent, setCardContent] = useState({
    name: name,
    description: description
  })

  const onEditEnter = () => {
    setEditState(true);
  }

  const onEditQuit = () => {
    setEditState(false);
  }

  const handleDelete = (e, data) => {
    deleteCard(data.card);
  }

  const edit = (e) => {
    e.persist();
    setCardContent(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    editCard(id, cardContent.name, cardContent.description);
  }

  return (
      <>
        <ContextMenuTrigger id={`card_menu_${id}`}>
          <CardReactable
              draggable={{
                inertia: false,
                modifiers: [
                  interact.modifiers.restrictRect({
                    restriction: '.cards-container',
                    endOnly: true
                  })
                ]
              }}
              onDragStart={() => setDragState(true)}
              onDragMove={event => {
                const {dx, dy} = event;
                setCoordinate(prev => ({
                  x: prev.x + dx,
                  y: prev.y + dy
                }))
              }}
              onDragEnd={() => setDragState(false)}
              x={coordinate.x}
              y={coordinate.y}
              dragState={dragState}
              name={cardContent.name}
              description={cardContent.description}
              editState={editState}
              edit={edit}
              editQuit={onEditQuit}
          />
        </ContextMenuTrigger>

        <ContextMenu id={`card_menu_${id}`}>
          <MenuItem data={{card: id}} onClick={onEditEnter}>
            <span role="img" aria-label="edit">&#128393;</span> Edit
          </MenuItem>
          <MenuItem data={{card: id}} onClick={handleDelete}>
            <span role="img" aria-label="delete">&#128465;</span> Delete
          </MenuItem>
        </ContextMenu>
      </>
  )
}
