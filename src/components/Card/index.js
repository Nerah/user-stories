import React, {useState} from 'react';
import styled from 'styled-components';
import reactable from 'reactablejs';
import interact from 'interactjs';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import '../../react-contextmenu.css';
import {utilsCard} from "./utils";

const CardInput = styled.input`
    width: 180px;
    margin-bottom: 4px;
`;

const CardTextArea = styled.textarea`
  height: 130px;
  width: 180px;
  padding: 1px 2px;
  border-width: 2px;
  border-style: inset;
  overflow-y: auto;
  resize: none;
`;

const CardButton = styled.button`
  
`;

const CardComponent = styled.div.attrs(props => ({
  style: {
    left: props.x,
    top: props.y,
    boxShadow: props.dragState && "-7px 7px 23px 0px rgba(0,0,0,0.75)",
    width: props.size,
    height: props.size
  }
}))`
  position: absolute;
  padding: 3px;
  background-color: #e8ad0c;
  border: 1px solid black;
  transition: transform 0.1s;
  transform: scale(1.2);
  touch-action: none;
  
  /* hide too long text */
  overflow: hidden;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;

function StaticCard(props) {

  const handleChange = (e) => {
    e.persist();
    props.edit(e);
  }

  return (
      <CardComponent ref={props.getRef}
                     x={props.x}
                     y={props.y}
                     size={props.size}
                     dragState={props.dragState}>
        {props.editState ?
            <>
              <CardInput type="text" name="name" value={props.name} onChange={handleChange}/>
              <CardTextArea name="description" value={props.description} onChange={handleChange}/>
              <CardButton onClick={props.editQuit}>Edit</CardButton>
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

export default function Card({ id, name, description,
                               posX = null, posY = null, size = utilsCard.CARD_SIZE,
                               editCard, deleteCard }) {
  const position = posX == null || posY == null ?
      utilsCard.randomPositionInZone()
      : { x: posX, y: posY }
  const [coordinate, setCoordinate] = useState(position);
  const [dragState, setDragState] = useState(false);
  const [editState, setEditState] = useState(false);

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
    editCard(id, name, description, e);
  }

  return (
      <>
        <ContextMenuTrigger id={`card_menu_${id}`} holdToDisplay={-1}>
          <CardReactable
              draggable={{
                ignoreFrom: 'input, textarea, button',
                inertia: false,
                modifiers: [
                  interact.modifiers.restrictRect({
                    restriction: '.cards-container',
                    endOnly: true
                  })
                ]
              }}
              onDragStart={event => {
                setDragState(true);
                event.target.style.zIndex = parseInt(new Date().getTime() / 1000);
              }}
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
              size={size}
              dragState={dragState}
              name={name}
              description={description}
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
