import React, {useState} from "react";
import styled from "styled-components";
import reactable from 'reactablejs';
import { v4 as uuidv4 } from 'uuid';
import Card from "../../components/Card";

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

  return (
      <ZoneReactable onDoubleTap={(event) => addCard(event.x, event.y)}>
        <div className="cards-container" style={{width: "100%", height: "100%"}}>
          {cards.map(card => card)}
        </div>
      </ZoneReactable>
  )
}
