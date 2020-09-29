import React, {useState} from "react";
import styled from "styled-components";
import reactable from 'reactablejs';
import { v4 as uuidv4 } from 'uuid';
import Card from "../../components/Card";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";

const ZoneWrapper = styled.div`
  width: 100%;
  height: 75vh;
`;

function StaticZone({children, ...props}) {
  return (
      <ZoneWrapper ref={props.getRef}>
        {children}
      </ZoneWrapper>
  );
}

const ZoneReactable = reactable(StaticZone);

const INITIAL_CARDS = [];
const DEFAULT_NAME = "DEFAULT_NAME";
const DEFAULT_DESCRIPTION = "DEFAULT_DESCRIPTION";

export default function Zone() {
  const [cards, setCards] = useState(INITIAL_CARDS)

  const addCard = (posX, posY) => {
    setCards(oldCards => {
      const id = uuidv4();
      return [...oldCards,
        <Card key={id}
              id={id}
              name={DEFAULT_NAME}
              description={DEFAULT_DESCRIPTION}
              posX={posX}
              posY={posY}
              editCard={editCard}
              deleteCard={deleteCard}
        />]
    })
  }

  const editCard = (cardId) => {
    console.log(cardId)
  }

  const deleteCard = (cardId) => {
    setCards(prevState => prevState.filter((card) => {
      return card.props.id !== cardId
    }))
  }

  const handleSave = () => {
    console.log("Saved!")
  }

  return (
      <>
        <ContextMenuTrigger id="zone">
          <ZoneReactable onDoubleTap={(event) => addCard(event.x, event.y)}>
            <div className="cards-container" style={{width: "100%", height: "100%", userSelect: "none"}}>
              {cards.map(card => card)}
            </div>
          </ZoneReactable>
        </ContextMenuTrigger>

        <ContextMenu id="zone">
          <MenuItem data={{card: cards}} onClick={(e) => console.log(e)}>
            <span role="img" aria-label="export">&#10515;</span> Export as JSON
          </MenuItem>
          <MenuItem data={{cards: cards}} onClick={handleSave}>
            <span role="img" aria-label="save">&#128190;</span> Save zone
          </MenuItem>
        </ContextMenu>
      </>
  )
}
