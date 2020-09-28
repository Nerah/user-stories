import React from "react";
import styled from "styled-components";
import reactable from 'reactablejs';

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

export default function Zone({children}) {
  return (
      <ZoneReactable
          onDoubleTap={() => {
            console.log("create new card!")
          }}
          children={children}
      />
  )
}
