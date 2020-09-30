import React, {useEffect, useState} from "react";
import styled from "styled-components";
import reactable from 'reactablejs';
import { v4 as uuidv4 } from 'uuid';
import Card from "../../components/Card";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";

const ZoneWrapper = styled.div.attrs(props => ({
  style: {
    height: props.height
  }
}))`
  width: 100%;
`;

function StaticZone({children, height, ...props}) {
  return (
      <ZoneWrapper ref={props.getRef} height={height}>
        {children}
      </ZoneWrapper>
  );
}

const ZoneReactable = reactable(StaticZone);

const DEFAULT_NAME = "DEFAULT_NAME";
const DEFAULT_DESCRIPTION = "DEFAULT_DESCRIPTION";

export default function Zone({ height, zoneCards = [] }) {
  const [cards, setCards] = useState(zoneCards);

  useEffect(() => {
    setCards(zoneCards);
  }, [zoneCards]);

  const addCard = (posX, posY) => {
    setCards(oldCards => {
      const id = uuidv4();
      return [...oldCards,
        {
          id: id,
          name: DEFAULT_NAME,
          description: DEFAULT_DESCRIPTION,
          posX: posX,
          posY: posY
        }]
    })
  }

  const editCard = (cardId, newName, newDescr) => {
    setCards(prevState => prevState.map((card) => {
      let newCard = card;
      if (card.id === cardId) {
        newCard = {
          id: cardId,
          name: newName,
          description: newDescr
        }
      }
      return newCard;
    }));
  }

  const deleteCard = (cardId) => {
    setCards(prevState => prevState.filter((card) => {
      return card.id !== cardId
    }))
  }

  return (
      <>
        <ContextMenuTrigger id="zone" holdToDisplay={-1}>
          <ZoneReactable height={height} onDoubleTap={(event) => addCard(event.x, event.y)}>
            <div className="cards-container" style={{width: "100%", height: "100%", userSelect: "none"}}>
              {cards.map(card => <Card key={card.id}
                                       id={card.id}
                                       name={card.name}
                                       description={card.description}
                                       posX={card.posX}
                                       posY={card.posY}
                                       editCard={editCard}
                                       deleteCard={deleteCard}/>)}
            </div>
          </ZoneReactable>
        </ContextMenuTrigger>

        <ContextMenu id="zone">
          <MenuItem data={{card: cards}} onClick={(e) => {
            e.persist();
            addCard(e.pageX, e.pageY);
          }}>
            <span role="img" aria-label="new_card">&#43;</span> New card
          </MenuItem>
          <MenuItem data={{card: cards}} onClick={(e) => console.log(e)}>
            <span role="img" aria-label="export">&#10146;</span> Send to Trello
          </MenuItem>
        </ContextMenu>
      </>
  )
}
