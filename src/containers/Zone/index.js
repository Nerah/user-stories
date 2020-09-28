import React from "react";
import styled from "styled-components";
import reactable from 'reactablejs';
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

const DEFAULT_NAME = "DEFAULT_NAME";
const DEFAULT_DESCRIPTION = "DEFAULT_DESCRIPTION";

export default function Zone() {
  return (
      <ZoneReactable
          onDoubleTap={() => {
            console.log("create new card!")
          }}
      >
        <Card name={DEFAULT_NAME} description={DEFAULT_DESCRIPTION}/>
      </ZoneReactable>
  )
}
