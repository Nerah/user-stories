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

export default function Zone() {
  return (
      <ZoneReactable
          onDoubleTap={() => {
            console.log("create new card!")
          }}
      >
        <Card name={"Default name"} description={"Default description that is way too long, because I'm talking about anything, everytime, everywhere. I can talk like that for hours. I always think I haven't talk since it's been years."}/>
      </ZoneReactable>
  )
}
