import React, {useState} from 'react';
import reactable from 'reactablejs';
import interact from 'interactjs';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import '../../react-contextmenu.css';
import {utilsCard} from "./utils";
import StaticCard from "./StaticCard";

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
