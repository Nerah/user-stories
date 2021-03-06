import React, {useEffect, useState} from "react";
import styled from "styled-components";
import reactable from 'reactablejs';
import { v4 as uuidv4 } from 'uuid';
import Card from "../../components/Card";
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";
import {API} from "../../api";

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

export default function Zone({ height, zoneCards = [], synchronized = false, config }) {
  const [cards, setCards] = useState(zoneCards);

  useEffect(() => {
    setCards(zoneCards);
  }, [zoneCards]);

  const addCard = async (posX, posY) => {
    let id = uuidv4();
    const name = DEFAULT_NAME;
    const description = DEFAULT_DESCRIPTION;
    if (synchronized) {
      await API
          .createCard(config.list, name, description, config.key, config.token)
          .then(res => id = res)
    }
    setCards(oldCards => {
      return [...oldCards,
        {
          id: id,
          name: name,
          description: description,
          posX: posX,
          posY: posY
        }]
    })
  }

  const editCard = (cardId, oldName, oldDescription, e) => {
    e.persist();
    let newName = oldName;
    let newDescription = oldDescription;
    if (e.target.name === "name") {
      newName = e.target.value;
    } else {
      newDescription = e.target.value;
    }
    setCards(prevState => prevState.map((card) => {
      let newCard = card;
      if (card.id === cardId) {
        newCard = {
          id: cardId,
          name: newName,
          description: newDescription
        }
      }
      return newCard;
    }));
    if (synchronized) {
      API
          .updateCard(cardId, newName, newDescription, config.key, config.token)
          .then(() => null)
    }
  }

  const deleteCard = (cardId) => {
    setCards(prevState => prevState.filter((card) => {
      return card.id !== cardId
    }))
    if (synchronized) {
      API
          .deleteCard(cardId, config.key, config.token)
          .then(() => null);
    }
  }

  return (
      <>
        <ContextMenuTrigger id="zone" holdToDisplay={-1}>
          <ZoneReactable height={height}>
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
            addCard(e.pageX, e.pageY).then(() => null);
          }}>
            <span role="img" aria-label="new_card">&#43;</span> New card
          </MenuItem>
        </ContextMenu>
      </>
  )
}
